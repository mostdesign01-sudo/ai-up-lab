---
layout: ../../layouts/BrandCollectionLayout.astro
title: "AI 品牌 VI 参考清单 · AI UP LAB"
titleEn: "AI brand VI references · AI UP LAB"
description: "海内外 AI 品牌的视觉识别、品牌规范与网页设计系统公开参考。每条保留原文档的官方链接与核实状态。"
descriptionEn: "Public AI brand identity, brand guidelines, and web design-system references, with the original links and check status."
---

# AI 品牌 VI / 品牌规范 / 网页设计规范参考清单

> 整理日期：2026-10-05（Asia/Shanghai）  
> 用途：品牌升级参考（非授权使用许可；商用/联名仍须走官方审批）  
> 方法：WebSearch + curl/WebFetch 逐条核实 HTTP 状态；内容摘要基于实际打开的页面，不编造 URL。

---

## 一、海外 AI 品牌

<a id="openai"></a>
### 1. OpenAI — Design Guidelines（已核实 200）
- **资源名**：OpenAI Design Guidelines / Brand
- **官方 URL**：https://openai.com/brand/
- **包含**：Wordmark（OpenAI Sans，O 为正圆）、Blossom 符号、合作 lockup、Do/Don’t、商标使用条款；可下载 logos zip / partnership templates
- **可下载**：是（页面提供 `openai-logos.zip`、Partnership Templates）
- **亮点**：词标优先、Blossom 不作主品牌、禁止变形/效果/商品化；专属字体 OpenAI Sans
- **预览**：[Blossom 浅色 SVG](/brand-collection/assets/references/openai/openai-blossom-light.svg)、[黑色词标 SVG](/brand-collection/assets/references/openai/openai-wordmark-dark.svg)（亦可从上方官方 URL 下载）

<a id="anthropic"></a>
### 2. Anthropic / Claude — Press kit + Brandfolder（已核实 200）
- **资源名**：Media assets / Press kit；Brandfolder Newsroom
- **官方 URL**：
  - https://www.anthropic.com/news （入口「Download press kit」→ https://www.anthropic.com/press-kit ）
  - Press kit zip（CDN）：`https://www-cdn.anthropic.com/ae59ca4ca194dac9c9dc3bc78c5829468cb0e8af.zip`（Content-Disposition: Anthropic media resources.zip，约 26MB，HTTP 200）
  - https://brandfolder.com/anthropic/newsroom
- **包含**：新闻室媒体资产（logo/影像等，以 Brandfolder / zip 为准）；站内自有字族 Anthropic Sans / Serif / Mono
- **可下载**：是（press kit zip / Brandfolder）
- **亮点**：偏人文编辑气质；公开侧以媒体包为主，非完整对外 Brand Book 网页

<a id="gemini"></a>
### 3. Google Gemini / DeepMind
- **Gemini 视觉设计文章**（已核实 200）：https://design.google/library/gemini-ai-visual-design  
  - 内容：渐变叙事、圆形/负空间 Logo 逻辑、thinking 动效、与 Google 四色圆点的关系；**非可下载 Brand Kit**
- **Google Brand Resource Center**（已核实 200）：https://about.google/brand-resource-center/guidance/  
  - 内容：商标使用许可层级、禁止模仿视觉、产品图标规则
- **DeepMind**：未找到独立官方可下载 Brand Guidelines；Behance 等为设计案例展示，不算官方规范页
- **可下载**：Gemini 文章无可下载 kit；Google 品牌元素需按 Resource Center / Partner Hub 流程
- **亮点**：AI 产品用「软渐变 + 意图动效」建立信任，而不是硬科技冷感

<a id="fluent"></a>
### 4. Microsoft Copilot / Fluent 2（已核实 200）
- **资源名**：Fluent 2 Design System（含 Copilot UI Kits 说明）
- **官方 URL**：https://fluent2.microsoft.design/ ；色彩等：https://fluent2.microsoft.design/color
- **包含**：设计语言 token（色/描边/圆角/间距）、Core UI Kits、**Copilot UI Kits**（Web/iOS/Android AI 组件）、Figma 对齐
- **可下载**：Figma UI Kits（需 Figma）；非传统 PDF Brand Book
- **亮点**：把 Copilot 当作 Fluent 的 AI 扩展层，强调组件一致性而非独立「炫彩 AI」皮肤  
- **注**：`https://www.microsoft.com/design` 对本机 curl 返回 403，以 fluent2 域名为准

<a id="meta"></a>
### 5. Meta AI / Meta Brand Resource Center（已核实 200）
- **资源名**：Meta Brand Resource Center
- **官方 URL**：https://www.meta.com/brand/resources/ ；Meta logo 细则：https://www.meta.com/brand/resources/meta/meta/
- **包含**：Meta logo 四色变体、最小尺寸、使用场景；强调 **Brand Review 审批**
- **可下载**：中心里有资产入口；使用通常需审批
- **亮点**：集团级品牌管控严格；**未找到「Meta AI」单独完整公开 Brand Book**（多并入 Meta/产品资源）

<a id="mistral"></a>
### 6. Mistral AI — Brand assets（已核实 200）
- **资源名**：Brand assets and guidelines
- **官方 URL**：https://mistral.ai/brand/
- **包含**：Pixel cat 徽章、Gradient/Inverted/Black lockup、净空与误用、各模型像素插画、Wallpaper；zip：`Mistral_Brandkit_2026.zip` / Logos / Models 等
- **可下载**：页面列出 zip（CDN `cms.globalaegis.net`；部分直链对本环境 403，浏览器从官网点下通常可用）
- **亮点**：模型级像素插画系统与 M 符号一体；偏好渐变版徽章

<a id="xai"></a>
### 7. xAI / Grok — Brand Guidelines（已核实 200）
- **资源名**：Brand Guidelines（页面标题现为 SpaceXAI Brand Guidelines，日期 Feb 14, 2025）
- **官方 URL**：https://x.ai/legal/brand-guidelines
- **包含**：商标使用 Do/Don’t、内容归属文案（“Written with Grok” / “Created with Grok”）、Logo 须按下载件原样使用
- **可下载**：页面声明有 logo 下载链接（以页面当时按钮为准）
- **亮点**：偏法律/商标条款型指南，不是视觉系统说明书；注明与 X（Twitter）为不同公司

<a id="huggingface"></a>
### 8. Hugging Face — Brand Assets（已核实 200）
- **资源名**：Brand Assets + brand-assets dataset
- **官方 URL**：https://huggingface.co/brand ；数据集：https://huggingface.co/datasets/huggingface/brand-assets
- **包含**：HF logo / with-title / monochrome / pirate 等 SVG·PNG；品牌色示例（页内见 `#FF9D00`）；Universe 其他资产入口
- **可下载**：是
- **亮点**：开源社区友好、资产直接挂 Hub；气质活泼而非「企业冷白皮」
- **预览**：[HF logo SVG](/brand-collection/assets/references/huggingface/huggingface-logo.svg)、[带标题 logo SVG](/brand-collection/assets/references/huggingface/huggingface-logo-title.svg)（亦可从上方官方 URL 下载）

<a id="runway"></a>
### 9. Runway — Brand Guidelines & Assets（已核实 200）
- **资源名**：Runway Brand Assets and Guidelines
- **官方 URL**：https://runway.com/brand-guidelines
- **包含**：命名（称 Runway，勿称 Runway AI/ML）、最小尺寸、黑白对比、净空、Wordmark Don’ts、小场景可用 Symbol
- **可下载**：是（页内 downloadable assets）
- **亮点**：词标独立、禁止把 Symbol 塞进词标或替换字母
- **预览**：[词标误用示例图](/brand-collection/assets/references/runway/runway-dont-01.webp)（亦见 https://runway.com/brand-guidelines ）

<a id="elevenlabs"></a>
### 10. ElevenLabs — Brand guidelines and press kit（已核实 200）
- **资源名**：Brand guidelines and press kit
- **官方 URL**：https://elevenlabs.io/brand
- **包含**：官方 Logo、净空、11 Symbol 构造、平台子品牌（ElevenAgents / Creative / API / Music）色与图形、命名 Don’ts、可下载 PNG/SVG/zip
- **可下载**：是
- **亮点**：子产品分色分图形（Agents 圆/球体、Creative/API 用 Chladni 纹等），适合多产品线 AI 公司参考
- **预览**：[黑色 Logo SVG](/brand-collection/assets/references/elevenlabs/elevenlabs-logo-black.svg)（亦可从上方官方 URL 下载）

<a id="cursor"></a>
### 11. Cursor — Brand Guidelines（已核实 200）
- **资源名**：Cursor brand guidelines
- **官方 URL**：https://cursor.com/brand
- **包含**：2D/2.5D/3D logo·icon·avatar；命名（称 Cursor，勿 Cursor AI）；可下载 zip
- **可下载**：是（`cursor-brand-assets.zip`）
- **亮点**：开发者工具品牌把「立方体」做成可缩放的立体资产系统
- **预览**：[Cursor logo SVG](/brand-collection/assets/references/cursor/cursor-logo.svg)、[icon PNG](/brand-collection/assets/references/cursor/cursor-icon.webp)（亦可从上方官方 URL 下载）

<a id="cohere"></a>
### 12. Cohere
- **Newsroom**（已核实 200）：https://cohere.com/newsroom — 媒体联系 `press@cohere.com`，未见完整自助 Brand Guidelines 页
- **品牌演进博文**（已核实 200）：https://cohere.com/blog/reimagined-brand （2023-03-29，重塑叙事；非现行完整 VI 手册）
- **结论**：**未找到官方公开完整 Brand Book / logo kit 自助页**（需走 press）

<a id="perplexity"></a>
### 13. Perplexity
- 官网 `https://www.perplexity.ai/` 对本环境常 403；**未找到官方公开 Brand Guidelines 页**
- 第三方案例（Smith & Diction 等）与 `live.standards.site/perplexity`（抓取曾 500）**不算官方规范**
- **结论**：未找到官方公开规范

<a id="midjourney"></a>
### 14. Midjourney
- 官网可访问；**未找到官方公开 Brand Guidelines / Brand Kit 页**
- **结论**：未找到官方公开规范

<a id="stability"></a>
### 15. Stability AI
- Press：https://stability.ai/press （已核实 200；内容偏空壳/产品页结构，未见完整可下载 Brand Kit）
- `stability.ai/brand-style` 为产品功能页，**不是**公司 VI 手册
- **结论**：未找到可用的官方公开 Brand Book

<a id="notion"></a>
### 16. Notion（含 Notion AI）
- Media Kit（Notion 站点，已核实 200）：https://notion.notion.site/Media-Kit-205535b1d9c4440497a3d7a2ac096286  
  - Logo、产品截图、插画等媒体资产；联系 press@makenotion.com
- **未找到**独立「Notion AI」VI；沿用 Notion 母品牌
- **可下载**：Media Kit 内资产（视页面当时权限）

<a id="vercel"></a>
### 17. Vercel / v0 / Geist（已核实 200）
- **Geist Design System**：https://vercel.com/geist/introduction — 色、字体（Geist Sans/Mono）、Materials、Grid、React 组件 `@vercel/geistcn`
- **Brand assets**：https://vercel.com/geist/brands — Vercel / Next.js / Turbo / **v0** / eve / AI SDK 的 SVG·PNG 与使用条款
- **可下载**：是（单文件 SVG/PNG）
- **亮点**：AI 产品（v0）直接挂在同一品牌资产目录；Geist 是「网页级」设计系统标杆

### 18. 其他（简述）
| 品牌 | 状态 |
|------|------|
| IBM Carbon for AI | 见第三组（网页/产品系统，非消费级 AI 品牌包） |
| Apple Intelligence | 未单列公开 Brand Kit；沿用 Apple HIG / 商标指南 |

---

## 二、国内 AI 品牌

<a id="kimi"></a>
### 1. 月之暗面 Kimi — 品牌手册（已核实 200）⭐
- **资源名**：Kimi 品牌手册
- **官方 URL**：https://www.kimi.ai/zh-hans/resources/kimi-brand
- **包含**：标志系统、色彩（核心品牌蓝）、排版（Inter / Geist Mono / Sentient）、网格、界面升级说明、生成式视觉资产生成器、数据可视化规范、影调与触点；许可联系 hi@moonshot.ai / legal@moonshot.ai
- **可下载**：页内有壁纸生成器等；完整矢量包需按联系方式申请
- **亮点**：国内少见的「完整公开 Brand System 网页」——科学人文 + De-coding 质感 + 生成式资产

<h3 id="minimax">2. MiniMax — Brand VI / Brand Book（已核实 200）⭐</h3>
- **资源名**：Brand VI — MiniMax Brand Book
- **官方 URL**：https://www.minimax.io/brand-vi  
- **PDF**：https://file.cdn.minimax.io/public/brand-vi/20260914/MiniMax_Brand_Book.pdf （已核实 200，%PDF-1.7）
- **包含**：Vitality 视觉语言、Logo、口号 “Intelligence with Everyone”、渐变色（如 `#FF3763→#FF7038` 等）、字体（Libre Baskerville / Outfit / DM Sans）、插画与生命体摄影 Prompt、应用案例
- **可下载**：是（PDF）
- **亮点**：把「生长/生命」做成全链路视觉系统，并给出 AI 出图 Prompt
- **PDF 副本**：完整 PDF 约 22MB，本页不托管该文件；请用上方 PDF 链接下载

<a id="tencent"></a>
### 3. 腾讯（集团品牌；混元产品页）
- **品牌和使用指南**（已核实 200）：https://www.tencent.com/zh-cn/newsroom/media-resources/brand-and-usage-guides/  
  - 可下 PDF：  
    - 腾讯蓝色彩系统：https://www.tencent.com/wp-content/uploads/2022/12/Tencent-Blue_Color-System-Guideline_181112_compressed-1.pdf  
    - 腾讯品牌视觉规范：https://www.tencent.com/wp-content/uploads/2022/12/Tencent_Visual_Identity-Guideline_200323_compressed.pdf （文件名以站点为准：`Tencent_Visual-Identity-Guideline_200323_compressed.pdf`）
- **混元产品站**（已核实 200）：https://hunyuan.tencent.com/ — **未找到混元独立公开 Brand Book**
- **亮点**：集团级 VI 完整；AI 子品牌规范未公开独立成册

<a id="baidu"></a>
### 4. 百度 / 文心
- 官方 `vi.baidu.com` 对本环境无法连通（000）
- 第三方镜像汇总（已核实 200，**非百度官网**）：https://bdvi.honglei.net/ — 可见「百度品牌系统 / 子品牌 VI / 百度智能云」等目录结构
- 文心一言产品：https://yiyan.baidu.com/ （已核实 200）— **未见独立公开文心 Brand Guidelines**
- **结论**：文心 **未找到官方公开独立规范页**；集团 VI 需内网/授权渠道

<a id="alibaba"></a>
### 5. 阿里 / 通义 / Qwen
- 通义：https://tongyi.aliyun.com/ （200）；Qwen：https://qwenlm.github.io/ （200）
- 国际站伙伴标志规范（已核实 200）：https://activity.alibaba.com/page/c590c5e9.html  
- **未找到**通义/Qwen 独立官方公开 Brand Book；阿里云历史品牌 PDF 多为第三方转载，不作官方主链
- **结论**：通义/Qwen **未找到官方公开完整 VI 手册**

<a id="doubao"></a>
### 6. 字节豆包 / 火山引擎
- https://www.doubao.com/ 、https://www.volcengine.com/ （均 200）
- **未找到**豆包/火山官方公开 Brand Guidelines / Brand Kit 页
- **结论**：未找到官方公开规范

<a id="deepseek"></a>
### 7. DeepSeek
- https://www.deepseek.com/ （200）
- 第三方「Design System」提炼页存在，**非官方**
- **结论**：未找到官方公开 Brand Guidelines

<a id="zhipu"></a>
### 8. 智谱
- `https://www.zhipuai.cn/` 对本环境连接失败（000/ERR）
- **结论**：未找到可核实的官方公开 Brand Guidelines

<a id="iflytek"></a>
### 9. 科大讯飞
- 官网 https://www.iflytek.com/ （200）
- 曾检索到 `https://cdn.iflyos.cn/docs/brand_usage.pdf`（署名使用规范）；**本轮 curl 无法稳定拉取（000ERR）** → 标注 **链接不稳定/打不开**
- **结论**：未见完整消费级 AI 产品 Brand Book；技术署名 PDF 待浏览器侧再试

### 其他国内
| 品牌 | 状态 |
|------|------|
| 商汤 / 百川 / 零一等 | 本任务未逐家展开；公开 Brand Book 普遍稀缺 |

---

## 三、网页品牌设计规范与聚合站（偏科技）

### 设计系统 / 品牌页（已核实可访问）

| 品牌/系统 | 资源 | URL | 亮点 |
|-----------|------|-----|------|
| <a id="geist"></a>Vercel Geist | Design System | https://vercel.com/geist/introduction | 色/字/材质/栅格/组件一体；另有 brands 资产页 |
| <a id="linear"></a>Linear | Brand Guidelines | https://linear.app/brand | 极简词标+色（Mercury White / Nordic Gray）；可下 Brand Assets zip |
| <a id="stripe"></a>Stripe | Newsroom assets + Marks Terms | https://stripe.com/newsroom/information ；https://stripe.com/legal/marks | Logo kit / Powered by 徽章；slate & blurple 规则 |
| <a id="carbon"></a>IBM Carbon | Carbon Design System | https://carbondesignsystem.com/ | 企业级组件与无障碍 |
| <a id="carbon-ai"></a>IBM Carbon for AI | AI 扩展 | https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai | **AI Label、可解释性、AI 态组件**——做「产品内 AI 标识」必看 |
| <a id="material"></a>Google Material 3 | M3 | https://m3.material.io/ | 动态色、语义角色、动效 |
| Microsoft Fluent 2 | Fluent | https://fluent2.microsoft.design/ | 与 Copilot UI Kits 同体系 |
| <a id="atlassian"></a>Atlassian Design | Design System | https://atlassian.design/ | 企业协作产品规范完整 |
| <a id="apple-hig"></a>Apple HIG | Human Interface Guidelines | https://developer.apple.com/design/human-interface-guidelines/ | 平台交互与视觉原则 |
| <a id="apple-trademark"></a>Apple 商标指南 | Guidelines for Using Apple Trademarks | https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html | 第三方商标使用 |

<a id="aggregators"></a>
### 聚合站（已核实 200）

| 站点 | URL | 说明 |
|------|-----|------|
| Branding Style Guides | https://brandingstyleguides.com/ | 收录各品牌线上/PDF 规范目录（含 OpenAI 等条目） |
| Brand Guidelines（模板/灵感） | https://www.brandguidelines.net/ | 规范模板与灵感，非官方源 |
| Design Systems Repo | https://designsystemsrepo.com/ | 设计系统索引 |
| Design Systems Surf | https://designsystems.surf/ | 设计系统画廊 |
| Design Systems | https://www.designsystems.com/ | 设计系统社区/目录 |

### 非官网但常被引用（慎用）
- OpenAI 2022 旧 PDF 归档（AREA 17）：第三方 archive，**已被现行 https://openai.com/brand/ 替代**，仅作文案史参考

---

## 四、AI 品牌视觉共性观察（基于本轮实际打开的规范/文章）

1. **词标优先于符号**：OpenAI（Wordmark > Blossom）、Runway、Linear、ElevenLabs 都强调全称/词标为主，符号只用于小空间；禁止把符号嵌进词标或替换字母。  
2. **专属或强识别字体**：OpenAI Sans、Geist Sans/Mono、Anthropic 自有字族、MiniMax 的 Libre Baskerville + Outfit + DM Sans、Kimi 的 Inter + Geist Mono + Sentient——AI 品牌越来越「字即品牌」。  
3. **克制中性色 + 单点强调色**：大量黑白/暖灰底（Anthropic 纸感、Linear Nordic Gray、Vercel 高对比），再用一抹橙/蓝/渐变作 AI 识别（Anthropic 橙、HF 橙、MiniMax 多段渐变、Gemini 光谱渐变）。  
4. **渐变与「光」隐喻 AI**：Gemini 用定向渐变表达思考与能量；Carbon for AI 用 glow/亮度标识 AI 生成内容；MiniMax/Kimi 把渐变写进系统而非装饰。  
5. **动效即信任**：Gemini 文章明确 motion 要有起止与方向，用来表达「系统在思考」而非装饰；产品规范（Fluent Copilot、Carbon AI）更强调状态可预期。  
6. **生成式资产进 Brand System**：Kimi 壁纸/纹理生成器、MiniMax 生命体摄影 Prompt——规范开始包含「如何用 AI 生产品牌图」而不是只给静帧。  
7. **命名洁癖写进指南**：Cursor≠Cursor AI、Runway≠RunwayML、ElevenAgents 无空格等——升级文案时命名规则与视觉同等重要。  
8. **网页级交付形态**：领先者用 **在线规范页 + SVG/zip**（甚至设计系统组件），而不是只丢一本 PDF；国内公开做得完整的目前以 **Kimi、MiniMax** 最可参考。

---

## 五、本站预览素材

> 素材均来自各品牌公开发布的资料，版权归原品牌所有，仅作学习与参考。

| 本站路径 | 来源 |
|------|------|
| [`assets/openai/openai-blossom-light.svg`](/brand-collection/assets/references/openai/openai-blossom-light.svg) / [`openai-wordmark-dark.svg`](/brand-collection/assets/references/openai/openai-wordmark-dark.svg) / [`openai-blossom-mark.svg`](/brand-collection/assets/references/openai/openai-blossom-mark.svg) | OpenAI brand 页公开 SVG |
| [`assets/anthropic/anthropic-logo-slate.svg`](/brand-collection/assets/references/anthropic/anthropic-logo-slate.svg) 等 | Anthropic media resources zip |
| [`assets/google/gemini-sparkle.svg`](/brand-collection/assets/references/google/gemini-sparkle.svg) / [`material-favicon.svg`](/brand-collection/assets/references/google/material-favicon.svg) | Google Design / Material 公开资产 |
| [`assets/mistral/mistral-icon.png`](/brand-collection/assets/references/mistral/mistral-icon.png) | mistral.ai favicon（CDN logo 直链对本环境 403） |
| [`assets/huggingface/huggingface-logo.svg`](/brand-collection/assets/references/huggingface/huggingface-logo.svg) / [`huggingface-logo-title.svg`](/brand-collection/assets/references/huggingface/huggingface-logo-title.svg) | HF brand-assets dataset |
| [`assets/cursor/cursor-logo.svg`](/brand-collection/assets/references/cursor/cursor-logo.svg) / [`cursor-icon.webp`](/brand-collection/assets/references/cursor/cursor-icon.webp) | cursor.com/brand 公开资产 |
| [`assets/elevenlabs/elevenlabs-logo-black.svg`](/brand-collection/assets/references/elevenlabs/elevenlabs-logo-black.svg) | elevenlabs.io/brand |
| [`assets/runway/runway-logo.png`](/brand-collection/assets/references/runway/runway-logo.png) / [`runway-dont-01.webp`](/brand-collection/assets/references/runway/runway-dont-01.webp) | runway.com 站内 logo / brand 误用示例 |
| [`assets/xai/xai-mark.png`](/brand-collection/assets/references/xai/xai-mark.png) | x.ai 站点标志（公开 favicon 缓存） |
| [`assets/meta/meta-mark.jpg`](/brand-collection/assets/references/meta/meta-mark.jpg) | meta.com 站点标志（公开 favicon 缓存；完整 Brand kit 需 Brand Review） |
| [`assets/notion/notion-logo.png`](/brand-collection/assets/references/notion/notion-logo.png) | Notion Media Kit / 站内资产 |
| [`assets/kimi/kimi-logo.png`](/brand-collection/assets/references/kimi/kimi-logo.png) | kimi.ai Brand System 页 |
| [`assets/minimax/minimax-logo-1.webp`](/brand-collection/assets/references/minimax/minimax-logo-1.webp) | minimax.io Brand VI 页 |
| [`assets/tencent/tencent-logo.png`](/brand-collection/assets/references/tencent/tencent-logo.png) | 腾讯品牌与使用规范公开页 |
| [`assets/vercel/vercel-logo.png`](/brand-collection/assets/references/vercel/vercel-logo.png) | Vercel 公开资产 CDN |
| [`assets/linear/linear-wordmark-dark.svg`](/brand-collection/assets/references/linear/linear-wordmark-dark.svg) 等 | linear.app/brand Brand Assets zip |
| [`assets/ibm/ibm-mark.png`](/brand-collection/assets/references/ibm/ibm-mark.png) / [`carbon-favicon.svg`](/brand-collection/assets/references/ibm/carbon-favicon.svg) | IBM / Carbon 公开站点标志 |
| [`assets/fluent/fluent-logo-light.svg`](/brand-collection/assets/references/fluent/fluent-logo-light.svg) | Fluent 2 站点 CDN |
| [`assets/stripe/stripe-mark.svg`](/brand-collection/assets/references/stripe/stripe-mark.svg) / [`stripe-powered-by.svg`](/brand-collection/assets/references/stripe/stripe-powered-by.svg) | Stripe newsroom / 站内资产 |
| [`assets/atlassian/atlassian-mark-192.png`](/brand-collection/assets/references/atlassian/atlassian-mark-192.png) | Atlassian 官方 CDN favicon |
| [`assets/apple/apple-logo.png`](/brand-collection/assets/references/apple/apple-logo.png) | Apple 公开站点标志 |
| MiniMax Brand Book PDF | 官方约 22MB，本页不托管该文件；请从 https://file.cdn.minimax.io/public/brand-vi/20260914/MiniMax_Brand_Book.pdf 下载 |

总览卡片 logo 放在 **16:9** 白底（或反白）标牌内居中。Mistral 完整品牌包 CDN 直链对本环境仍可能 403（请从 https://mistral.ai/brand/ 浏览器下载）；Anthropic 已从 media resources zip 抽取 logo SVG，整包未托管。

---

<a id="gaps"></a>
## 六、打不开 / 未找到官方公开规范清单

### 链接异常或不稳定
- `https://vi.baidu.com/` — 连通失败  
- `https://www.zhipuai.cn/` — 连通失败  
- `https://cdn.iflyos.cn/docs/brand_usage.pdf` — 本轮无法拉取  
- `https://www.microsoft.com/design` — 403（改用 fluent2.microsoft.design）  
- `https://www.perplexity.ai/` — 常 403  
- Mistral 部分 CDN 直链 — 无 Referer 时 403  

### 未找到官方公开 Brand Guidelines / Brand Kit
- Perplexity、Midjourney、Stability AI（无完整 Brand Book）  
- Cohere（仅 newsroom/旧博文，无自助完整 VI 页）  
- Meta AI（无独立完整公开 Brand Book；仅有 Meta 集团资源中心）  
- DeepSeek、豆包/火山、通义/Qwen、文心一言、腾讯混元（产品站有，独立 VI 手册无）  
- 智谱（官方站本环境不可达且无已核实规范链）  

---

*文档结束。商业使用各品牌资产前请阅读对应 Usage Terms 并按需申请授权。*
