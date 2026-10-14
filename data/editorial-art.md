# 每周精选插画规范 / Weekly pick art guide

每期首页主推可以配一张专属概念插画。画风保持一致，只换画面主体，这样首页每周不同，调性不变。参考样张：`public/editorial/agent-workflow.webp`（W42）。

## 交付
- 文件：`public/editorial/<week>.webp`，例如 `public/editorial/2026-w43.webp`。
- 尺寸：1190 × 1322（竖版，约 9:10），WebP，质量 80 左右，体积尽量不超过 150 KB。
- 在 `data/home-picks.json` 对应一期加上 `"art": {"src": "/editorial/2026-w43.webp", "width": 1190, "height": 1322}`。
- 运行 `npm run build` 确认通过，再提交。

## 画风（不变的部分）
- 等距视角（isometric）的柔和 3D 插画，干净、扁平材质，带轻微高光和柔和投影。
- 背景：很浅的薰衣草紫（约 #F1ECFF），点阵网格和半透明淡紫方块作为装饰，大面积留白。
- 主色：品牌紫（约 #7B4FBF 到 #8B5CF6），细线连接件用紫色，端点是小圆点。
- 辅色只用少量：深墨蓝面板（约 #1E1B2E）、白色圆角方块、零星蓝 / 琥珀色点缀。
- 图标：线性、圆角端点，风格接近 Phosphor regular。
- 不要：文字、Logo、品牌标识、真实产品截图、人物、写实照片质感、霓虹、渐变大色块。

## 画面主体（每期变化的部分）
从当期条目里提炼一个具体隐喻，构图保持“左侧一个主物体 + 右侧 3–4 个连接的小方块”或同等简洁的结构。例：
- W42 Pi 1.0（编程 Agent 底座）：深色代码窗口 + 星芒 / 代码 / 地球 / 数据库方块。
- W43 NS UI（给 Agent 装的组件库）：一摞浮起的界面组件卡片（按钮、表单、卡片、导航条的抽象几何形），紫色连线从组件接到一个带星芒图标的方块，表示 Agent 在取用组件。
- W44 Transformer Explainer：一列层叠的半透明层板，之间有注意力连线与发光节点。
- W45 GPT-6 Intelligent UI：一个对话气泡里长出小型界面（滑块、图表、按钮的抽象形）。
- W46 Refero Styles：一张展开的设计规范卡（色板、字号阶梯、间距尺），连线指向代码窗口。

## 提示词模板
> Soft isometric 3D illustration, clean flat materials with gentle highlights and soft shadows. Very light lavender background (#F1ECFF) with a faint dot grid and a few translucent pale-violet squares. Brand violet (#7B4FBF–#8B5CF6) accents, thin violet connector lines ending in small dots, white rounded tiles with line icons in Phosphor style, one dark ink-navy (#1E1B2E) panel. Lots of empty space, portrait 1190×1322. Subject: {当期主体}. No text, no logos, no people, no real product screenshots, no neon.
