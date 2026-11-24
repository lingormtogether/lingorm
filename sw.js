// Service Worker — LingOrm 刷推文案生成器
//
// ===== v49 更新机制重构（解决「页面自动跳回旧版本」）=====
// 旧版本用 Stale-While-Revalidate（缓存优先）处理导航请求，导致：
//   打开页面 → 命中 SW 旧缓存 → 渲染旧版 index.html（例如没有 Dior 主题）
//   → 页面检测到版本变化 → reload → 又被旧缓存拦截 → 再次旧版
//   用户观感即「页面自动跳回前面的版本」。
// 现改为：
//   ① 导航 / index.html / config.js → **网络优先**（2.5s 超时兜底缓存），
//      只要线上是新版，打开就一定是新版；
//   ② 图标、manifest 等静态资源 → 缓存优先（保证秒开）；
//   ③ install 预缓存**逐项容错**，任一资源失败不再导致整个 SW 装不上
//      （旧版 addAll 一处失败即整体 install 失败，是"永久卡在旧版本"的元凶）；
//   ④ 预缓存与回源统一带 ?_swck= 绕开平台边缘缓存，取线上真值。
// v50：不再把根路径 './' 放进预缓存。
// 平台网关把根路径 / 固化缓存为旧版本（v45），预缓存它会污染缓存；
// 入口统一走 /index.html，根路径导航时的缓存兜底也回退到 /index.html。
const CACHE = 'lingorm-v92';
const CORE = ['./index.html', './config.js', './manifest.json', './icon-192.png', './icon-512.png'];

// 网络优先的超时阈值：超过则回退缓存，避免弱网下长时间白屏
const NET_TIMEOUT = 2500;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('net-timeout')), ms))
  ]);
}

// 平台网关对原始 URL 有边缘缓存（重部署后可能长时间返回旧内容），
// 所有回源请求统一追加唯一参数绕开边缘缓存，拿到线上真值。
function bustCache(u) { return u.origin + u.pathname + '?_swck=' + Date.now(); }

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // 逐项独立处理：单项失败只跳过该项，绝不阻断 SW 安装
    await Promise.all(CORE.map(async u => {
      try {
        const res = await fetch(u + '?_swck=' + Date.now(), { cache: 'reload' });
        if (res && res.ok) await c.put(new Request(u), res);
      } catch (err) { /* 忽略单项失败 */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// 回源同步：校验内容 → 与缓存比对 → 有变化才写缓存并通知页面
function syncCache(reqUrl, res) {
  try {
    res.clone().text().then(txt => {
      // 有效性校验：只认真正的 config.js / index.html 内容，
      // 防 502 错误页 / 离线 HTML 回退污染缓存或误通知
      const valid = txt.indexOf('const CONFIG') !== -1 || txt.indexOf('app-ver') !== -1;
      if (!valid) return;
      const key = new Request(reqUrl.origin + reqUrl.pathname);
      caches.match(key).then(old => {
        const oldTxtP = old ? old.text() : Promise.resolve(null);
        oldTxtP.then(oldTxt => {
          if (oldTxt !== null && oldTxt === txt) return; // 无变化：不写不通知
          caches.open(CACHE).then(c => c.put(key, new Response(txt, {
            headers: { 'Content-Type': res.headers.get('Content-Type') || 'application/javascript' }
          })));
          if (oldTxt !== null) {
            self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
              cs.forEach(c => { try { c.postMessage({ type: 'APP_UPDATED' }); } catch (err) {} });
            });
          }
        });
      });
    }).catch(() => {});
  } catch (e) {}
}

// 需要「网络优先」的资源：页面 HTML 与后台配置，二者决定版本可见性，
// 绝不能拿缓存里的旧版充数（否则就是"跳回旧版本"）
function isFreshFirst(url, request) {
  if (request.mode === 'navigate') return true;
  const p = url.pathname;
  return p === '/' || p.endsWith('/index.html') || p.endsWith('/config.js');
}

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // 自动更新的检测请求（带 ?chk= 时间戳）：直连网络取线上真值，不读缓存。
  if (url.searchParams.has('chk')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.ok) syncCache(url, res.clone());
        return res;
      })
    );
    return;
  }

  const netUrl = bustCache(url);

  if (isFreshFirst(url, e.request)) {
    // 网络优先：拿到即最新；失败/超时才回退缓存（保证离线仍可用）
    e.respondWith((async () => {
      try {
        const res = await withTimeout(fetch(netUrl, { cache: 'no-store' }), NET_TIMEOUT);
        if (res && res.ok) syncCache(url, res.clone());
        return res;
      } catch (err) {
        const m = await caches.match(url.origin + url.pathname)
          || await caches.match(url.origin + '/index.html')
          || await caches.match('./index.html');
        return m || Response.error();
      }
    })());
    return;
  }

  // 其余静态资源（图标、manifest）：缓存优先，秒开；后台静默同步
  e.respondWith(
    caches.match(url.origin + url.pathname).then(m => {
      if (m) {
        fetch(netUrl)
          .then(res => { if (res && res.ok) syncCache(url, res.clone()); })
          .catch(() => null);
        return m;
      }
      return fetch(netUrl)
        .then(res => { if (res && res.ok) syncCache(url, res.clone()); return res; })
        .catch(() => undefined);
    })
  );
});
