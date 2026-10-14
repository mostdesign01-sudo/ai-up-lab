# 每周精选主视觉规范 / Weekly pick key visual guide

每期首页主推配一张主视觉，只要画面感强、和当期内容对得上就行。有两种来源，每期选效果更好的一种：

1. **来源主视觉（`kind: "source"`）**：推荐网站自己的首页主视觉、官方 OG 图、产品宣传图或高质量产品画面。适合本身视觉就很强的产品，例如生成式图像、3D、动效、设计工具。
2. **概念插画（`kind: "illustration"`，默认）**：按本站统一画风生成的插画。适合来源页面以文字或文档为主、拿不出好画面的条目，例如框架、协议、模型发布。

两种都没有时，首页会自动用条目的预览截图放进编辑框，不会空着。

## 怎么选（画面感标准）
- 一眼能看出主体：单一、清楚的视觉中心，不是一屏密密麻麻的界面或文字。
- 清晰度够：原图宽度至少 1200 px，不糊、不压缩发灰。
- 干净：没有 Cookie 弹窗、登录框、广告、浏览器边框，也不是只有 Logo 或纯文字标题的图。
- 和本期内容有关：看图能联想到这条推荐在做什么。
- 和站点调性不冲突：避免大面积霓虹、强烈闪烁感或与浅色版面打架的配色；必要时裁掉。

## 来源主视觉的交付
- 优先取官方提供的图（页面的 `og:image`、新闻稿配图、官方 Press Kit）；没有的话，用无头浏览器按 2 倍分辨率截取首页首屏的主视觉区域，裁掉导航和弹窗。
- 不要合成、改字或加水印，可以裁切和等比缩放。
- 横图直接按原比例交付（例如 1600 × 1000），首页会自动把横图放进编辑框；竖图或方图交付 1190 × 1322，会铺满主视觉位。
- 必须写来源署名：`"credit": {"zh": "Refero 官网", "en": "Refero website"}`。首页和往期页会显示“图片：…”。
- `data/home-picks.json` 示例：`"art": {"src": "/editorial/2026-w46.webp", "width": 1600, "height": 1000, "kind": "source", "credit": {"zh": "Refero 官网", "en": "Refero website"}}`

## 概念插画

### 交付
- 文件：`public/editorial/<week>.webp`（两种来源都放这里），例如 `public/editorial/2026-w43.webp`。
- 尺寸：1190 × 1322（竖版，约 9:10），WebP，质量 80 左右，体积尽量不超过 150 KB。
- 在 `data/home-picks.json` 对应一期加上 `"art": {"src": "/editorial/2026-w43.webp", "width": 1190, "height": 1322}`。
- 运行 `npm run build` 确认通过，再提交。

### 画风（不变的部分）
- 等距视角（isometric）的柔和 3D 插画，干净、扁平材质，带轻微高光和柔和投影。
- 背景：很浅的薰衣草紫（约 #F1ECFF），点阵网格和半透明淡紫方块作为装饰，大面积留白。
- 主色：品牌紫（约 #7B4FBF 到 #8B5CF6），细线连接件用紫色，端点是小圆点。
- 辅色只用少量：深墨蓝面板（约 #1E1B2E）、白色圆角方块、零星蓝 / 琥珀色点缀。
- 图标：线性、圆角端点，风格接近 Phosphor regular。
- 不要：文字、Logo、品牌标识、真实产品截图、人物、写实照片质感、霓虹、渐变大色块。

### 画面主体（每期变化的部分）
从当期条目里提炼一个具体隐喻，构图保持“左侧一个主物体 + 右侧 3–4 个连接的小方块”或同等简洁的结构。例：
- W42 Pi 1.0（编程 Agent 底座）：深色代码窗口 + 星芒 / 代码 / 地球 / 数据库方块。
- W43 NS UI（给 Agent 装的组件库）：一摞浮起的界面组件卡片（按钮、表单、卡片、导航条的抽象几何形），紫色连线从组件接到一个带星芒图标的方块，表示 Agent 在取用组件。
- W44 Transformer Explainer：一列层叠的半透明层板，之间有注意力连线与发光节点。
- W45 GPT-6 Intelligent UI：一个对话气泡里长出小型界面（滑块、图表、按钮的抽象形）。
- W46 Refero Styles：一张展开的设计规范卡（色板、字号阶梯、间距尺），连线指向代码窗口。

### 提示词模板
> Soft isometric 3D illustration, clean flat materials with gentle highlights and soft shadows. Very light lavender background (#F1ECFF) with a faint dot grid and a few translucent pale-violet squares. Brand violet (#7B4FBF–#8B5CF6) accents, thin violet connector lines ending in small dots, white rounded tiles with line icons in Phosphor style, one dark ink-navy (#1E1B2E) panel. Lots of empty space, portrait 1190×1322. Subject: {当期主体}. No text, no logos, no people, no real product screenshots, no neon.
