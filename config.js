// ============================================================
// 后台配置文件（前台只读，不可编辑）
// 维护方式：
//   1. keywords / tags  —— 默认关键字与标签（当日无任何分组时的兜底配置）
//   2. daily            —— 按日期配置，键格式 "MM-DD"
//      每天可配置多个分组（groups），每个分组包含：
//        name      —— 分组名称（前台按钮上显示）
//        start     —— 存在时间开始（"YYYY-MM-DD HH:mm"，可省略=当天0点起）
//        end       —— 存在时间结束（"YYYY-MM-DD HH:mm"，可省略=不限）
//        keywords  —— 关键字数组（前台一行显示）
//        theme     —— （可选）本组默认文案主题，取值 random / beauty / acting / ck / dior / leapmotor。
//                     写了它 → 选这一组时默认切到该主题（用户之后仍可手动改走）；
//                     不写 → 按下面第 3 条的规则自动推断，推断不出则保持用户当前主题。
//                     用途：无品牌标签、又需要指定默认主题的分组（如 10-10 要求默认「随机混搭」）。
//                     leapmotor（v80 新增）是**品牌大使主题**：文风仍是粉丝口语，但每条正文
//                     必须提到 Leapmotor B03X 并且点明主角是该品牌大使（不出现在前台按钮里，
//                     只能由分组 theme 字段指定，适合单个 campaign 使用）。
//        tags      —— 标签，两种写法（前台逐行输出，顺序与写法完全一致、不做任何重排）：
//                     ① ["#A","#B"]                → 每个标签独占一行（历史写法）
//                     ② [["#A","#B"],["#C","#D"]]  → 每个子数组一行（按提供格式分行，如
//                                                    人名一行 / 品牌一行）
//      只有当前时间落在分组时间窗内的分组才会出现在前台供选择。
//      下线的分组不要删除，把 end 改成已过去的时刻即可（前台即时消失、配置保留、
//      随时可恢复），并在该分组上写明「已下线」与原始结束时间。
//      例：09-19 的 LINGORM DIOR A24 已于 2026-09-24 下线。
//   3. 自动关联（前台规则，选中分组时生效，之后仍可手动改）：
//        先看全名标签（最精确，优先判定）：
//          #LinglingKwong + #OrmKornnaphat 都在 → 主角默认 LingOrm CP
//          只有 #OrmKornnaphat                  → 主角默认 Orm
//          只有 #LinglingKwong                  → 主角默认 Ling
//        没有全名标签时，再按字样判断：
//          关键词/标签含 "LingOrm"  → 主角默认 LingOrm CP
//          只含 "Orm"（无 Ling）     → 主角默认 Orm
//          只含 "Ling"（无 Orm）     → 主角默认 Ling
//        标签/关键词含 "Dior"      → 文案主题默认切到 Dior
//        分组写明 theme 字段       → 用它指定的主题（优先级最高）
//      例：09-24 同一活动拆成 CP / ORM / LING 三个变体分组，关键字都含 LingOrm，
//          靠全名标签区分主角（CP 组两个全名标签都有，单人组只有一个）。
// ============================================================

const CONFIG = {
  // 默认关键字 / 标签（长期兜底）
  keywords: [
    "Ling",
    "Orm",
    "InLoveForeverTheSeries"
  ],
  tags: [
    "#LingOrm",
    "#LinglingKwong",
    "#OrmKornnaphat",
    "#หลิงออม"
  ],

  // 按日期配置（当日分组写在这里，前台自动生效）
  daily: {
    "08-27": {
      groups: [
        {
          name: "DECORTÉ活动",
          start: "2026-08-27 18:45",
          end:   "2026-08-28 18:45",
          keywords: ["ORM FRIEND OF DECORTÉ"],
          tags: ["#ORMCentralBeautyAwards", "#OrmKornnaphat"]
        },
        {
          name: "绘梦婚礼EP11",
          start: "2026-08-28 21:00",
          end:   "2026-08-29 21:00",
          keywords: ["LINGORM ILF EP11"],
          tags: ["#วาดฝันวันวิวาห์EP11", "#หลิงออม", "#LingOrm"]
        }
      ]
    },
    "08-29": {
      groups: [
        {
          name: "ORM Central Mom Moment",
          start: "2026-08-30 13:45",
          end:   "2026-08-31 13:45",
          keywords: ["ORM CENTRAL MOM MOMENT"],
          tags: ["#OrmWithMaeKoyMeetandGreet", "#ออมกรณ์นภัส", "#OrmKornnaphat"]
        },
        {
          name: "Lingling ASEAN Presenter",
          start: "2026-08-30 17:45",
          end:   "2026-08-31 17:45",
          keywords: ["LINGLING ASEAN PRESENTER"],
          tags: ["#LinglingXEucerinMalaysia", "#หลิงหลิงคอง", "#LinglingKwong"]
        }
      ]
    },
    "08-31": {
      groups: [
        {
          name: "ORM X DECORTÉ LIPOSOME",
          start: "2026-08-31 17:45",
          end:   "2026-09-01 17:45",
          keywords: ["ORM X DECORTÉ LIPOSOME"],
          tags: ["#OrmxDecorteSiamParagon", "#ออมกรณ์นภัส", "#OrmKornnaphat"]
        }
      ]
    },
    "09-01": {
      groups: [
        {
          name: "ORM PRESENTER LESASHA",
          start: "2026-09-01 19:45",
          end:   "2026-09-02 19:45",
          keywords: ["ORM PRESENTER LESASHA"],
          tags: ["#OrmLESASHAXShopeeLive", "#ออมกรณ์นภัส", "#OrmKornnaphat"]
        }
      ]
    },
    "09-04": {
      groups: [
        {
          name: "LINGORM ILF FINAL EP",
          start: "2026-09-04 19:45",
          end:   "2026-09-05 21:00",
          keywords: ["LINGORM ILF FINAL EP"],
          tags: ["#วาดฝันวันวิวาห์ตอนจบ", "#หลิงออม", "#LingOrm"]
        }
      ]
    },
    "09-06": {
      groups: [
        {
          name: "LINGLING PRESENTER DIROVO",
          start: "2026-09-06 14:00",
          end:   "2026-09-07 14:00",
          keywords: ["LINGLING PRESENTER DIROVO"],
          tags: ["#LingxDirovoAppreciationEvent", "#หลิงหลิงคอง", "#LinglingKwong"]
        }
      ]
    },
    "09-07": {
      groups: [
        {
          name: "8 YEARS OF LINGLING",
          start: "2026-09-07 09:20",
          end:   "2026-09-08 09:20",
          keywords: ["8 YEARS OF LINGLING"],
          tags: ["#Lingling8YearsJourney", "#หลิงหลิงคอง", "#LinglingKwong"]
        }
      ]
    },
    "09-09": {
      groups: [
        {
          name: "LING FLIES TO NYFW",
          start: "2026-09-09 09:30",
          end:   "2026-09-10 09:30",
          keywords: ["LING FLIES TO NYFW"],
          tags: ["#CKxLinglingAirportLook", "#CalvinKlein", "#LinglingKwong"]
        },
        {
          name: "LINGLING LIVE WITH MISTINE",
          start: "2026-09-09 19:45",
          end:   "2026-09-10 19:45",
          keywords: ["LINGLING LIVE WITH MISTINE"],
          tags: ["#ONENIGHTwithMISTINExLINGLING", "#หลิงหลิงคอง", "#LinglingKwong"]
        }
      ]
    },
    "09-10": {
      groups: [
        {
          name: "LINGLING BA STACCATO",
          start: "2026-09-10 19:15",
          end:   "2026-09-11 19:15",
          keywords: ["LINGLING BA STACCATO"],
          tags: ["#LinglingxStaccatoLive", "#LinglingKwong", "#หลิงหลิงคอง"]
        }
      ]
    },
    "09-11": {
      groups: [
        {
          name: "LINGLING APAC FACE OF CK",
          start: "2026-09-11 23:30",
          end:   "2026-09-14 00:00",
          keywords: ["LINGLING APAC FACE OF CK"],
          tags: ["#CalvinKleinSS27xLINGLING", "#LinglingKwong", "#หลิงหลิงคอง", "#NYFW", "#NewYorkFashionWeek"]
        }
      ]
    },
    "09-13": {
      groups: [
        {
          name: "OWNDAYS CLEAR VISION COMFORT",
          start: "2026-09-13 19:30",
          end:   "2026-09-14 19:30",
          keywords: ["OWNDAYS CLEAR VISION COMFORT"],
          tags: ["#OWNDAYSmeetsLingLing", "#หลิงหลิงคอง", "#LinglingKwong"]
        },
        {
          name: "ORMKORN X DECORTÉ",
          start: "2026-09-13 19:45",
          end:   "2026-09-14 19:45",
          keywords: ["ORMKORN X DECORTÉ"],
          tags: ["#OrmXDecortéLiposomeLive", "#ออมกรณ์นภัส", "#OrmKornnaphat"]
        }
      ]
    },
    "09-14": {
      groups: [
        {
          name: "LING DOWNY LUXE SUNWAY",
          start: "2026-09-14 19:15",
          end:   "2026-09-15 19:15",
          keywords: ["LING DOWNY LUXE SUNWAY"],
          tags: ["#LingXDownyMeetandGreet", "#หลิงหลิงคอง", "#LinglingKwong"]
        }
      ]
    },
    "09-15": {
      groups: [
        {
          name: "EUCERIN SPOTLESS WITH LINGLING",
          start: "2026-09-15 17:45",
          end:   "2026-09-16 17:45",
          keywords: ["EUCERIN SPOTLESS WITH LINGLING"],
          tags: ["#EucerinNO1BrighteningCelebrationXLingLing", "#หลิงหลิงคอง", "#LinglingKwong"]
        }
      ]
    },
    "09-19": {
      groups: [
        {
          // ⛔ 已于 2026-09-24 手动下线（原结束时间为 "2026-09-27 00:00"）。
          //    下线方式：把 end 提前到下线时刻，前台即时消失；配置保留以便随时恢复。
          //    重新上线：把 end 改回 "2026-09-27 00:00" 即可，无需其它改动。
          name: "LINGORM DIOR A24",
          start: "2026-09-19 00:00",
          end:   "2026-09-24 21:50",
          keywords: ["@linglingsirilak @ormmormm"],
          tags: ["#LinglingKwong", "#OrmKornnaphat", "#LingOrm", "#Dior", "#DiorA24"]
        }
      ]
    },
    "09-22": {
      groups: [
        {
          name: "LO THE TOUCH BLUEPRINT",
          start: "2026-09-22 16:45",
          end:   "2026-09-23 16:45",
          keywords: ["LO THE TOUCH BLUEPRINT"],
          tags: ["#TheTouchBluePrintxLingOrm", "#LinglingKwong", "#OrmKornnaphat", "#LingOrm"]
        },
        {
          name: "LINGORM PRESENTER SOFEA",
          start: "2026-09-22 20:15",
          end:   "2026-09-23 20:15",
          keywords: ["LINGORM PRESENTER SOFEA"],
          tags: ["#LingOrmSofeaLiveStream", "#LinglingKwong", "#OrmKornnaphat", "#LingOrm"]
        }
      ]
    },
    "09-24": {
      groups: [
        {
          name: "LINGORM DIOR SUMMER27 CP",
          start: "2026-09-24 00:00",
          end:   "2026-10-08 00:00",
          // v63（用户要求）：把「人名行」与活动标签 #LingOrmDiorSummer27 对调位置 ——
          // 人名行提到最上面（走关键字行），#LingOrmDiorSummer27 下移到标签第 1 行，
          // #LingOrm 并入品牌行。最终输出三行：
          //   #LinglingKwong #OrmKornnaphat
          //   #LingOrmDiorSummer27
          //   #LingOrm #Dior #DiorSummer27 #PFW
          // ⚠️ 关键字行是输出里的第一行，所以「谁在最上面」由 keywords 决定，不是 tags。
          keywords: ["#LinglingKwong #OrmKornnaphat"],
          tags: [
            ["#LingOrmDiorSummer27"],
            ["#LingOrm", "#Dior", "#DiorSummer27", "#PFW"]
          ]
        },
        {
          name: "LINGORM DIOR SUMMER27 ORM",
          start: "2026-09-24 00:00",
          end:   "2026-10-08 00:00",
          // v64：与 CP 组统一行序 —— 人名行在最上（关键字行），活动标签在中间，#LingOrm 并入品牌行：
          //   #OrmKornnaphat
          //   #LingOrmDiorSummer27
          //   #LingOrm #Dior #DiorSummer27 #PFW
          keywords: ["#OrmKornnaphat"],
          tags: [
            ["#LingOrmDiorSummer27"],
            ["#LingOrm", "#Dior", "#DiorSummer27", "#PFW"]
          ]
        },
        {
          name: "LINGORM DIOR SUMMER27 LING",
          start: "2026-09-24 00:00",
          end:   "2026-10-08 00:00",
          // v64：同上（与 CP 组统一行序）
          //   #LinglingKwong
          //   #LingOrmDiorSummer27
          //   #LingOrm #Dior #DiorSummer27 #PFW
          keywords: ["#LinglingKwong"],
          tags: [
            ["#LingOrmDiorSummer27"],
            ["#LingOrm", "#Dior", "#DiorSummer27", "#PFW"]
          ]
        }
      ]
    },
    "09-27": {
      groups: [
        {
          // ⚠️ 2026-09-29 12:46 用户要求下线本组（前台即时消失、配置完整保留、随时可恢复）。
          //    下线方式：把 end 改成**已过去的时刻**（写成实际下线时间），不删除分组 ——
          //    删除会让历史期望表 / 分组总数断言失效，也让「恢复」变成重写配置。
          //    原 end 值 = "2026-10-08 00:00"（10/7 24:00），现 end = "2026-09-29 12:46"。
          //    恢复方法：把下面这行 end 改回 "2026-10-08 00:00"（若真实时间已越过该时刻，
          //    需要改成未来的某个时刻）即可立刻重新出现在前台；keywords / tags 均未改动。
          name: "LINGORM FLY TO DIOR PFW",
          start: "2026-09-27 00:00",
          end:   "2026-09-29 12:46",   // 已下线（原 2026-10-08 00:00）
          keywords: ["LINGORM FLY TO DIOR PFW"],
          // 标签按后台提供的格式分行（三行）：活动标签一行、人名一行、品牌一行
          // ⚠️ 本组标签块较长（tailLengthOf = 113），正文硬上限只有 107 字符，
          //    必须保证 generate() 不被 Math.max 抬高上限，否则整条会超过 220。
          tags: [
            ["#LingOrmDiorAirportLook"],
            ["#LinglingKwong", "#OrmKornnaphat"],
            ["#LingOrm", "#Dior", "#DiorSummer27", "#PFW"]
          ]
        }
      ]
    },
    "09-29": {
      groups: [
        {
          name: "LINGORM BA DIOR AT PFW",
          start: "2026-09-29 20:00",
          end:   "2026-10-01 00:00",   // 9/30 24:00
          keywords: ["LINGORM BA DIOR AT PFW"],
          // 标签按后台提供的格式分行（三行）：活动标签一行、人名一行、品牌一行
          // （与 09-27「LINGORM FLY TO DIOR PFW」同款行序）
          // 用户后续要求：加一个 #LingOrmDiorSummer27，**放在整块标签的最后**
          // （即品牌行的末尾，tags 里最后一个元素）
          // ⚠️ 加完 tailLengthOf = 131（关键字 22 + 标签块 106 + 分隔 3），正文硬上限只剩 89 字符 ——
          //    这是目前最长的一个尾部，全局不变量「标签块 ≤ 130」已放宽到 140（见 group-0927.js）。
          tags: [
            ["#DiorSummer27xLingOrm"],
            ["#LinglingKwong", "#OrmKornnaphat"],
            ["#LingOrm", "#Dior", "#DiorSummer27", "#PFW", "#LingOrmDiorSummer27"]
          ]
        }
      ]
    },
    "10-09": {
      groups: [
        {
          name: "LINGORM DIOR SUMMER27",
          start: "2026-10-09 00:00",
          end:   "2026-10-16 00:00",   // 10/15 24:00
          // 关键词本身就是两个全名标签（前台按一行原样显示，空格分隔）
          keywords: ["#LinglingKwong #OrmKornnaphat"],
          // 标签按后台提供的格式分行（两行）：活动标签 + #LingOrm 一行、品牌一行
          // 两个全名标签都在 → 主角默认 LingOrm CP；标签含 Dior → 主题默认 Dior（正式文风）
          // tailLengthOf = 86（关键字 29 + 标签块 54 + 分隔 3），正文硬上限 134
          tags: [
            ["#LingOrmDiorSummer27", "#LingOrm"],
            ["#Dior", "#DiorSummer27", "#PFW"]
          ]
        }
      ]
    },
    "10-10": {
      groups: [
        {
          name: "ORM CHATO DANCING FLOWER",
          start: "2026-10-10 16:25",
          end:   "2026-10-11 16:30",
          keywords: ["ORM CHATO DANCING FLOWER"],
          // 标签按后台提供的格式分行（两行）：活动标签一行、人名（全名 + 泰文名）一行
          // ⚠️ 本组没有品牌标签（无 Dior / CK）→ 品牌推断不出主题，**必须靠下面的 theme 字段指定**
          //    只有 #OrmKornnaphat 一个全名标签 → 主角默认 = Orm（单人）
          // theme: 用户要求本组「文案主题默认随机混搭」→ 选这一组时默认切到 random（仍可手动改走）
          theme: "random",
          tags: [
            ["#SiamParagonBIFW2026xOrm"],
            ["#OrmKornnaphat", "#ออมกรณ์นภัส"]
          ]
        }
      ]
    },
    "10-17": {
      groups: [
        {
          name: "THE WORLD BETWEEN LINGORM D1",
          start: "2026-10-17 15:00",
          end:   "2026-10-18 16:00",
          keywords: ["THE WORLD BETWEEN LINGORM D1"],
          // 标签按后台提供的格式分行（三行）：活动标签 / 人名 / CP + 泰文名
          // 两个全名标签都在 → 主角默认 LingOrm CP
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，**必须靠下面的 theme 字段指定**
          // theme: 用户要求本组「文案主题默认随机混搭」→ 选这一组时默认切到 random（仍可手动改走）
          // tailLengthOf = 105（关键字 28 + 标签块 74 + 分隔 3），正文硬上限 115
          theme: "random",
          tags: [
            ["#LingOrmBetweenUsConcertD1"],
            ["#LinglingKwong", "#OrmKornnaphat"],
            ["#LingOrm", "#หลิงออม"]
          ]
        }
      ]
    },
    "10-18": {
      groups: [
        {
          // D1 的第二天（同一演唱会），标签行序与 D1 完全一致，只有活动标签换成 …D2、
          // 关键词换成 …D2。时间窗与 D1 有 1 小时重叠（D1 到 10-18 16:00、D2 从 10-18 15:00 起），
          // 重叠期两个分组同时在，属正常（用户按后台时间给的）。
          name: "THE WORLD BETWEEN LINGORM D2",
          start: "2026-10-18 15:00",
          end:   "2026-10-19 16:00",
          keywords: ["THE WORLD BETWEEN LINGORM D2"],
          // 标签按后台提供的格式分行（三行）：活动标签 / 人名 / CP + 泰文名
          // 两个全名标签都在 → 主角默认 LingOrm CP
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，**必须靠下面的 theme 字段指定**
          // theme: 与 D1 保持一致，默认「随机混搭」（仍可手动改走）
          theme: "random",
          tags: [
            ["#LingOrmBetweenUsConcertD2"],
            ["#LinglingKwong", "#OrmKornnaphat"],
            ["#LingOrm", "#หลิงออม"]
          ]
        }
      ]
    },
    "10-21": {
      groups: [
        {
          name: "LINGLING BA HERHYNESS",
          start: "2026-10-21 18:30",
          end:   "2026-10-22 18:30",
          keywords: ["LINGLING BA HERHYNESS"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 人名（全名 + 泰文名）
          // 只有 #LinglingKwong 一个全名标签 → 主角默认 Ling（单人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，**必须靠下面的 theme 字段指定**
          // theme: 与其它无品牌活动组（10-10 / 10-17 / 10-18）保持一致，默认「随机混搭」
          //        （仍可手动改走；若想固定美貌主题，把下面这行改成 theme: "beauty"）
          theme: "random",
          tags: [
            ["#LingxHerHynessBodySunscreen"],
            ["#LinglingKwong", "#หลิงหลิงคอง"]
          ]
        }
      ]
    },
    "10-23": {
      groups: [
        {
          name: "ORM THE MISSION OF LOVE",
          start: "2026-10-23 18:00",
          end:   "2026-10-24 18:00",
          keywords: ["ORM THE MISSION OF LOVE"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 人名（全名 + 泰文名）
          // 只有 #OrmKornnaphat 一个全名标签 → 主角默认 Orm（单人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-10-23 明确选择「固定美妆主题」—— CathyDoll 是美妆品牌活动，
          //        只写颜值/气质/妆感向，不混演技池（仍可手动改走）
          theme: "beauty",
          tags: [
            ["#CathyDollMissionORM"],
            ["#OrmKornnaphat", "#ออมกรณ์นภัส"]
          ]
        }
      ]
    },
    "10-25": {
      groups: [
        {
          name: "ORMKORN X BOSSIE KUP",
          start: "2026-10-25 16:00",
          end:   "2026-10-26 16:30",
          keywords: ["ORMKORN X BOSSIE KUP"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 人名（全名 + 泰文名）
          // 只有 #OrmKornnaphat 一个全名标签 → 主角默认 Orm（单人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-10-25 选择「随机混搭」（品牌开业活动，美貌 / 演技随机混；
          //        若想固定美貌或固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#OrmBossieKupGrandOpening"],
            ["#OrmKornnaphat", "#ออมกรณ์นภัส"]
          ]
        }
      ]
    },
    "10-27": {
      groups: [
        {
          name: "ORM MUSE MATTER MAKERS",
          start: "2026-10-27 17:00",
          end:   "2026-10-28 17:30",
          keywords: ["ORM MUSE MATTER MAKERS"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 人名（全名 + 泰文名）
          // 只有 #OrmKornnaphat 一个全名标签 → 主角默认 Orm（单人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-10-27 选择「随机混搭」（品牌活动，美貌 / 演技随机混；
          //        若想固定美貌或固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#SupernORMalMatterMakers"],
            ["#OrmKornnaphat", "#ออมกรณ์นภัส"]
          ]
        }
      ]
    },
    "10-30": {
      groups: [
        {
          name: "ORM BA LEAPMOTOR B03X",
          start: "2026-10-30 17:00",
          end:   "2026-10-31 17:30",
          keywords: ["ORM BA LEAPMOTOR B03X"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 人名（全名 + 泰文名）
          // 只有 #OrmKornnaphat 一个全名标签 → 主角默认 Orm（单人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-10-30 要求「文案文风里必须有 LEAPMOTOR B03X，Orm 是该品牌大使，
          //        文案要与品牌有关」→ 改用 v80 新增的品牌大使主题 leapmotor：
          //        每条正文都会点明 Orm（全名）与 Leapmotor B03X 的合作 / 大使身份，文风仍是粉丝口语。
          //        （若哪天想回到普通美貌 / 演技池，把 theme 改回 "random" / "beauty" / "acting" 即可）
          theme: "leapmotor",
          tags: [
            ["#OrmSMILEwithB03X"],
            ["#OrmKornnaphat", "#ออมกรณ์นภัส"]
          ]
        }
      ]
    },
    "10-31": {
      groups: [
        {
          name: "LINGORM SMOOTH E FUN DAY",
          start: "2026-10-31 13:30",
          end:   "2026-11-01 14:30",
          keywords: ["LINGORM SMOOTH E FUN DAY"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 泰文名 + CP 标签
          // 没有全名标签，但两条都含 LingOrm 字样（#LingOrmSmoothEGlowlympic / #LingOrm）→ 主角默认 CP（双人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-10-31 选择「固定美妆」（美妆品牌活动，只走美貌池，不混演技句；
          //        若想改成随机混搭 / 固定演技，把下面这行改成 theme: "random" / "acting"）
          theme: "beauty",
          tags: [
            ["#LingOrmSmoothEGlowlympic"],
            ["#หลิงออม", "#LingOrm"]
          ]
        }
      ]
    },
    "11-01": {
      groups: [
        {
          name: "MAJOR FANDOM LINGORM",
          start: "2026-11-01 13:00",
          end:   "2026-11-02 13:30",
          keywords: ["MAJOR FANDOM LINGORM"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 泰文名 + CP 标签
          // 没有全名标签，但活动标签与 #LingOrm 都含 LingOrm 字样 → 主角默认 CP（双人）
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-11-01 选择「固定演技」（只走演技池，不混外貌吹捧句；
          //        若想改成随机混搭 / 固定美妆，把下面这行改成 theme: "random" / "beauty"）
          theme: "acting",
          tags: [
            ["#ธี่หยดสมิงเขาขวางxหลิงออม"],
            ["#หลิงออม", "#LingOrm"]
          ]
        }
      ]
    },
    "11-02": {
      groups: [
        {
          name: "LINGLING BA SPACE7",
          start: "2026-11-02 19:00",
          end:   "2026-11-03 19:45",
          keywords: ["LINGLING BA SPACE7"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 泰文名 + 全名标签
          // 有全名标签 #LinglingKwong（无 #OrmKornnaphat）→ 主角默认 Ling（单人），文案不得出现 Orm
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 与其它无品牌活动组（10-10 / 10-17 / 10-18 / 10-21 / 10-25 / 10-27）一致，默认「随机混搭」
          //        （仍可手动改走；若想固定美貌 / 固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#LinglingxSpace7Live"],
            ["#หลิงหลิงคอง", "#LinglingKwong"]
          ]
        }
      ]
    },
    "11-14": {
      groups: [
        {
          name: "LINGORM UNLOCK THE LIMITS",
          start: "2026-11-14 18:30",
          end:   "2026-11-15 18:45",
          keywords: ["LINGORM UNLOCK THE LIMITS"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 泰文名 + CP 标签
          // 没有全名标签（无 #LinglingKwong / #OrmKornnaphat），但关键字与 #LingOrm 都含 LingOrm 字样
          //   → 主角默认 CP（双人），文案里两人全名都要有
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 用户 2026-11-14 选择「随机混搭」（与 10-17 / 10-18 / 10-21 / 10-25 / 10-27 / 11-02 一致；
          //        若想固定美妆 / 固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#LOopwithSEKI"],
            ["#หลิงออม", "#LingOrm"]
          ]
        }
      ]
    },
    "11-15": {
      groups: [
        {
          name: "BITEME LINGORM MADEMEDOIT",
          start: "2026-11-15 18:30",
          end:   "2026-11-16 18:45",
          keywords: ["BITEME LINGORM MADEMEDOIT"],
          // 标签按后台提供的格式分行（两行）：活动标签 / 泰文名 + CP 标签
          // 没有全名标签（无 #LinglingKwong / #OrmKornnaphat），但关键字含 LINGORM、
          //   第二行也有 #LingOrm → 主角默认 CP（双人），文案里两人全名都要有
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 与其它无品牌活动组（10-17 / 10-18 / 10-21 / 11-02 / 11-14）一致，默认「随机混搭」
          //        （仍可手动改走；若想固定美妆 / 固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#BiteMeMadeMeDoItXLingOrm"],
            ["#หลิงออม", "#LingOrm"]
          ]
        }
      ]
    },
    "11-17": {
      groups: [
        {
          name: "LINGORM CALENDAR SIGN EVENT",
          start: "2026-11-17 16:20",
          end:   "2026-11-18 16:30",
          keywords: ["LINGORM CALENDAR SIGN EVENT"],
          // 标签按后台提供的格式分行（两行）：泰文活动标签（3台2570年台历签售会）/ 泰文名 + CP 标签
          // 没有全名标签（无 #LinglingKwong / #OrmKornnaphat），但关键字含 LINGORM、
          //   第二行也有 #LingOrm → 主角默认 CP（双人），文案里两人全名都要有
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 与其它无品牌活动组（10-17 / 11-02 / 11-14 / 11-15）一致，默认「随机混搭」
          //        （若想固定美妆 / 固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#หลิงออมปฏิทินช่อง3ปี2570"],
            ["#หลิงออม", "#LingOrm"]
          ]
        }
      ]
    },
    "11-18": {
      groups: [
        {
          name: "THETOUCH WITH LINGORM 2026",
          start: "2026-11-18 14:30",
          end:   "2026-11-19 14:45",
          keywords: ["THETOUCH WITH LINGORM 2026"],
          // 标签按后台提供的格式分行（两行）：活动标签（LO The Moment 第二章）/ 泰文名 + CP 标签
          // 没有全名标签（无 #LinglingKwong / #OrmKornnaphat），但关键字含 LINGORM、
          //   第二行也有 #LingOrm → 主角默认 CP（双人），文案里两人全名都要有
          // 无品牌标签（无 Dior / CK）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 与其它无品牌活动组（11-02 / 11-14 / 11-15 / 11-17）一致，默认「随机混搭」
          //        （若想固定美妆 / 固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#LOTheMomentChapter2"],
            ["#หลิงออม", "#LingOrm"]
          ]
        }
      ]
    },
    "11-19": {
      groups: [
        {
          name: "ORM BVLGARI HOLIDAY PARAGON",
          start: "2026-11-19 19:30",
          end:   "2026-11-20 19:30",
          keywords: ["ORM BVLGARI HOLIDAY PARAGON"],
          // 标签按后台提供的格式分行（两行）：活动标签（宝格丽 Siam Paragon 假日活动）/ 泰文名 + 全名标签
          // 只有一个全名标签 #OrmKornnaphat → 主角默认 = Orm（单人），文案里不得出现 Ling
          // 无品牌标签（Bvlgari 不在 THEME_BY_BRAND，只有 Dior）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 与其它无品牌活动组（11-02 / 11-14 / 11-15 / 11-17 / 11-18）一致，默认「随机混搭」
          //        （若想固定美妆 / 固定演技，把下面这行改成 theme: "beauty" / "acting"）
          theme: "random",
          tags: [
            ["#OrmxBvlgariatSiamParagon"],
            ["#ออมกรณ์นภัส", "#OrmKornnaphat"]
          ]
        }
      ]
    },
    "11-21": {
      groups: [
        {
          name: "USMILE X ORM KORNNAPHAT",
          start: "2026-11-21 16:30",
          end:   "2026-11-22 16:45",
          keywords: ["USMILE X ORM KORNNAPHAT"],
          // 标签按后台提供的格式分行（两行）：活动标签（usmile 睡衣派对）/ 泰文名 + 全名标签
          // 只有一个全名标签 #OrmKornnaphat → 主角默认 = Orm（单人），文案里不得出现 Ling
          // 无品牌标签（usmile 不在 THEME_BY_BRAND，只有 Dior）→ 品牌推不出主题，靠下面的 theme 字段指定
          // theme: 与其它无品牌活动组（11-02 / 11-14 / 11-15 / 11-17 / 11-18 / 11-19）一致，默认「随机混搭」
          //        （usmile 属美妆个护类，若想固定美妆，把下面这行改成 theme: "beauty"）
          theme: "random",
          tags: [
            ["#usmilePajamaPartyWithOrm"],
            ["#ออมกรณ์นภัส", "#OrmKornnaphat"]
          ]
        }
      ]
    }
  }
};
