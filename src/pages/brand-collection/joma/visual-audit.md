---
layout: ../../../layouts/BrandCollectionLayout.astro
title: "JOMA 品牌视觉审计 · AI UP LAB"
titleEn: "JOMA visual audit · AI UP LAB"
description: "JOMA 标志、色彩、字体与官网视觉的公开资料审计。"
descriptionEn: "Public visual audit of JOMA marks, color, type, and the international website."
---

# JOMA（Joma Sport）品牌视觉公开资料审计

> 服务目的：中国市场品牌升级前期调研  
> 调研方式：WebSearch + WebFetch + curl 下载公开图片  
> 调研日期：2026-09-09（Asia/Shanghai）  
> 原则：不编造颜色代码；未见官方标注则写「待从图中提取」或标明来源层级

---

## 一、视觉现状摘要

JOMA 是西班牙托莱多起家的专业运动品牌（公开资料普遍记载创立于 1965 年），国际官网为 [joma-sport.com](https://www.joma-sport.com/)。当前公开视觉以 **「鹰形图形标 + 粗衬线小写词标 joma」** 为核心，产品应用上另广泛使用 **斜向抽象「J」单标**。品牌色在公开描述中多为群青/深蓝；**官网 CSS 将页头 Logo 填充指定为 `#0026FF`**（见下文「色彩」）。

整体气质：**足球/Teamwear 基因强**（球衣竖条、胸前/袜筒标位、专业球员大使海报），同时向跑步、Trail、Padel、五人制等品类延伸；摄影偏高对比、运动瞬间、霓虹点缀（尤其荧光绿/酸柠色），与深蓝主识别形成「传统专业 + 当代性能」双轨。

中国侧：荷马有限公司等主体运营大中华及东盟；中文称呼出现「骄马 / 霍马 / 荷马」并存。**本次未能打开可用的中国官网 `jomasport.com.cn`（连接失败）**；京东「JOMA官方旗舰店」页面可定位但前端重度依赖脚本，公开抓取几乎无静态视觉细节。**未发现公开可下载的官方中文标准字或完整 VI 手册。**

---

## 二、必须覆盖项

### 1) Logo

#### 主标（国际站当前用法）
- **组合标（官网页头 SVG）**：含左侧图形元素 + **ÁGUILA（鹰）路径** + **小写词标「joma」矢量字形** + 竖分隔线。来源：国际站 HTML 内嵌 SVG（`logo-joma` content asset）。
- **词标 alone**：粗、矮、宽的衬线/近板衬线小写「joma」；「J」常以无点上标的形式呈现为大写感；「a」有明显卷曲尾。第三方图库与官网海报均可见。
- **产品单标**：斜向、速度感强的抽象「J」（鞋侧、胸前、袜筒、球拍面常见），与完整词标并存——**球衣电商白底图上多为白「J」单标，而非完整词标**。

#### 是否有中文标
- **公开渠道未见到与拉丁词标同等规格的正式中文标准字 Logo**（如「骄马」锁死字形）。
- 中文市场称呼：**「骄马JOMA」**（企查猫等品牌库）、**「霍马」**（部分中文介绍站）、运营公司名 **「荷马有限公司」**——译名不统一，属升级需决策项。
- **观察（非定论）**：电商与公关文案多用拉丁「JOMA/Joma」+ 叙述性中文，而非中文图形标。

#### 历史演变简述（仅有来源才写）
来源：[logos-world.net/joma-logo](https://logos-world.net/joma-logo/)、[1000logos.net/joma-logo](https://1000logos.net/joma-logo/)（第三方 Logo 史，非品牌官方手册）：
- 约 **1973**：首个公开 Logo 记载为浅棕、手写印刷体感、装饰性衬线、略左倾。
- 曾使用 **猎鹰/鹰** 图形与字标组合；部分第三方叙述称后期「去掉鸟形、保留群青词标」——但 **2026 国际站页头 SVG 仍含 `ÁGUILA` 路径**，与「已完全去掉鹰」的说法不完全一致，应以官网现行资产为准。
- 词标形态长期稳定（粗衬线小写），微调多于大改——第三方常标注为「1965–Present」类延续叙事。

参考图：词标演变示意 [`assets/logo-joma-history-evolution.jpg`](/brand-collection/assets/joma/logo-joma-history-evolution.webp)（源 https://logos-world.net/wp-content/uploads/2020/01/Joma-Logo-History.jpg）；官网页头词标按 `#0026FF` 着色渲染 [`assets/logo-joma-official-header-blue.svg`](/brand-collection/assets/joma/logo-joma-official-header-blue.svg)（源自 https://www.joma-sport.com/en_US 页头 SVG）。

---

### 2) 色彩

#### 可观察描述（主色 / 辅色）
| 角色 | 可观察描述 | 备注 |
|------|------------|------|
| 主识别蓝 | 饱和正蓝 / 电光蓝至群青之间；Logo、导航、部分鞋款配色「royal blue」 | 官网 CSS 有明确 HEX（见下） |
| 深海军蓝 | 球衣短袜、深蓝训练服底色 | 产品色，非 VI 主标色 |
| 白 / 黑 | Logo 反白、高对比海报底、电商白底 | 极常见 |
| 霓虹酸柠 / 荧光绿 | 官网页脚条 `#d7ff00`；鞋面、跑步/足球海报大面积点缀 | 当代性能辅色，出现频率高 |
| 酒红/酒红条 | Teamwear 经典竖条配色之一（如 Inter Classic royal blue–burgundy） | 品类配色 |
| 青绿/Trail 技术色 | Trail 防水外套等户外色 | 品类延展 |

#### 有据可查的代码（非臆造）
**来自国际站官方 CSS `joma.css`（2026 抓取）：**
- Logo SVG 默认填充：**`#0026FF`**（规则示例：`.logo-joma svg{fill:#0026ff}`）
- 首页场景 Logo 常强制：**`#fff`**
- 同文件高频出现的深蓝系：`#0d00aa`、`#09006b`、`#060045`（用途含导航/轮播文案等，**不等同于正式品牌主色定义**）
- 页脚促销条背景：**`#d7ff00`**；另见 `#edff74`

**未在官网/公开 VI 中确认：** Pantone 编号。  
第三方中文转载曾写「Polynesian Blue / HEX `#004192` / Pantone PMS 287 C」（源自对 logos-world 类文章的转译，**非官网 VI**）——**与官网 CSS `#0026FF` 不一致，故不作官方依据；印刷色「待从图中提取 / 待官方确认」。**

---

### 3) 字体 / 排版气质（观察）

- **品牌词标**：定制粗衬线（近板衬线），稳重、厚重、偏「传统欧陆足球装备」而非无衬线科技风。
- **官网 UI 文案**（`joma.css` 字体族）：**Gotham Narrow** 系列为主；另见 **Roboto**、**Nunito Sans**。气质：窄体无衬线、运动电商常用的干净专业感。
- **品类海报字**：词标下方品类名（如 `FOOTBALL` / `RUNNING`）多为 **全大写、字距拉开的细无衬线**，与粗词标形成「重 logo + 轻品类」层级。
- **技术卖点字**：Trail 等详情用全大写无衬线标注防水透气数值，偏「装备规格说明书」气质。
- **无公开 Brand Type 中文字体规范。**

---

### 4) 包装、球衣、鞋盒、电商详情页的视觉共性（观察）

| 触点 | 公开可见共性 | 缺口 |
|------|--------------|------|
| **球衣 / Teamwear** | 胸前「J」单标；袜筒标；竖条/撞色经典足球语言；升华印花；白底棚拍三件套（衣+裤+袜） | — |
| **鞋 / 装备** | 鞋侧大号「J」；多色几何/速度线；霓虹点缀；与服装同色故事 | — |
| **电商详情（国际站）** | 白/浅灰棚拍 + 高质感运动海报；按运动分栏；强调科技图标（VTS、SPORTECH 等） | — |
| **鞋盒 / 包装** | **本次公开检索未找到清晰、可引用的官方鞋盒标准照或包装 VI 说明** | **待实拍/向品牌方索取** |
| **门店 / 广告** | 国际站以运动员海报、赛场/海岸/山野场景为主；中国实体店视觉本次未拿到一手图 | 中国门店 **待补** |

共性关键词（观察）：**高对比、专业棚拍、胸前标位规范、霓虹性能点缀、足球经典条纹可随时启用。**

---

### 5) 中国合资 / 中国官网 / 天猫京东 vs 国际站

| 渠道 | 状态与观察 |
|------|------------|
| **国际站** joma-sport.com | 2025 末/2026 站点改版叙事（官方博客）：强调产品影像、按运动导航、极简功能。Logo 为鹰+词标 SVG，色 `#0026FF` / 反白。 |
| **中国官网** jomasport.com.cn | **本次 curl/WebFetch 无法访问（失败/无有效内容）**，无法比对首页视觉。 |
| **运营主体** | 公开资料：早期「号马商贸（上海）」引入；2016 前后「荷马有限公司」（绍兴柯桥等，报道称与吉利等投资相关）自主经营大中华及东盟；品牌库称「骄马JOMA」。 |
| **京东旗舰店** mall.jd.com/index-618700.html | 店名「JOMA官方旗舰店」，Slogan 类文案可见「创立于1965年 西班牙运动品牌」。页面高度脚本化，**本次无法稳定抓取店招/详情视觉模块**。 |
| **天猫** 「joma官方旗舰店」 | 第三方比价/导购站可确认存在；商品名多用拉丁 JOMA + 中文品类描述。**未获取店招截图。** |

**一致性初步观察（非定论）：**
- **保留一致的可能性高**：拉丁 Logo、「西班牙/1965」叙事、足球鞋与 Teamwear 品类结构。
- **可能存在的差异**：中文译名不统一；中国主体曾强调「科技运动 + 时尚潮流 / 休闲款拓展」（2016 报道口径），国际站当前更偏专业运动分科；中国电商详情页本地化排版习惯（长图卖点）通常会与国际站 PLP 不同——**待打开旗舰店后台或实屏截图后核实**。

---

### 6) 可下载的官方 / 准官方资源

| 资源 | 链接 | 说明 |
|------|------|------|
| 国际官网 | https://www.joma-sport.com/ | 主视觉与产品图 |
| 目录页 / Catalogues | https://www.joma-sport.com/en_US/catalogo-clientes.html （及 landing-catalogo） | **TEAMWEAR COLLECTION 2026** 在线翻页：https://joma-sport.hflip.co/b59e072427.html |
| 官网博客（改版说明） | https://www.joma-sport.com/blog/en/joma-launches-its-new-website-innovation-and-accessibility-for-athletes/ | 设计取向描述，非 VI 手册 |
| 互动企业手册（历史） | https://indd.adobe.com/view/55a12bc3-c1ce-4e9b-ba75-0c17c6b83be1 | 官方博客曾引用；是否仍维护待打开确认 |
| 高清/矢量 Logo（非官方托管） | https://seeklogo.com/vector-logo/75974/joma ； https://1000logos.net/joma-logo/ ； https://logos-world.net/joma-logo/ | **第三方**，商用前需品牌授权 |
| **官方 Brand Book / Press Kit 下载包** | **本次未找到公开统一媒体包入口** | Press Day 面向受邀媒体；建议商务对接索取 |

官网页头 **官方 SVG** 及着色版：[`assets/logo-joma-official-header.svg`](/brand-collection/assets/joma/logo-joma-official-header.svg)、[`assets/logo-joma-official-header-blue.svg`](/brand-collection/assets/joma/logo-joma-official-header-blue.svg)；源页面 https://www.joma-sport.com/en_US 。

---

### 7) 已下载代表性图片清单（本地）

下表保留文件名和原始公开 URL。

| 文件名 | 内容 | 来源 URL |
|--------|------|----------|
| [`logo-joma-official-header.svg`](/brand-collection/assets/joma/logo-joma-official-header.svg) | 官网页头原始 SVG（含 ÁGUILA + 词标路径） | 内嵌于 https://www.joma-sport.com/en_US |
| [`logo-joma-official-header-blue.svg`](/brand-collection/assets/joma/logo-joma-official-header-blue.svg) / [`logo-joma-official-header-blue.png`](/brand-collection/assets/joma/logo-joma-official-header-blue.webp) | 按官网 CSS `#0026FF` 着色渲染 | 同上 + `joma.css` |
| [`logo-joma-favicon-official-196.png`](/brand-collection/assets/joma/logo-joma-favicon-official-196.webp) | 官网 favicon 196px | https://www.joma-sport.com/on/demandware.static/Sites-joma_es-Site/-/default/dwabc12609/images/favicon-196x196.png |
| [`logo-joma-wordmark-logos-world.png`](/brand-collection/assets/joma/logo-joma-wordmark-logos-world.webp) | 蓝词标（黑底）第三方 | https://logos-world.net/wp-content/uploads/2020/12/Joma-Logo.png |
| [`logo-joma-wordmark-blue-1000logos.png`](/brand-collection/assets/joma/logo-joma-wordmark-blue-1000logos.webp) | 蓝词标第三方 | https://1000logos.net/wp-content/uploads/2021/05/Joma-logo.png |
| [`logo-joma-history-evolution.jpg`](/brand-collection/assets/joma/logo-joma-history-evolution.webp) | 词标+「1965-PRESENT」演变示意 | https://logos-world.net/wp-content/uploads/2020/01/Joma-Logo-History.jpg |
| [`logo-joma-emblem-eagle-historical.png`](/brand-collection/assets/joma/logo-joma-emblem-eagle-historical.webp) | 第三方「徽标」图（蓝底白字词标） | https://logos-world.net/wp-content/uploads/2020/12/Joma-Emblem.png |
| [`homepage-banner-esbri-padel-2026.jpg`](/brand-collection/assets/joma/homepage-banner-esbri-padel-2026.webp) | 官网头图/Padel 大使拼图 | …/HOMEPAGE-2026/semana-36/banner-desktop-esbri-26.jpg |
| [`homepage-banner-trail-fw26.jpg`](/brand-collection/assets/joma/homepage-banner-trail-fw26.webp) | Trail 系列官网头图 | …/banner-desktop-trail-fw26.jpg |
| [`carousel-football-restyling-26.jpg`](/brand-collection/assets/joma/carousel-football-restyling-26.webp) | 足球品类海报（De Gea） | …/1-carrusel-futbol-deportes-restyling-26.jpg |
| [`carousel-running-restyling-26.jpg`](/brand-collection/assets/joma/carousel-running-restyling-26.webp) | 跑步品类海报 | …/6-carrusel-running-deportes-restyling-26.jpg |
| [`carousel-padel-restyling-26.jpg`](/brand-collection/assets/joma/carousel-padel-restyling-26.webp) | Padel 品类轮播 | …/2-carrusel-padel-…jpg |
| [`carousel-futsal-restyling-26.jpg`](/brand-collection/assets/joma/carousel-futsal-restyling-26.webp) | 五人制品类轮播 | …/3-carrusel-futsal-…jpg |
| [`banner-joma-team-26.jpg`](/brand-collection/assets/joma/banner-joma-team-26.webp) | #JOMATEAM / 跑步腿部特写 | …/banner-desktop-joma-team-26.jpg |
| [`banner-teamwear-catalog-cover.jpg`](/brand-collection/assets/joma/banner-teamwear-catalog-cover.webp) | Teamwear 目录入口图 | …/banner-teamwear-25.jpg |
| [`product-kit-inter-classic-royal-blue-burgundy.jpg`](/brand-collection/assets/joma/product-kit-inter-classic-royal-blue-burgundy.webp) | 球衣三件套电商图 | masterCatalog `103248.715_1.jpg` |
| [`product-kit-inter-classic-detail.jpg`](/brand-collection/assets/joma/product-kit-inter-classic-detail.webp) | 球衣细节图 | `103248.715_2.jpg` |

共 **17** 个文件（含 SVG/PNG Logo 衍生），代表性场景覆盖 Logo、官网头图、足球/跑步/Trail/Padel、Teamwear 产品。

---

## 三、与「运动品牌专业感 / 足球基因」相关的视觉关键词（观察，非臆造）

依据已下载海报与球衣图可见元素归纳：
- 鹰 / Águila、粗衬线小写 joma、抽象「J」单标  
- 深蓝识别、反白 Logo、荧光绿性能点缀  
- 胸前标位、袜筒标、竖条球衣、三件套棚拍  
- 职业运动员大使、夜场足球、赛道、山野 Trail  
- Teamwear 目录语言、升华印花、技术图标（防水透气等）  
- 「1965 / Spain」时间与产地叙事  

---

## 四、升级时可保留 vs 可改（初步观察，非定论）

### 可考虑保留（观察）
- **拉丁词标字形识别**与 **鹰 / 「J」单标体系**（国际资产完整且产品已落地）。  
- **深蓝主识别**（官网已落到 `#0026FF`；需与印刷色对齐后固化）。  
- **足球胸前标位与 Teamwear 经典语言**（竖条、三件套、袜标）——直接支撑「足球基因」。  
- **粗词标 + 窄体无衬线 UI** 的中西文混排骨架（中文可另选匹配的黑体/窄黑，而不必改词标）。

### 可考虑梳理或升级（观察）
- **中文品牌名统一**（骄马 / 霍马 / 荷马）及是否做中文标准字。  
- **Logo 体系层级澄清**：页头「鹰+词标」vs 产品「J」单标 vs 历史鹰标——对外手册需写清主副标，避免中国电商各用各的。  
- **主色以官网 CSS 为准做印刷/屏幕对照**；摒弃未经验证的第三方 Pantone 转载。  
- **中国数字触点**：官网可达性、天猫/京东店招与国际站影像语言对齐程度、长图详情是否削弱专业感。  
- **包装体系**：公开信息不足，中国升级若要做「开箱专业感」，需补鞋盒/吊牌/手提袋规范。  
- **辅色霓虹**：国际站很强；中国市场可评估是否过「户外跑鞋潮」而稀释西甲/足球专业印象——属策略选择，非对错。

---

## 五、信息缺口与下一步建议

1. 实屏截取天猫/京东旗舰店首页与详情长图，补「中国电商视觉」对照。  
2. 向西班牙总部或中国运营方索取：**Brand Guidelines、Pantone、中文字体、包装刀版**。  
3. 若 `jomasport.com.cn` 恢复，再抓首页与 Logo。  
4. 对 `#0026FF` Logo 色做印前打样，确认是否即为印刷主色。  
5. 鞋盒/门店实拍。

---

*本报告仅基于公开网页与已下载图像；第三方 Logo 史与色值转载已单独标注，不视为官方 VI。*
