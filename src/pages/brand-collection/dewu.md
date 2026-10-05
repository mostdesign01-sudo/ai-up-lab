---
layout: ../../layouts/BrandCollectionLayout.astro
title: "得物 / POIZON 参考对标 · AI UP LAB"
titleEn: "Dewu / POIZON benchmark · AI UP LAB"
description: "得物与 POIZON 的公开资料参考对标：规范写法，以及网页 CSS 实测色值。"
descriptionEn: "Public-source benchmark notes for Dewu and POIZON, including website CSS measurements."
---

# 得物 / POIZON · 品牌规范参考对标

> 整理：2026-10-05（Asia/Shanghai）｜依据：[AI 品牌 VI 参考清单](../references/) + 本轮公开检索与官网实测  
> 边界先说清：得物的核心是 **潮流电商 + 鉴别信任 + 社区内容**，不是 AI 公司。下面借的是 AI 品牌的 **规范方法、资产管理和数字体验**，不借它们的「AI 气质」（渐变光晕、像素/代码纹理、生成艺术）。

---

## 0. 现状速写（只列公开可查的）

| 项目 | 现状 | 来源 |
|---|---|---|
| 名称 | 2020-01-01 由「毒App」更名为「得物App」，只改名，业务定位与流程不变；英文名沿用 Poizon / POIZON | [中国日报网](https://cn.chinadaily.com.cn/a/202001/06/WS5e12dfcca31099ab995f5891.html)、[界面新闻](https://m.jiemian.com/article/3839217.html) |
| 品牌主张 | 「得到美好事物」（App Store 名称「得物 - 得到美好事物」，官网首屏同句） | [App Store](https://apps.apple.com/cn/app/%E5%BE%97%E7%89%A9-%E5%BE%97%E5%88%B0%E7%BE%8E%E5%A5%BD%E4%BA%8B%E7%89%A9/id1012871328)、[dewu.com](https://www.dewu.com/) |
| 定位 | 「新一代潮流网购社区」：正品潮流电商 + 潮流生活社区；「先鉴别，后发货」；原则「不伪、不劣、不 low」 | [dewu.com meta](https://www.dewu.com/)、[得物社会责任报告 PDF](https://cdn.poizon.com/node-common/4558abb7-5915-e530-64b3-55a688621bbc.pdf) |
| 中文标志 | 圆角方框内「得物」二字，官网头部为黑底白字（官网 120×120 PNG） | [dewu.com](https://www.dewu.com/) 头部；本站 [`assets/dewu-logo-120.png`](/brand-collection/assets/dewu/dewu-logo-120.webp)、[`assets/dewu-header-logo.png`](/brand-collection/assets/dewu/dewu-header-logo.webp) |
| 英文词标 | POIZON 粗体无衬线大写，O 中带斜杠、形似禁止符号（寓意拒绝售假） | [poizon.com](https://www.poizon.com/) 头部；本站 [`assets/poizon-header-logo.png`](/brand-collection/assets/dewu/poizon-header-logo.webp)；寓意见 [汇漫品牌设计文章](https://www.hmbrand.net/newsDetail/181)（第三方） |
| 品牌符号 | **50.4° 斜杠**，「传递禁止伪劣 LOW 的态度」，已融入字体 | [中新网 2023-05-15](http://www.chinanews.com.cn/cj/2023/05-15/10007647.shtml) |
| 专属字体 | **得物体 POIZONSans**：篆书基因、窄高、重心偏上；2022-10-28 完成版权登记；获 2023 纽约 TDC 字体优秀奖 | [The One Club / TDC](https://www.oneclub.org/awards/tdcawards/-award/46235/poizonsans/)、[中新网](http://www.chinanews.com.cn/cj/2023/05-15/10007647.shtml) |
| 字体（官网实测） | dewu.com CSS 加载 `POIZONSans Wide` Bold（`dewusans-wide-bold.woff2`），用于商品价格数字；中文正文 `PingFang SC`。poizon.com 用 `Roboto` / `Roboto Condensed` | dewu.com `_next/static/css/aac67f7df32c6f91f0a5.css`；poizon.com 计算样式 |
| 品牌色 | **「极光蓝」**：物流箱 2018 年出雏形，2020-10 正式启用；2026 年鉴别证书改为极光蓝底色并加光变油墨。**官方 HEX/RGB 未找到公开来源** | [今日头条（得物官方号文章）](https://www.toutiao.com/article/7633814208030736942/)、[中国资本网](http://xf.yzbytv.com/xf/2026/0429/309134.html) |
| 网页色值（CSS 实测） | dewu.com：下载按钮 `#01C2C3`（白字），深色文字 `#14151A`，灰 `#C7C7D7`。poizon.com：主按钮 `#00DBDB` 配 `#002F35` 文字，同时也出现 `#01C2C3`。**两种青色并存；它们是否就是「极光蓝」，未找到公开说明** | 官网 HTML/CSS 实测 |
| 对比度（据实测色值计算） | 白字压 `#01C2C3` = **2.21:1**（不到 WCAG AA 4.5:1）；`#002F35` 压 `#00DBDB` = 8.34:1 | 本地按 WCAG 公式计算 |
| IP | NONO（2023 年七周年）：章鱼头 + 鉴真眼，名字取自 POIZON 的「O」 | [汇漫品牌设计文章](https://www.hmbrand.net/newsDetail/181)（第三方，非得物官方） |
| 网页视觉 | dewu.com：黑底头部 + 青色 CTA；首屏「得到美好事物 / 正品保障·逐件查验·多重鉴别」，右侧卖点卡（先鉴别后发货、AR 试鞋、得物榜单、个性定制）。poizon.com：浅色底，大写粗体「SCAN TO TRY / FREE LEGIT CHECK」，产品图里有证书式的「PASS」鉴别结果页；「300+ BRANDS SUPPORTED」品牌墙 | [dewu.com](https://www.dewu.com/)、[poizon.com](https://www.poizon.com/)；本站 [`assets/dewu-home-1440.png`](/brand-collection/assets/dewu/dewu-home-1440.webp)、[`assets/poizon-home-1440.png`](/brand-collection/assets/dewu/poizon-home-1440.webp) |
| 公开品牌规范 | **未找到公开品牌规范或设计系统。** 前员工作品集说设计系统部署在未公开的内网 `design.poizon.com`（未公开） | [duchuanhu.com 作品集](http://duchuanhu.com/work/archives/work13_dewuApp.html)（第三方） |
| AI 相关 | 社会责任报告：「将人工智能技术融入供应链的品质管控体系」。AI 在鉴别中具体做什么，未找到公开细节 | [社会责任报告 PDF](https://cdn.poizon.com/node-common/4558abb7-5915-e530-64b3-55a688621bbc.pdf) |
| 2023 前后升级 | 没找到 2023 年前后换主 logo 的公开信息；2023 年公开的品牌动作主要是得物体获 TDC 奖、推出 NONO IP、[2023 得物设计 SHOWREEL](https://www.zcool.com.cn/work/ZNjgwMTQxNzY=.html) | 同上 |

**判断：** 得物不缺资产。得物体、50.4° 斜杠、极光蓝箱和证书、防伪扣、NONO、POIZON 斜杠 O 都有。缺的是 **一份公开、统一的规范入口**，以及 **核心资产的数值定义**（极光蓝没有公开色值，网页上还有两种青色）。所以选参考时优先看「怎么把资产管成系统、怎么交付」，其次看「信任怎么在界面里讲清楚」。

---

## 1. 选了谁，为什么

| # | 参考 | 一句话理由 |
|---|---|---|
| 1 | [Kimi 品牌手册](https://www.kimi.ai/zh-hans/resources/kimi-brand) | 国内少有的完整公开在线品牌系统，还有专门的数据可视化规范。得物可以直接借它的结构，做自己的「品牌中心」 |
| 2 | [OpenAI Design Guidelines](https://openai.com/brand/) | 讲清了词标优先、符号不当主品牌、合作 lockup 怎么排。得物有中英双标，联名和品牌入驻又多，正好用得上 |
| 3 | [ElevenLabs Brand](https://elevenlabs.io/brand) | 一个母品牌下面挂多个平台，靠命名表加图形母题来区分。可以拿来理顺得物 / POIZON / 鉴别 / 社区这些触点 |
| 4 | [IBM Carbon for AI](https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai) | 把「AI 在场」做成统一标签，再加分层解释。可以给鉴别结果和社区里的 AI 生成内容画信任边界 |
| 补充 | [StockX Brand Assets](https://stockx.com/about/brand-assets/)（非 AI） | 同赛道。媒体资产按「验证中心实拍 / 产品截图 / Logo / B-roll」分组；2022 年还改过信任措辞，可以当前车之鉴 |

**看过但没选：**
- **Mistral（像素猫）/ Cursor（3D 立方体）/ Gemini（光谱渐变）**：AI 和开发者气质太强，搬过来会把得物拉向「科技公司」观感，跟潮流和商品主导的画面冲突。
- **MiniMax Brand Book**：用一个隐喻贯穿全链路，还给生图 Prompt，方法本身值得学。但它的暖红到橙渐变和极光蓝冲突。等得物真要做 AIGC 商品图或营销图规范时，再单独参考它的 Prompt 章节。
- **Vercel Geist / Linear**：开发者极简风，信息密度和潮流电商不一样。Geist 的 Materials 思路可以放进组件库，不进品牌层。
- **Anthropic / Hugging Face**：前者公开的只有媒体包；后者的吉祥物社区风和 NONO 定位重叠，没有增量。

---

## 2. 逐家拆解

### 2.1 Kimi 品牌手册：借结构和数据可视化

**可借鉴的具体点**
- **在线规范的章节顺序**：原点 → 标志系统 → 色彩 → 排版与网格 → 界面升级说明 → 生成式视觉资产 → 数据可视化 → 品牌触点 → 品牌影调（视频分类）→ 联系方式。页面公开，完整矢量包要按联系方式申请（hi@moonshot.ai / legal@moonshot.ai）。
- **双网格**：「标准化基础网格」保证全端一致，「多元表现力网格」给文字少、以视觉为主的场景留弹性。
- **数据可视化原则**：中性灰打底，只用一种高亮色引导核心指标；「必须准确传达数据，绝不可造成误导或扭曲」。
- **触点和影调单列**：办公空间、物料、产品演示 / 概念 / 教程 / 用户故事四类视频，各自有定义。

**落到得物**
- 做「得物品牌中心」网页，章节对应：**品牌原点**（求真；不伪、不劣、不 low）→ **双标志**（得物方框标 / POIZON 词标）→ **极光蓝**（给出 HEX/RGB/CMYK/专色）→ **得物体与 50.4° 斜杠**（构造图和使用场景）→ **触点**（极光蓝箱、鉴别证书、防伪扣）→ **NONO** → **影像分类**（商品、社区 UGC、鉴别现场、发售活动）→ **媒体下载与授权联系**。
- 双网格可以直接对应得物的两类页面：**交易/鉴别页用基础网格**（一致、可信），**社区/发售/营销页用表现力网格**（潮流感）。
- 数据可视化：价格类信息（App Store 描述提到「竞价模式」，即出价和成交相关数据）用「中性灰 + 极光蓝单一高亮」。规则写死：纵轴不截断、不夸大涨跌、不用渐变面积图制造情绪。价格图一旦误导，损害的就是信任。

**不该照搬**
- De-coding 质感、有机像素纹理、壁纸生成器的「生成艺术」观感，以及 Sentient 衬线体带来的学术人文调性。得物主视觉应该是 **商品和人**，不是算法纹理。
- Kimi 的「界面升级」章节偏产品发布叙事。得物品牌中心不必写 App 功能更新。

---

### 2.2 OpenAI Design Guidelines：借词标主次、Don'ts 和联名 lockup

**可借鉴的具体点**（本轮浏览器打开 [openai.com/brand](https://openai.com/brand/) 核实）
- **主次关系写死**：Wordmark 是主品牌；Blossom 符号「DON'T use the Blossom as the primary branding」，而且主词标不和 Blossom 同时使用。
- **词标 Don'ts 6 条**：不拉伸或改动、不裁切、不当遮罩、不用未批准变体、不加效果或纹理、符号不当主品牌。
- **合作 lockup**：两边词标尽量 **等高**，间距平衡、层级清楚；不加颜色，不放在繁杂图片上，不和 Blossom 一起出现；**所有联合物料双方审批**。
- **专属字体单独讲**：OpenAI Sans 的字重、OpenType 特性（表格数字、大小写敏感标点）。

**落到得物**
- **定主次**：国内触点的主标是「得物」方框标；海外是 POIZON 词标。**50.4° 斜杠、NONO、极光蓝箱是辅助资产**，不能单独替代主标出现在需要识别品牌的地方（对应 Blossom 规则）。
- **「得物 ×」联名 / 品牌入驻 / 发售 lockup**：规定两边视觉等高、× 号的字重和间距、商品大图上用反白版并加底部遮罩；双方审批流程写进规范。poizon.com 首页挂着「300+ BRANDS SUPPORTED」品牌墙，品牌墙的 logo 统一灰度、统一视觉高度，也要写进去。
- **Don'ts 图例**：不给方框标加渐变、描边或潮流贴纸效果；不把 POIZON 的斜杠 O 拆出来随意组合；**不用得物体手打「得物」冒充标志**（字库能打出字，但标志是固定图形）。
- **字体章节**：POIZONSans Wide 已经在官网价格上用了（实测）。把「价格、尺码、货号一律用得物体 Wide + 表格数字」写成规则，交易页的数字识别度会马上统一。

**不该照搬**
- OpenAI 禁止把 logo 印在周边商品上。得物本身就做联名和周边，应改成「可以，但走审批」。
- OpenAI Sans 圆润几何、极简大留白的气质。得物体是篆书基因、窄高向上，版面密度也更高。

---

### 2.3 ElevenLabs：借子品牌命名和图形母题

**可借鉴的具体点**
- 母品牌 ElevenLabs 下有 ElevenAgents / ElevenCreative / ElevenAPI / ElevenMusic，**每个都有独立 logotype**。主色分别是蓝、橙、单色；图形母题分别是圆/球体、Chladni 纹、Chladni 纹 + 动态字。
- **命名 Do/Don't 表**：ElevenAgents 不加空格，不写 ElevenLabs Agents / Eleven Agents；母品牌也列了 Eleven Labs、ELEVENLABS、用「II」或「11」拼符号等错误写法。
- **11 symbol** 专门用于头像和 App 等小空间，并给出外框（圆、方）构造比例。

**落到得物**
- **命名表**：得物 / 得物App / POIZON 各自什么时候用；「先鉴别，后发货」的标准写法（App Store 和社会责任报告写「先鉴别，后发货」，官网卖点卡分两行、不带标点，KARMA 战役稿在[梅花网](https://share.meihuainfo.com/shots/3894535937967104)上写成「先鉴别，再发货」，目前不统一）；「得物体」「极光蓝」这类资产名的中英对照。
- **用图形母题区分触点，不分色**：鉴别和正品相关用 50.4° 斜杠和证书纹；社区用 NONO 和对话元素；海外 POIZON 用斜杠 O。**颜色只保留极光蓝一条主轴。**
- **头像规则**：方框「得物」放进圆形头像（社媒、小程序）时的安全区和最小尺寸。

**不该照搬**
- **多色子品牌体系**。电商 App 里商品图、促销色、品牌入驻色已经很多，再给业务线分蓝、橙、单色，极光蓝的识别度会被冲淡。
- 「每个子平台一个 logotype」。得物的业务没有独立对外的子产品名，硬造子品牌名只会增加用户的记忆负担（得物 2020 年改名的出发点之一正是「降低沟通成本」）。

---

### 2.4 IBM Carbon for AI：借 AI 标识和可解释性，但不借 AI 美学

**可借鉴的具体点**
- **AI label** 是界面里标示「AI 在场」的唯一标记，同时也是 **解释弹层的入口**（第一层先给摘要，需要时再展开）。
- 「**Don't use the Carbon for AI styling as decoration**」：AI 样式只能用来标示 AI，不能当装饰。
- **Revert**：用户改写 AI 建议后，组件切回普通态，同时保留「恢复 AI 结果」。
- 光晕扩散范围受限，保证对比度；AI 标签有专门的无障碍处理。

**落到得物**
- **鉴别结果页的分层解释**：结论（如 poizon.com 产品图里的「PASS」）→ 查验项摘要（产品图里有「8 Points Checked」这类条目）→ 每项说明。这一层借的是 Carbon 的「摘要优先，需要再展开」，跟有没有 AI 无关。
- **AI 标签只用在真正有 AI 的地方**：社区里的 AIGC 内容、AI 生成的商品展示图、AR/AI 试穿结果，统一用一个「AI 生成 / AI 辅助」小标签，点开看说明。
- **颜色边界（重要）**：AI 标签 **不要用极光蓝**。极光蓝已经是箱子和证书的颜色，等于正品和得物的信任；AI 标签借了这个颜色，用户可能读成「AI 判定 = 正品保证」。建议用中性灰描边标签。

**不该照搬**
- Glow、亮度、渐变这类「光」的隐喻。得物的信任来自「多道鉴别查验工序」和人工较真，拿 AI 光效包装鉴别会削弱这个叙事。
- 未经公开确认前，不要在对外文案里写「AI 鉴别」。目前公开信息只说 AI 进入了「供应链品质管控体系」。

---

### 2.5 补充（非 AI）：StockX，同赛道的信任表达

> 说明：StockX 官网对 curl/WebFetch 返回 403，本轮用浏览器打开 Brand Assets 页核实目录。没找到 StockX 公开的视觉规范（色值、字体）；GOAT 只在[使用条款](https://www.goat.com/terms)里要求商标使用须事先书面许可，网上流传的「GOAT Brand Book」属于同名的另一家机构，不采用；Nike 未找到公开品牌规范页。

**可借鉴的具体点**
- [Brand Assets 页](https://stockx.com/about/brand-assets/)按资产类型分组：**验证中心与通用影像**、产品截图、高管头像、品牌图形与 Logo、B-roll。验证中心实拍放在第一组。
- **信任措辞要能被证据撑住**：2022-11 StockX 把「Verified Authentic」「100% Authentic」改为「StockX Verified」，背景是 Nike 的诉讼（[Retail Dive](https://www.retaildive.com/news/stockx-removes-verified-authentic-sneaker-tags/636472/)）。

**落到得物**
- 品牌中心的媒体下载照这个分组，加一组「**查验 / 鉴别现场实拍**」（前提是可以公开），用实拍证明流程，而不是用插画讲「正品」。
- 规范里加 **信任措辞词表**：「正品保障」「先鉴别，后发货」「鉴别证书」「逐件查验」，各自能用在哪些场景、需要什么前提，跟法务一起定。

**不该照搬**
- StockX 早年的「股票交易所」行情视觉。
- 不要把 StockX 改名解读成「得物也该改口」。它只提醒一件事：信任话术要和流程证据一一对应。

---

## 3. 优先落地的 3 件事

1. **把核心资产定成数值（先做，成本最低）**
   - 极光蓝给出唯一 HEX/RGB/CMYK/专色，并说明网页上现有的 `#01C2C3` 和 `#00DBDB` 统一成哪一个。
   - 修掉青底白字 2.21:1 的组合（改深色字，或给按钮单独定义一个加深的品牌色）。
   - 写清方框标 / POIZON 词标的主次、最小尺寸、净空和 6 条 Don'ts，再加「得物 ×」联名 lockup。参考 OpenAI。
2. **上线「得物品牌中心」在线页**：按 Kimi 的结构讲得物体、50.4° 斜杠、极光蓝触点（箱/证书/防伪扣）、NONO、命名表；媒体下载照 StockX 分组，加「查验现场实拍」。
3. **写「信任与 AI 标识」组件规范**：鉴别结果按「结论 → 查验项摘要 → 详情」分层；AIGC 和 AI 试穿统一用中性 AI 标签；**极光蓝不得用于 AI 标识**；配一张信任措辞词表。参考 Carbon for AI 和 StockX。

---

## 4. 查不到 / 不确定

- **极光蓝官方色值**：未找到公开来源。表里的 `#01C2C3`、`#00DBDB` 只是官网 CSS 实测值，不能等同于官方定义。
- **得物方框标、POIZON 词标的官方规范**（净空、最小尺寸、色彩版本）：未找到。第三方作品集称该设计系统在未公开的内网。
- **NONO 的设定细节**只来自第三方设计公司文章，未找到得物官方原文。
- **2023 前后是否换过主 logo**：未找到公开信息。
- **AI 在鉴别里的具体作用**：只知道「AI 融入品控体系」，细节未公开。
- poizon.com 产品图里「8 Points Checked」「PASS」等细节来自首页截图中的手机界面，不代表所有品类的鉴别报告格式。
- StockX 的 Our Process 页即使用浏览器也要求登录，未读到内容。

## 5. 公开页面素材

> 素材均来自各品牌公开发布的资料，版权归原品牌所有，仅作学习与参考。需要复核时请直接访问原始页面。

- 得物头部标志 PNG（120×120）：[dewu-logo-120.png](/brand-collection/assets/dewu/dewu-logo-120.webp)，取自 https://www.dewu.com/ 页头
- 得物页头标志截取：[dewu-header-logo.png](/brand-collection/assets/dewu/dewu-header-logo.webp)，取自 https://www.dewu.com/
- POIZON 页头标志截取：[poizon-header-logo.png](/brand-collection/assets/dewu/poizon-header-logo.webp)，取自 https://www.poizon.com/
- 官网首页 1440 宽截图：[dewu.com](/brand-collection/assets/dewu/dewu-home-1440.webp)、[poizon.com](/brand-collection/assets/dewu/poizon-home-1440.webp)（dewu.com 截图被验证码弹层遮挡了一部分）
- 色值和字体核对自 dewu.com 首页 HTML 与站点 CSS、poizon.com 首页 HTML（实测值以本文表格为准）
