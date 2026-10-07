---
layout: ../../layouts/BrandCollectionLayout.astro
title: "AI UP LAB 参考对标 · AI UP LAB"
titleEn: "AI UP LAB benchmark · AI UP LAB"
description: "AI UP LAB 线上站点与 /brand/ v1.2.1 的对照：不一致处，以及规范尚未覆盖的触点。"
descriptionEn: "How the live AI UP LAB site compares with /brand/ v1.2.1, including gaps the guidelines do not yet cover."
---

# AI UP LAB · 品牌规范参考对标

> 整理：2026-10-05 17:10（Asia/Shanghai）｜依据：[AI 品牌 VI 参考清单](../references/) + 对 [站点](https://mostdesign01-sudo.github.io/ai-up-lab/) 的 HTML/CSS 抓取和浏览器计算样式实测  
> 前提：AI UP LAB 已经有一套相当完整的在线规范（[/brand/](https://mostdesign01-sudo.github.io/ai-up-lab/brand/) v1.2.1：10 份 guide、tokens.json/css、knowledge.json、AI brief、logo SVG）。所以这份对标 **不重做体系**，只解决两件事：**规范和线上实际不一致的地方**，以及 **规范还没覆盖的触点（X / 分享图、命名、误用图例）**。

---

## 0. 现状（实测）

### 0.1 规范里写的（来自 `/brand/` 和 `/brand/tokens.css`）

| 项 | 值 |
|---|---|
| 定位语 | 「面向任务的 AI 实践资源 / AI resources for real tasks」；页脚写「独立整理的 AI 实践资源。每条附来源」 |
| 标志 | 六边形轮廓 + 向上空心三角 + 中心 45% 等比实心三角；中性黑 `#17151b` / 反白 `#f5f2fa`（[logo.svg](https://mostdesign01-sudo.github.io/ai-up-lab/brand/logo.svg)、[logo-inverse.svg](https://mostdesign01-sudo.github.io/ai-up-lab/brand/logo-inverse.svg)） |
| 横向组合 | 标志 + 「AI UP LAB」，字标用 Geist 500、字距 -0.02em（64px 以上用 -0.045em）；桌面 32px 标志配 18px 字，手机 24px 配 14px；标志最小 16px；四周净空 ≥ 标志盒宽的 1/4 |
| 字体 | `Geist`（Google Fonts，400–700），中文回退 PingFang SC / Hiragino Sans GB / Microsoft YaHei / Noto Sans SC；代码和参数用 `IBM Plex Mono` 400/500。浏览器计算样式已确认 body 使用这组字体 |
| 色板（浅 / 深） | 底 `#fffefd` / `#141218`；表面 `#ffffff` / `#1b1822`；柔和底 `#f5f2fa` / `#25202e`；正文 `#17151b` / `#f5f2fa`；辅助 `#625d6d` / `#b2aabb`；注释 `#777080` / `#968ba4`；分隔线 `#e8e5ee` / `#332d3c`；**品牌紫 `#6741c2` / `#b79af5`**；成功 `#217a4d` / `#75d49e`；警告 `#8a5b12` / `#ecc17a`；错误 `#b42318` / `#ff9e98` |
| 色彩规则 | 「紫色表示重点和动作，不表示质量高低」。品牌紫压底色的对比度：浅色 6.7:1，深色 7.93:1（本地按 WCAG 公式计算） |
| 尺度 | 间距 4/8/12/16/20/24/32/48/64；**控件圆角 7px、卡片 8px**；内容最大宽 1344px；默认浅色主题（实测 `data-theme=light`，body 底色 `rgb(255,254,253)`） |
| 图标 / 动效 | Phosphor regular 18/20/24px；反馈动效 160ms ease-out，遵循减少动态效果设置 |
| 首页结构 | 编辑精选（1 主 + 2 补充）→ 最近更新 → 目录（学习与工作流 117 / 工具与应用 82 / 界面与范例 150 / 模型与能力 21 / 提示词与素材 12 条）→ 新手入门 → 按任务 → 按日期 |
| 方法参考 | 页面注明借鉴 [Tmall Design](https://tmall-design.com/#blog/building-design-wiki-for-aigui) 的「规则 → 结构化映射 → 代码」做法 |

截图：[首页](https://mostdesign01-sudo.github.io/ai-up-lab/) 1440/390 宽、[`/brand/`](https://mostdesign01-sudo.github.io/ai-up-lab/brand/) 1440 宽：[home-1440.png](/brand-collection/assets/ai-up-lab/home-1440.webp)、[home-390.png](/brand-collection/assets/ai-up-lab/home-390.webp)、[brand-1440.png](/brand-collection/assets/ai-up-lab/brand-1440.webp)。标志与分享图：[logo.svg](/brand-collection/assets/ai-up-lab/logo.svg)、[logo-inverse.svg](/brand-collection/assets/ai-up-lab/logo-inverse.svg)、[favicon.svg](/brand-collection/assets/ai-up-lab/favicon.svg)、[og.png](/brand-collection/assets/ai-up-lab/og.webp)。

### 0.2 线上和规范对不上的地方（实测）

1. **分区强调色漂移**：`/html/` 的 `--accent` 是 teal `#1f8b88`，`/agent-ui/` 是 `#7b4fbf`（**不是**品牌紫 `#6741c2`）。只有首页、`/cases/`、`/tools/`、`/brand/` 用的是品牌紫。teal 压底色的对比度是 4.08:1，低于本站自己定的正文 4.5:1 目标。
2. **遗留变量名**：CSS 里还留着 `--brass / --teal / --sky / --amber / --rose / --green`，其中 `--brass` 已经被重新映射成品牌紫，名字和值对不上。规范又要求「交给 AI 改代码」，这种命名最容易让 AI 用错。
3. **圆角漂移**：规范定的是卡片 8px、控件 7px。实测 `/html/` 和 `/agent-ui/` 的卡片是 **14px**，`/cases/` 是 **11–12px**；全站 CSS 里出现约 20 种圆角值（2–28px，外加 999px）。只有 `/tools/` 和 `/brand/` 符合 8px。
4. **favicon 还是旧色**：`favicon.svg` 用 `#f4efe6` 底配 `#1a1713` 图形，这是旧浅色主题的 `--bg / --ink`，不在 v1.2.1 色板里。
5. **OG 图文案过期，也不分页**：`og.png`（1200×630）是白底居中的横向组合，下方胶囊写「AI UP LAB · curated cases & HTML」，跟现在的定位「AI resources for real tasks」对不上；首页和 `/brand/` 用的是同一张。`twitter:card=summary_large_image` 已经配好了。
6. **规范没有覆盖社交 / X**：`/brand/` 的 8 节里没有分享图或 X 配图模板。
7. **命名在各触点不一致**：品牌名是 AI UP LAB，仓库和 URL 当时是 `grokbot-use-cases`（2026-10-06 已统一改为 `ai-up-lab`），X 账号 @mostdes7gn（第三方镜像里显示名是「白日做梦™」，x.com 本身返回 403，头像、横幅、简介都未能核实）。
8. **误用规则只有文字**（「不要拉伸、旋转、描边或给标志加阴影」），没有图例。

---

## 1. 选了谁，为什么

| # | 参考 | 一句话理由 |
|---|---|---|
| 1 | [Vercel Geist](https://vercel.com/geist/introduction) | 同字体、同类网页级系统。它的 Materials 把圆角收成 6/12/16 三档并绑定层级，正好治本站的圆角漂移 |
| 2 | [Linear Brand](https://linear.app/brand) | 一屏讲完命名、留白、三级标志、两个色值，适合给本站加一个「30 秒版」和命名规则 |
| 3 | [Runway Brand](https://runway.com/brand-guidelines) | 6 条误用写得具体、可以画成图，名称规则也写得很直白（叫 Runway，不叫 Runway AI） |
| 4 | [ElevenLabs Brand](https://elevenlabs.io/brand) | 子平台靠「主色 + 图形母题」区分。本站反过来用：只保留图形母题，颜色收回到品牌紫，解决分区色漂移 |
| 5 | [Kimi 品牌手册](https://www.kimi.ai/zh-hans/resources/kimi-brand) | 把「视觉资产生成器」写进品牌系统，对应本站缺的 X 配图和 OG 模板；数据可视化原则也能用在「模型与能力」目录 |

**看过但没选：**
- **OpenAI / Anthropic**：OpenAI 的 Do/Don'ts 和 Runway 重复，而 Runway 更短、更好落地；Anthropic 公开的只有媒体包。
- **MiniMax / Gemini / Mistral**：渐变、像素插画、生命体摄影都偏「大品牌表现层」。个人站维护不起，而且和本站「中性底 + 单一紫」的原则冲突。
- **Material 3 / Fluent 2 / Carbon（整套）**：企业级组件体系，对个人站太重。只从 Carbon for AI 顺手借一条（见第 3 节）。
- **Hugging Face**：社区活泼风和吉祥物，跟本站编辑型的克制气质不符。

---

## 2. 逐家拆解

### 2.1 Vercel Geist：收圆角，统一材质层级

[Vercel Geist 设计系统页预览](/brand-collection/assets/references/vercel/vercel-preview.webp)

**可借鉴的具体点**（[Materials 页](https://vercel.com/geist/materials)）
- 用「材质」管圆角、填充、描边和阴影，而不是每个组件各自定：
  - Surface：`material-base` 和 `small` 用 6px，`medium` 和 `large` 用 12px；
  - Floating：tooltip 6px，menu 和 modal 12px，fullscreen 16px。
- 同一个系统里还有 [brands 页](https://vercel.com/geist/brands)，提供单文件 SVG/PNG 下载，Vercel 和 v0 等产品的资产放在同一个目录。

**落到 AI UP LAB**
- 在 tokens 里加 3–4 个材质级变量，并且 **只准用这几个**：`--lab-radius-control: 7px`（已有）、`--lab-radius-card: 8px`（已有）、`--lab-radius-floating: 12px`（菜单、弹层，新增）、`--lab-radius-pill: 999px`（芯片、胶囊，新增）。
- 把 `/html/`、`/agent-ui/` 的 14px 卡片和 `/cases/` 的 11–12px 收到 8px。在 `设计验收与维护` 里加一条「CSS 中不得出现 token 以外的 border-radius」，用 `rg 'border-radius:\s*\d'` 就能自动检查。
- 本站已经用 Geist 字体，这次是把 Geist「材质」的思路一起借过来。

**不该照搬**
- Geist 黑白高对比的开发者冷感，以及它的阴影层级（本站 lab 主题已经是 `--shadow: none`，保持）。
- Geist 的完整色阶体系。个人站维护不了，现在 11 个语义色就够了。

---

### 2.2 Linear Brand：一屏版和命名规则

[Linear 品牌页预览](/brand-collection/assets/references/linear/linear-preview.webp)

**可借鉴的具体点**
- **Naming**：「Linear」是一个词、首字母大写，同时是公司名和产品名，不写「Linear app」。
- **三级标志**：wordmark（空间够就用）→ logomark（紧凑布局或 logo 网格）→ icon（社媒头像、需要「chip」时，带合适圆角）。
- 只给 **两个色值**：Mercury White `#F4F5F8` 和 Nordic Gray `#222326`，单色词标优先。
- 整页一屏读完，素材打包下载。

**落到 AI UP LAB**
- 在 `/brand/` 最上面加一个「30 秒版」区块：
  - **命名**：写作「AI UP LAB」，全大写，单个空格；不写 AIUPLAB、AI Up Lab、AI-UP-LAB；`ai-up-lab` 只是仓库名，不当品牌名用。
  - **三级标志**：横向组合（站头、OG）→ 单标志（16–32px 图标位）→ **X 头像版**（标志放进圆形，定安全区）。
  - **两色**：中性黑 `#17151b`（浅底）、反白 `#f5f2fa`（深底），紫色不进标志（规范已有，这里提到最上面）。
- X 显示名要不要和品牌名对齐，由 Hao 决定。规范里至少写清「对外提到本站时一律写 AI UP LAB」。

**不该照搬**
- Linear「品牌色主要用作背景」的用法。本站的紫是 **行动色**，不能铺成大面积背景。

---

### 2.3 Runway：误用图例

[Runway 品牌规范页预览](/brand-collection/assets/references/runway/runway-preview.webp)

**可借鉴的具体点**
- 名称规则一句话写死：「Please refer to us as Runway. Not Runway AI, RunwayML…」
- 数字媒体最小高度 24px；净空用字形单位（腿高 x，再加 1/2x 给降部）。
- **6 条 Don'ts**：符号不和词标并列、不竖排叠放、不用符号替换字母「r」、**不用任何字体手打词标**、不倾斜、不旋转（页面配误用示例图，见 https://runway.com/brand-guidelines ）。

**落到 AI UP LAB**
- 把现有的文字禁令画成 **6 张误用小图**，放在 `/brand/#logo` 下面：拉伸、旋转、描边、加阴影、**用标志替换「AI UP LAB」里的 A**、**用 Geist 以外的字体手打字标**。前四条规范已有文字，后两条是新增。
- 现在的净空写法是「≥ 1/4 标志盒宽」，可以保留。Runway 那种字形单位的写法，适合以后单独用字标时参考。

**不该照搬**
- Runway「符号永远不和词标并列」。AI UP LAB 的横向组合本来就是主形态，规则方向相反。

---

### 2.4 ElevenLabs：分区靠图形，不靠颜色

[ElevenLabs 品牌规范页预览](/brand-collection/assets/references/elevenlabs/elevenlabs-preview.webp)

**可借鉴的具体点**
- ElevenAgents、ElevenCreative、ElevenAPI 分别用蓝、橙、单色，图形母题分别是圆/球体、Chladni 纹、Chladni 纹 + 动态字；每个平台有命名 Do/Don't。
- 11 symbol 专门给头像和 App 用，并给出外框构造比例。

**落到 AI UP LAB**
- 五个目录（学习与工作流 / 工具与应用 / 界面与范例 / 模型与能力 / 提示词与素材）**只借图形母题，不借分色**：
  - 把 `/html/` 和 `/agent-ui/` 的 `--accent` 收回到品牌紫；
  - 目录之间靠 **Phosphor 图标 + 封面纹理角度** 区分。CSS 里已经有雏形：`poster-art` 按目录用了不同角度的条纹，`-18°`、`24°`、`8°`。把它写成规范参数（例如 `section.pattern.angle`），记进 knowledge.json。
- 顺便删掉遗留变量 `--teal / --sky / --amber / --rose`，`--brass` 改名为 `--brand`，或直接用 `--lab-color-brand`。

**不该照搬**
- 多主色子品牌。本站规范已经写明「紫色留给行动与重点」，分区再配一个颜色就违反了自己的规则。现在的 teal 还不达 4.5:1。

---

### 2.5 Kimi：生成器思路，用来做 X 配图和 OG 模板

[Kimi 品牌页预览](/brand-collection/assets/references/kimi/kimi-preview.webp)

**可借鉴的具体点**
- 「品牌视觉资产：生成式设计系统」：壁纸生成器把品牌色和提示词转成统一质感的视觉，**写在品牌手册里**，而不是交给设计师每次手做。
- 数据可视化：「中性灰为底色，通过精准的电光蓝高亮」核心指标，「绝不可造成误导或扭曲」。

**落到 AI UP LAB**
- 新增规范第 09 节「**社交与分享**」，并配一个从 `tokens.json` 读取参数的生成脚本（构建时出图）：
  - **OG 卡**（1200×630，沿用现有尺寸）：左上横向组合 32px，目录 kicker（Plex Mono 12px，大写），标题最多 2 行（Geist 500–650，字距 -0.03em），来源域名（Mono），右下日期。底只用 `--lab-color-background` 或 `surface`，**全图只允许一处紫**（kicker 或下划线）。每个资源详情页和每个目录页各自生成，替换掉现在全站共用的那张。
  - **X 推文配图**（建议 16:9，常用 1600×900；X 当前官方推荐尺寸未在本轮核实，以官方帮助为准）：同一套栅格。左侧大标题加一句用途，右侧放 **资源真实预览截图**（规范要求「真实预览优先」），底部是 AI UP LAB 横向组合和短链。另做一个「每日更新合集」变体，列 3–4 条，序号用 Mono。
  - 把 `og.png` 的胶囊文案从「curated cases & HTML」改成「AI resources for real tasks」或对应中文。
- 「模型与能力」目录如果以后放模型对比图：灰底，只高亮被讨论的那一个，标注数据来源和日期（规范已写「不得编造 benchmark 排名」，这里补上视觉规则）。

**不该照搬**
- 生成艺术壁纸和 De-coding 纹理。本站规范明确「生成插图只用于概念表达，不代替产品截图或操作证据」，X 配图主体应该是真实截图和文字。

---

## 3. 顺手借一条：Carbon for AI 的「AI 标签」

[IBM Carbon for AI 页面预览](/brand-collection/assets/references/carbon-ai/carbon-ai-preview.webp)

[Carbon for AI](https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai) 用统一的 AI label 标出 AI 生成的内容，并且明确「不要把 AI 样式当装饰」。本站首页主推用了生成式概念插图（紫色等距插画），规范也要求概念图不冒充证据。建议给这类图加一个统一的小角标「概念图 / Illustration」（中性色，不用紫），把规范里的这条原则变成用户看得见的东西。

---

## 4. 优先落地的 3 件事

1. **先清理漂移（半天活）**
   - `/html/`、`/agent-ui/` 的 accent 收回品牌紫，目录之间改用图标 + 纹理角度区分；
   - 卡片圆角统一到 8px，新增 `floating 12px` 和 `pill 999px` 两个 token，验收清单加「不准出现 token 外圆角」；
   - favicon 换成 v1.2.1 色（`#17151b` 标志，深色模式用 `#f5f2fa` 反白版）；
   - 删除或重命名 `--brass / --teal / --sky / --amber / --rose`。
   参考 Geist 和 ElevenLabs。
2. **规范新增第 09 节「社交与分享」，配生成脚本**：OG（1200×630，按页生成）加 X 配图（16:9）两个模板，从 tokens 取色和字体，全图只有一处紫，主体放真实截图；同时更新过期的 og.png 文案。参考 Kimi。
3. **`/brand/` 顶部加「30 秒版」**：命名规则（AI UP LAB 写法，仓库名不当品牌名）、三级标志（横向组合 / 单标志 / X 头像版）、两色；`#logo` 下面补 6 张误用图。参考 Linear 和 Runway。

---

## 5. 查不到 / 不确定

- **X @mostdes7gn**：x.com 对 WebFetch 和 curl 都返回 403 或空壳，头像、横幅、置顶、简介和过往配图风格 **都未能核实**；显示名「白日做梦™」只来自第三方镜像页。
- **X 推文配图的官方推荐尺寸**本轮没有查官方帮助，16:9 / 1600×900 只是常用做法。
- 圆角和 accent 的漂移只抽查了首页、`/html/`、`/agent-ui/`、`/cases/`、`/tools/`、`/brand/` 共 6 页，其他详情页没有逐页检查。
- `poster-art` 纹理在哪些页面实际可见，没有逐页确认，只确认 CSS 里存在。

## 6. 线上核对范围

> 需要复核时请直接访问线上站点 https://mostdesign01-sudo.github.io/ai-up-lab/ 。

核对过首页与 `/brand/` 的 HTML、站点 CSS（`_section_.BnVLC-FU.css`）、`tokens.css`、`favicon.svg`、`logo.svg`、`logo-inverse.svg`、`og.png`，以及首页 1440 / 390 宽和 `/brand/` 1440 宽截图、浏览器计算样式。截图与标志见上文。
