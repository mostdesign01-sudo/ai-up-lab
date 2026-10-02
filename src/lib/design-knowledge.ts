import { designSystemVersion, themes, foundations } from "./design-system";

export type Copy = { zh: string; en: string };
const c = (zh: string, en: string): Copy => ({ zh, en });
export interface DesignSpec {
  id: string;
  group: "foundation" | "component" | "pattern" | "workflow";
  title: Copy;
  definition: Copy;
  anatomy: Copy[];
  parameters: { name: string; value: string; usage: Copy }[];
  rules: Copy[];
  states: { name: Copy; behavior: Copy }[];
  good: Copy;
  bad: Copy;
  checks: Copy[];
  tokens: string[];
  code: { path: string; purpose: Copy }[];
  dependencies: string[];
  reference: string;
  snippet: string;
}
export const designGroups = [
  { id: "foundation", title: c("基础与素材", "Foundations & assets") },
  { id: "component", title: c("组件规范", "Components") },
  { id: "pattern", title: c("页面模式", "Page patterns") },
  { id: "workflow", title: c("AI 协作与验收", "AI & review") },
] as const;
export const referenceBase = "https://tmall-design.com/";
export const designKnowledge: DesignSpec[] = [
  {
    id: "foundations", group: "foundation", title: c("品牌、色彩与字体", "Brand, color & typography"),
    definition: c("用稳定的身份标志和语义变量统一界面；颜色说明作用，字号说明信息层级。", "Use a stable identity and semantic tokens. Color expresses purpose; typography establishes hierarchy."),
    anatomy: [c("身份：六边形轮廓、向上留白、45% 中心三角形。", "Identity: hexagonal outline, upward cutout, 45% central triangle."), c("颜色：品牌强调、内容表面、文字、边界与反馈。", "Color: brand, surfaces, text, borders, and feedback."), c("字体：Geist 与中文系统字体，代码使用 IBM Plex Mono。", "Type: Geist and system CJK fonts; IBM Plex Mono for code.")],
    parameters: [
      { name: "color.brand", value: `${themes.light.brand} / ${themes.dark.brand}`, usage: c("浅 / 深主题中的主动作与选中状态。", "Primary actions and selection in light / dark themes.") },
      { name: "color.text", value: `${themes.light.text} / ${themes.dark.text}`, usage: c("标题与正文；不要以品牌色替代整页正文。", "Headings and body; do not color all prose with the brand accent.") },
      { name: "type.body", value: `${foundations.typography.body}px / 1.7`, usage: c("常规说明正文；卡片短简介可使用专用密度。", "Regular prose; compact card descriptions use their own density.") },
      { name: "logo.centerScale", value: "45%", usage: c("围绕空心三角形重心等比缩小，保持方向。", "Scale around the triangle centroid without changing direction.") },
    ],
    rules: [c("使用语义色值，不在组件内部另造一套紫色。", "Use semantic colors instead of inventing component-specific violet values."), c("Logo 使用原始 SVG；保留至少 1/4 标志盒宽的留白。", "Use the supplied SVG and at least one-quarter box width of clear space."), c("普通文字与表面的对比度至少 4.5:1；状态含义同时用文字表达。", "Normal text must contrast at least 4.5:1 with its surface; label states in words as well as color."), c("区分选中与键盘焦点：选中保留强调，焦点有独立外描边。", "Differentiate selection from keyboard focus: persistent emphasis versus a separate outline.")],
    states: [{ name: c("浅色", "Light"), behavior: c("白色背景、近黑正文、深紫动作。", "White surfaces, near-black text, deep-violet actions.") }, { name: c("深色", "Dark"), behavior: c("深灰紫背景、浅色正文、浅紫动作；保留用户选择。", "Dark neutral surfaces, light text, lighter-violet actions; preserve user preference.") }],
    good: c("同一按钮引用品牌色和对应前景色；深浅主题一起验证。", "Pair the brand token with its on-brand token and verify both themes."),
    bad: c("深色主题继续使用白字配浅紫底，或把分隔线颜色用来显示正文。", "Use white text on pale violet in dark mode, or use a border color for body text."),
    checks: [c("深浅主题均可读，导出色值与实际界面一致。", "Both themes are readable and exported values match the interface."), c("16 / 24 / 32 px 下 Logo 的中心三角形都能辨认。", "The central triangle remains recognizable at 16/24/32px."), c("中英标题没有溢出或切断关键短语。", "Chinese and English titles fit without breaking key phrases.")],
    tokens: ["--lab-color-brand", "--lab-color-onBrand", "--lab-color-text", "--lab-font-sans"],
    code: [{ path: "src/lib/design-system.ts", purpose: c("主题与字体参数", "Theme and type tokens") }, { path: "src/components/BrandMark.astro", purpose: c("品牌标志组件", "Shared brand mark") }], dependencies: [], reference: "style/element/color",
    snippet: `.primary {\n  color: var(--lab-color-onBrand);\n  background: var(--lab-color-brand);\n  font-family: var(--lab-font-sans);\n}`,
  },
  {
    id: "layout", group: "foundation", title: c("栅格、间距与容器", "Grid, spacing & containers"),
    definition: c("用容器与间距组织阅读顺序，让同一套内容在手机和桌面自然重排。", "Use containers and spacing to preserve reading order as the same content reflows between mobile and desktop."),
    anatomy: [c("外层容器控制页面宽度与安全边距。", "The outer container sets content width and safe gutters."), c("内层栅格按内容类型决定列数，卡片内部保持自己的结构。", "The inner grid chooses columns by content type; cards preserve their internal anatomy."), c("相近内容使用小间距，不同主题使用较大区块间距。", "Use tighter spacing for related content and larger gaps between topics.")],
    parameters: [
      { name: "layout.maxWidth", value: "1344px", usage: c("本站宽内容容器上限。", "Maximum width for the site's wide content container.") },
      { name: "layout.gutter", value: "≥ 14px", usage: c("窄屏左右最小边距；宽屏由居中容器增加留白。", "Minimum narrow-screen gutters; centered wide containers add outer space.") },
      { name: "layout.breakpoints", value: "700 / 1050px", usage: c("主要重排点；组件也应检查 320px 的长文案。", "Primary reflow boundaries; also test long copy at 320px.") },
      { name: "spacing", value: "4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64", usage: c("先按语义分组，再从间距阶梯中选择。", "Group by meaning, then select a spacing step.") },
    ],
    rules: [c("采用 CSS 像素与响应式栅格；本站不是按天猫 750px 设计稿直接缩放的 App 页面。", "Use CSS pixels and responsive grids; this web system does not directly scale a 750px Tmall app canvas."), c("新建布局先保证单列阅读顺序，再增加列数。", "Establish a single-column reading order before adding columns."), c("使用 minmax(0, 1fr) 和可换行文案，避免内容撑破容器。", "Use minmax(0, 1fr) and wrapping copy to prevent overflow."), c("分类页标题、简介、资源数量之后直接进入内容，不插入大面积功能区。", "On category pages, follow title, description, and count directly with content.")],
    states: [{ name: c("手机", "Mobile"), behavior: c("单列内容；图片与文本可横向组成紧凑卡片，保持 DOM 阅读顺序。", "Single-column content; compact cards may align image and copy horizontally while preserving DOM order.") }, { name: c("桌面", "Desktop"), behavior: c("资源网格使用多列；首页主推与补充推荐按重要性分配宽度。", "Use multi-column resource grids; give the homepage lead more space than supporting picks.") }],
    good: c("同一容器中的标题、资源网格和底部操作对齐。", "Align headings, resource grids, and bottom actions to one container."), bad: c("为了凑满首屏把标题区拉高，或让卡片宽度由最长英文决定。", "Inflate the heading area to fill the viewport, or let the longest English word set card width."),
    checks: [c("320 / 390 / 768 / 1440 px 均无页面横向溢出。", "No page overflow at 320/390/768/1440px."), c("改变列数不会改变阅读顺序或隐藏重要操作。", "Changing columns does not reorder reading or hide important actions."), c("分类页第一张内容卡片在手机首屏可见。", "The first category card is visible in the mobile viewport.")],
    tokens: ["--lab-width-content", "--lab-space-16", "--lab-space-24"], code: [{ path: "src/styles/global.css", purpose: c("容器与目录栅格", "Containers and directory grid") }, { path: "src/styles/editorial.css", purpose: c("响应式首页布局", "Responsive editorial layout") }], dependencies: ["foundations"], reference: "style/layout/grid",
    snippet: `.resource-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 20px;\n}\n@media (max-width: 700px) {\n  .resource-grid { grid-template-columns: minmax(0, 1fr); }\n}`,
  },
  {
    id: "assets-motion", group: "foundation", title: c("图像、图标与动效", "Images, icons & motion"),
    definition: c("素材帮助识别内容，动效说明状态变化；它们都应服务于用户当前的动作。", "Assets help identify content; motion explains state changes. Both should support the user's current action."),
    anatomy: [c("真实预览：对应原资源，支持读者判断内容。", "Real preview: identifies the original resource and helps readers assess it."), c("概念插图：说明主题，不作为功能实测证据。", "Concept illustration: expresses a theme without implying hands-on validation."), c("图标与过渡：提供辅助识别和及时反馈。", "Icons and transitions: aid recognition and timely feedback.")],
    parameters: [
      { name: "icon.size", value: "18 / 20 / 24px", usage: c("按钮、导航和独立功能图标；使用 Phosphor regular。", "Button, navigation, and standalone icons; use Phosphor regular.") },
      { name: "image.ratio", value: "16:10 / 2:1", usage: c("目录封面 / 首页补充预览；手机紧凑卡片另用固定缩略图。", "Directory covers / supporting homepage previews; compact mobile cards use a fixed thumbnail.") },
      { name: "motion.feedback", value: "160ms ease-out", usage: c("按钮反馈、轻量展开；不延迟真实动作。", "Button feedback and lightweight reveals without delaying the actual action.") },
      { name: "motion.reduced", value: "0ms / no transform", usage: c("尊重减少动态效果设置，保留文字反馈。", "Respect reduced motion and retain textual feedback.") },
    ],
    rules: [c("优先使用有明确来源的真实预览；缺图时保留可读标题和来源。", "Prefer sourced real previews; keep title and source when an image is absent."), c("图片声明尺寸或宽高比，避免加载后把文字推走。", "Declare dimensions or aspect ratio to avoid shifting text after load."), c("Logo 等比完整展示；产品截图不能裁掉解释内容所必需的部分。", "Show the whole logo proportionally; do not crop evidence needed to understand a screenshot."), c("高频动作不使用弹跳或长入场动画。加载动画不能冒充真实进度。", "Avoid bounces and long entrances for frequent actions. Loading animation must not imply measured progress.")],
    states: [{ name: c("正常加载", "Loaded"), behavior: c("呈现完整预览，装饰性图片使用空替代文本。", "Display the preview; use empty alt text for decorative images.") }, { name: c("缺失图片", "Missing image"), behavior: c("保留正文与链接，不用随机生成图冒充产品界面。", "Keep text and links; never substitute a fabricated product screenshot.") }, { name: c("减少动态效果", "Reduced motion"), behavior: c("状态即时切换，完成结果仍用文字提示。", "Switch states instantly and announce completion in text.") }],
    good: c("点击后立即响应，160ms 的轻量反馈只解释变化。", "Respond immediately and use a short 160ms transition only to explain the change."), bad: c("先播一段装饰动画再执行操作，或自动循环移动正文。", "Play decorative animation before acting, or continuously animate reading content."),
    checks: [c("图片缺失时内容仍可理解和操作。", "Content remains understandable and actionable without images."), c("减少动态效果模式下没有位移或循环装饰动画。", "Reduced-motion mode removes movement and decorative loops."), c("图标按钮具有可读名称，真实截图与概念插图含义清楚。", "Icon buttons have names; real previews and conceptual art are distinguishable.")],
    tokens: ["--lab-space-16", "--lab-radius-card"], code: [{ path: "src/components/Icon.astro", purpose: c("图标库入口", "Shared icon library") }, { path: "src/components/EditorialPreview.astro", purpose: c("真实预览与无图内容", "Real previews and text-only content") }], dependencies: ["foundations"], reference: "style/element/motion",
    snippet: `@media (prefers-reduced-motion: reduce) {\n  .feedback { animation: none; transition: none; transform: none; }\n}`,
  },
  {
    id: "buttons", group: "component", title: c("按钮与行动层级", "Buttons & action hierarchy"),
    definition: c("按钮执行动作，链接进入目标。视觉层级应帮助读者找到当前最重要的下一步。", "Buttons perform actions and links navigate. Visual hierarchy should reveal the most useful next step."),
    anatomy: [c("文字标签：动词加对象，例如“浏览工具”“复制规则”。", "Label: a verb plus an object, such as Explore tools or Copy rules."), c("可选图标：补充方向或状态，不能替代必要文字。", "Optional icon: clarifies direction or state without replacing necessary words."), c("交互区域：包含内边距、焦点轮廓和禁用语义。", "Hit area: includes padding, a focus outline, and disabled semantics.")],
    parameters: [
      { name: "size.regular", value: "44px / 14px", usage: c("常规局部动作的最小高度与文字字号。", "Minimum height and label size for regular local actions.") },
      { name: "size.large", value: "48px / 16px", usage: c("手机主动作；桌面首页主推可用现有 56px 规格。", "Primary mobile actions; the desktop editorial lead may use the existing 56px variant.") },
      { name: "radius.control", value: "7px", usage: c("统一控件圆角；不要把所有按钮改成胶囊。", "Consistent control corners; avoid turning every control into a pill.") },
      { name: "emphasis", value: "primary / secondary / text", usage: c("主动作、补充动作、轻量导航，按任务重要性选择。", "Primary action, supporting action, and quiet navigation, chosen by task importance.") },
    ],
    rules: [c("一个局部任务突出一个主动作，避免多个实心紫色按钮争抢注意。", "Give one local task one primary action rather than competing solid-violet controls."), c("执行动作用 button；跳转用 a。不可用的动作必须真的不能触发。", "Use button for actions and a for navigation. Disabled actions must be inoperable."), c("加载时保留按钮宽度，设置 aria-busy 并阻止重复提交。", "Keep button width during loading, set aria-busy, and prevent repeat submission."), c("收藏是可逆切换，不能用提交成功的临时状态代替选中状态。", "Saving is a reversible toggle, not a transient submission-success state.")],
    states: [{ name: c("默认 / 悬停", "Default / hover"), behavior: c("标签清楚可读；悬停轻微改变表面，不移动布局。", "Keep labels readable; hover subtly changes the surface without moving layout.") }, { name: c("键盘焦点", "Keyboard focus"), behavior: c("2px 可见描边与内容分离，Tab 可到达。", "Use a separate visible 2px outline and preserve Tab navigation.") }, { name: c("加载", "Loading"), behavior: c("保留动作位置，禁止重复点击，完成后恢复可用并提示结果。", "Preserve position, prevent repeats, then restore the control and announce the result.") }, { name: c("禁用", "Disabled"), behavior: c("原生 disabled，不响应鼠标和键盘；必要时说明前置条件。", "Native disabled semantics; no mouse or keyboard activation. Explain prerequisites when needed.") }],
    good: c("“复制规则”执行本地复制，并给出完成或失败反馈。", "Copy rules performs a real clipboard action and reports success or failure."), bad: c("按钮写“了解更多”却没有目标，或用低透明度假装禁用。", "A Learn more button has no target, or opacity alone pretends to disable a control."),
    checks: [c("主次层级、加载和禁用状态都能区分。", "Primary, secondary, loading, and disabled states remain distinct."), c("加载期间重复激活不会再次执行。", "Repeated activation during loading cannot repeat the action."), c("焦点、键盘和两种语言都可用。", "Focus, keyboard use, and both languages work.")],
    tokens: ["--lab-color-brand", "--lab-color-onBrand", "--lab-radius-control"], code: [{ path: "src/components/ActionButton.astro", purpose: c("规范按钮与加载语义", "Guideline action button and loading semantics") }, { path: "src/components/FavButton.astro", purpose: c("站内收藏切换", "Site favorite toggle") }], dependencies: ["foundations", "assets-motion"], reference: "style/component/button",
    snippet: `import ActionButton from "../components/ActionButton.astro";\n\n<ActionButton variant="primary" size="regular">\n  <Loc zh="复制规则" en="Copy rules" />\n</ActionButton>`,
  },
  {
    id: "resource-cards", group: "component", title: c("资源卡片与收藏", "Resource cards & favorites"),
    definition: c("把预览、用途、来源与下一步放在一个可扫描的单元里，帮助读者从发现进入详情。", "Combine preview, purpose, source, and next action in a scannable unit that leads readers into a resource."),
    anatomy: [c("可选预览 → 目录标签 → 标题 → 短简介 → 来源域名。", "Optional preview → section → title → short description → source host."), c("主链接包裹内容区域，收藏按钮作为相邻独立控件。", "The primary link wraps the content; the favorite button is a separate sibling."), c("稳定键由来源库与原始 id 组成，不能用当前列表位置替代。", "Stable keys combine source library and original ID, never list position.")],
    parameters: [
      { name: "card.radius", value: "8px", usage: c("统一卡片边界，悬停仅强调边线。", "Consistent card edge; hover emphasizes the border only.") },
      { name: "card.title", value: "17px / mobile 15px", usage: c("桌面纵向卡片 / 手机紧凑卡片。", "Desktop vertical / compact mobile card.") },
      { name: "card.thumbnail", value: "16:10 / mobile 100×90px", usage: c("桌面封面比例与当前手机缩略图规格。", "Desktop cover ratio and current mobile thumbnail size.") },
      { name: "favorite.key", value: "library:id", usage: c("与详情页和收藏页共用同一个稳定键。", "Share the stable key with detail and saved pages.") },
    ],
    rules: [c("短简介写具体用途，不重复长标题，也不把宣传语当事实。", "Describe a concrete purpose without repeating the title or presenting promotion as fact."), c("长标题可换行；优先保证产品名和用途可读。", "Wrap long titles and preserve readable product names and purpose."), c("无图条目仍然展示完整正文；不要补一个无关图片。", "Text-only entries retain full copy; do not fill the gap with unrelated imagery."), c("收藏不触发卡片导航；刷新与详情页之间保持同一状态。", "Saving must not navigate; preserve the state across refresh and detail views.")],
    states: [{ name: c("有图 / 无图", "With / without image"), behavior: c("两者都能独立传达用途与来源，图像不决定是否可阅读。", "Both communicate purpose and source independently of imagery.") }, { name: c("未收藏 / 已收藏", "Unsaved / saved"), behavior: c("图标、可读标签与 aria-pressed 同步；重复点击可以撤销。", "Synchronize icon, label, and aria-pressed; clicking again reverses it.") }, { name: c("数据陈旧", "Stale data"), behavior: c("以真实核验日期和说明表达状态，不自动伪装成“已验证”。", "Use real review dates and explanations; never invent a verified badge.") }],
    good: c("“CSS Bed：切换 HTML 的 CSS 主题”，附 cssbed.com 来源。", "CSS Bed: switch CSS themes for HTML, with the cssbed.com source."), bad: c("“最强神器，效率暴涨 100 倍”，没有来源或使用条件。", "The ultimate tool: 100× faster, with no source or requirements."),
    checks: [c("无图、长中文标题和长英文域名均不溢出。", "Missing images, long Chinese titles, and long hosts do not overflow."), c("收藏与详情跳转可以分别用键盘触发。", "Keyboard users can save and navigate independently."), c("来源库 id 与旧收藏键保持兼容。", "Source IDs remain compatible with existing saved keys.")],
    tokens: ["--lab-radius-card", "--lab-color-surface", "--lab-color-border"], code: [{ path: "src/components/DirectoryCard.astro", purpose: c("卡片结构与链接", "Card anatomy and links") }, { path: "src/components/FavButton.astro", purpose: c("收藏按钮", "Favorite control") }, { path: "src/lib/directory.ts", purpose: c("统一内容对象", "Unified resource objects") }], dependencies: ["foundations", "layout", "buttons"], reference: "style/component/product-card",
    snippet: `import DirectoryCard from "../components/DirectoryCard.astro";\nimport { entries } from "../lib/directory";\nconst entry = entries.find(item => item.key === "html:css-bed");\n\n{entry && <DirectoryCard entry={entry} />}`,
  },
  {
    id: "navigation", group: "component", title: c("导航与渐进展开", "Navigation & progressive disclosure"),
    definition: c("主导航对应稳定任务目录，把搜索、收藏和站点说明安排在合适层级。", "Map primary navigation to stable task sections, with search, saved items, and site information at appropriate levels."),
    anatomy: [c("品牌入口与五个任务目录构成全站主导航。", "The brand entry and five task sections form the global navigation."), c("更多菜单承载搜索、更新记录、关于和设计规范。", "More contains search, update notes, about, and design guidelines."), c("独立规范目录仅在规范库出现，不占用资源分类页。", "The documentation index appears only in the handbook, not resource sections.")],
    parameters: [
      { name: "nav.active", value: "aria-current=page", usage: c("当前位置不是 hover，离开鼠标后仍保留标记。", "The current page is not a hover state and remains marked after pointer exit.") },
      { name: "menu.primitive", value: "details / summary", usage: c("菜单在无 JavaScript 时仍可展开。", "Menus remain operable without JavaScript.") },
      { name: "list.initial", value: "24", usage: c("目录初始展示 24 条，再按需展开。", "Show 24 entries first, then reveal more on request.") },
    ],
    rules: [c("搜索只在独立搜索页提供完整条件，目录浏览首屏先给内容。", "Keep full search controls on the search page and show content first in sections."), c("折叠菜单支持 Escape 关闭并把焦点还给触发器。", "Escape closes the menu and returns focus to its trigger."), c("展开更多条目后，把焦点移到第一条新内容。", "After revealing more entries, focus the first newly revealed item."), c("当前位置同时用文字或下划线表达，不仅靠颜色。", "Use text or an underline in addition to color for the current location.")],
    states: [{ name: c("当前位置", "Current page"), behavior: c("保留强调与 aria-current，帮助用户定位。", "Keep emphasis and aria-current to indicate location.") }, { name: c("菜单打开", "Menu open"), behavior: c("目标全部可读，内容不超出手机视口。", "Show readable destinations within the mobile viewport.") }, { name: c("加载更多", "Reveal more"), behavior: c("按序增加内容，不跳回页首；全部显示后隐藏按钮。", "Append in order without returning to the top; hide the control once complete.") }],
    good: c("进入“学习与工作流”后立即浏览条目，需要查找时再打开搜索。", "Browse Learning & workflows immediately and open search when a specific goal emerges."), bad: c("每个分类都重复展示搜索、排序、难度和格式控件。", "Repeat search, sort, level, and format controls on every category page."),
    checks: [c("主导航、菜单和规范目录都能识别当前位置。", "Global, menu, and handbook navigation indicate location where relevant."), c("手机菜单不溢出，Escape 后焦点位置正确。", "Mobile menus fit and Escape restores focus."), c("旧筛选链接仍能进入对应搜索范围。", "Legacy filtered links retain their search scope.")],
    tokens: ["--lab-color-brand", "--lab-logo-mobile"], code: [{ path: "src/components/Header.astro", purpose: c("全站导航与菜单", "Global navigation and menu") }, { path: "src/components/DirectoryListing.astro", purpose: c("渐进展开与旧链接兼容", "Progressive reveal and legacy links") }], dependencies: ["buttons", "layout"], reference: "style/component/top-bar",
    snippet: `<a href={withBase("learn/")} aria-current={active ? "page" : undefined}>\n  <Loc zh="学习与工作流" en="Learning & workflows" />\n</a>`,
  },
  {
    id: "feedback", group: "component", title: c("加载、空白与错误反馈", "Loading, empty & error feedback"),
    definition: c("让用户理解发生了什么、哪些内容仍可用，以及下一步能做什么。", "Explain what happened, what remains usable, and what the user can do next."),
    anatomy: [c("状态标题说明当前情况。", "A state heading explains the current situation."), c("短说明给出原因或限制，只写已知事实。", "A short explanation gives a known cause or constraint."), c("恢复动作具体可执行，例如重试或查看全部。", "A concrete recovery action offers retry or a broader view.")],
    parameters: [
      { name: "loading", value: "aria-busy=true", usage: c("仅标记正在更新的区域，不封锁无关内容。", "Mark the updating region without blocking unrelated content.") },
      { name: "status", value: "role=status / polite", usage: c("复制完成、收藏变更等非阻断结果。", "Non-blocking results such as copied text or saved state.") },
      { name: "feedback.duration", value: "4.5s", usage: c("短暂操作提示可自动消失；错误原因留在原区域。", "Transient confirmations may clear automatically; persistent errors remain in context.") },
    ],
    rules: [c("加载骨架预留内容尺寸，不能把“没有内容”当成“仍在加载”。", "Reserve content dimensions with skeletons and distinguish no content from still loading."), c("局部失败只影响对应模块，保留导航、已有内容和退出方式。", "Contain failures to the affected module while retaining navigation and usable content."), c("空状态给出可操作的下一步，避免只留一个空白盒。", "Empty states offer a next step instead of an unexplained blank box."), c("错误状态不能只有红色；写清可确认的原因和重试方式。", "Errors require words as well as red, with a known reason and a retry path.")],
    states: [{ name: c("加载中", "Loading"), behavior: c("展示稳定占位；完成后替换为内容并结束 busy 状态。", "Show a stable placeholder, then replace it with content and clear busy state.") }, { name: c("无匹配", "No matches"), behavior: c("说明当前没有匹配项，提供清除条件或浏览入口。", "Explain the lack of matches and offer reset or browsing.") }, { name: c("失败", "Failure"), behavior: c("保留上下文，重试只作用于失败模块。", "Keep context and retry the affected module only.") }, { name: c("完成", "Complete"), behavior: c("即时反馈并保留可继续操作的状态。", "Announce completion while keeping the interface usable.") }],
    good: c("“未能复制，可选中文字或下载文件”，仍保留文档。", "Copy failed; select the text or download the file, while keeping the document accessible."), bad: c("仅弹出“错误”，或因一张预览失败让整页不可点击。", "Show only Error, or block the whole page because one preview failed."),
    checks: [c("加载、无匹配和失败状态可以分别触发与恢复。", "Loading, no-match, and failure states can each be triggered and recovered."), c("反馈通过可读文本表达，读屏能收到结果。", "Readable text and live status expose the result."), c("恢复后焦点仍在有意义的位置。", "Recovery leaves focus in a meaningful place.")],
    tokens: ["--lab-color-success", "--lab-color-warning", "--lab-color-error", "--lab-color-soft"], code: [{ path: "src/components/DirectoryExplorer.astro", purpose: c("真实搜索空状态", "Real search empty state") }, { path: "src/components/BrandSpecDemo.astro", purpose: c("状态转换与恢复演示", "State transitions and recovery examples") }], dependencies: ["buttons", "assets-motion"], reference: "case/feed",
    snippet: `<section aria-busy="true" aria-label="资源列表">\n  <!-- Keep the layout stable while loading. -->\n</section>\n<p role="status" aria-live="polite"></p>`,
  },
  {
    id: "page-patterns", group: "pattern", title: c("首页、分类与详情模板", "Home, section & detail patterns"),
    definition: c("按用户意图选择最小必要结构：发现内容、直接浏览、定向查找或理解用法。", "Choose the smallest useful structure for discovery, browsing, targeted search, or understanding a resource."),
    anatomy: [c("首页：主推与补充 → 最近更新 → 目录 → 入门入口。", "Home: lead and supporting picks → recent updates → sections → starter guides."), c("分类：标题与简介 → 数量 → 最新列表 → 继续展开。", "Category: title and description → count → newest entries → progressive reveal."), c("详情：用途 → 来源与日期 → 用法与限制 → 相关资源。", "Detail: purpose → source and dates → usage and limits → related resources."), c("搜索：查询与筛选 → 结果数量 → 结果 / 空状态。", "Search: query and filters → count → results or empty state.")],
    parameters: [
      { name: "home.featured", value: "1 lead + 2 supporting", usage: c("仅为首页精选分配强层级。", "Reserve strong editorial hierarchy for homepage picks.") },
      { name: "category.order", value: "updatedAt desc / key asc", usage: c("按已有更新日期排序，相同日期保持稳定顺序。", "Sort by existing update date, then stable key for ties.") },
      { name: "detail.evidence", value: "source + context", usage: c("区分来源核对、作者声称与操作实测。", "Distinguish source checks, author claims, and hands-on testing.") },
    ],
    rules: [c("内容量与用户目标决定是否需要筛选；分类首页不默认继承搜索页复杂度。", "Content volume and user intent determine filtering; categories do not inherit search complexity by default."), c("首页精选优先看质量与具体用途，不用最新日期代替推荐理由。", "Select editorial picks by usefulness, not by treating recency as a recommendation."), c("不要在示例里伪造用户量、效果提升、评分或核验时间。", "Do not fabricate user counts, performance gains, ratings, or verification dates."), c("复用现有详情 URL、收藏键和静态阅读能力。", "Preserve existing detail URLs, saved keys, and static reading.")],
    states: [{ name: c("内容充足", "Enough content"), behavior: c("保持精选与最新条目的角色区分，渐进展示长列表。", "Separate editorial and recent roles; progressively reveal long lists.") }, { name: c("内容稀少", "Sparse content"), behavior: c("使用直接列表，不填充无内容的大模块。", "Use a direct list without large empty modules.") }, { name: c("定向查找", "Targeted search"), behavior: c("进入独立搜索页，URL 保留条件便于分享。", "Use the dedicated search page with shareable URL state.") }],
    good: c("三个真正值得看的推荐，比十个没有理由的占位模块更有用。", "Three justified picks are more useful than ten unexplained placeholder modules."), bad: c("照搬电商价格、优惠券和促销倒计时到 AI 资源目录。", "Copy prices, coupons, or promotional countdowns into an AI resource directory."),
    checks: [c("首屏直接回答“这里有什么、下一步做什么”。", "The viewport answers what is here and what to do next."), c("每个模块都有真实内容来源与明确目的。", "Each module has a real content source and purpose."), c("页面稀疏、空结果和长列表都有合理结构。", "Sparse, empty-result, and long-list pages have appropriate structures.")],
    tokens: ["--lab-width-content", "--lab-space-24", "--lab-space-48"], code: [{ path: "src/components/HomeShell.astro", purpose: c("编辑精选首页", "Editorial homepage") }, { path: "src/pages/[section].astro", purpose: c("分类页", "Category page") }, { path: "src/pages/search.astro", purpose: c("独立搜索页", "Dedicated search page") }], dependencies: ["resource-cards", "navigation", "feedback", "layout"], reference: "case/feed",
    snippet: `import DirectoryListing from "../components/DirectoryListing.astro";\n\n<h1><Loc zh="学习与工作流" en="Learning & workflows" /></h1>\n<p><Loc zh="从教程开始实践。" en="Start with a practical guide." /></p>\n<DirectoryListing section="learn" />`,
  },
  {
    id: "ai-workflow", group: "workflow", title: c("AI 工作说明与代码映射", "AI briefs & code mapping"),
    definition: c("让 AI 先理解任务，再查需要的规则，最后按现有组件实现并验证。", "Have AI understand the task, retrieve relevant rules, implement with existing components, and verify the result."),
    anatomy: [c("任务：页面类型、读者、目标与真实内容来源。", "Task: page type, audience, outcome, and real content source."), c("规则：相关对象的定义、参数、使用边界与状态。", "Rules: definitions, parameters, constraints, and states for relevant objects."), c("映射：稳定对象 id、依赖、变量名和实际代码文件。", "Mapping: stable IDs, dependencies, tokens, and actual source files."), c("验收：截图、交互和构建结果与规则对照。", "Review: compare screenshots, interactions, and build results against the rules.")],
    parameters: [
      { name: "knowledge.json", value: "structured registry", usage: c("检索对象、依赖与代码位置；不是自动生成服务。", "Retrieve objects, dependencies, and code locations; it is not a generation service.") },
      { name: "rules/*.md", value: "one object / file", usage: c("按需给 AI 对应规范，减少无关上下文。", "Give AI the relevant object guide without unrelated context.") },
      { name: "task", value: "create / modify / review", usage: c("区分新建、改动和检查，明确交付内容。", "Differentiate creation, modification, and review outputs.") },
    ],
    rules: [c("先引用现有组件和 token；确有缺口再说明新增组件的理由。", "Reference existing components and tokens first; justify a new component when coverage is missing."), c("生成前列出页面结构和规则 id，避免只给一段模糊风格描述。", "List page structure and rule IDs before generation instead of supplying only vague style adjectives."), c("修改范围与验收条件进入工作说明，保留真实数据边界。", "Include scope and acceptance criteria while respecting real-data boundaries."), c("本站提供静态 JSON、CSS 和 Markdown 接入；目前没有对外 MCP 服务。", "This site exposes static JSON, CSS, and Markdown; it does not currently expose an MCP service.")],
    states: [{ name: c("新建", "Create"), behavior: c("给出页面结构、组件选择和响应式方案，再实现。", "Specify structure, components, and responsive behavior before implementing.") }, { name: c("修改", "Modify"), behavior: c("说明目标区域、需要保留的内容与改动依据。", "Identify the target area, retained context, and rationale.") }, { name: c("检查", "Review"), behavior: c("输出问题、对应规则、证据与修改建议，不把建议写成已完成。", "Report findings, rule IDs, evidence, and recommendations without claiming implementation.") }],
    good: c("读取 resource-cards 规则和实际组件，再改卡片简介与状态。", "Read resource-cards and its actual implementation before changing copy and states."), bad: c("只输入“高级、科技、简洁”，让 AI 自行猜测品牌、内容和操作。", "Ask only for premium, futuristic, minimal and let AI guess brand, content, and behavior."),
    checks: [c("工作说明包含任务、目标页面、相关规则和验收方式。", "The brief includes task, target page, relevant rules, and validation."), c("映射中的组件路径确实存在。", "Every mapped source path exists."), c("没有把示例服务或 MCP 配置描述为已部署能力。", "Examples and MCP configurations are not presented as deployed capabilities.")],
    tokens: [], code: [{ path: "src/lib/design-knowledge.ts", purpose: c("规则与映射注册表", "Rules and mapping registry") }, { path: "src/components/BrandBriefBuilder.astro", purpose: c("任务工作说明生成器", "Task brief builder") }], dependencies: ["page-patterns"], reference: "blog/building-design-wiki-for-aigui",
    snippet: `// Read the public knowledge registry, then the referenced source files.\nconst knowledge = await fetch("/grokbot-use-cases/brand/knowledge.json")\n  .then(response => response.json());\nconst cardSpec = knowledge.objects.find(item => item.id === "resource-cards");`,
  },
  {
    id: "review", group: "workflow", title: c("设计验收与维护", "Design review & maintenance"),
    definition: c("把品牌一致性、交互完整性和内容可靠性变成可复核的验收项。", "Make brand consistency, interaction completeness, and content reliability reviewable."),
    anatomy: [c("基础：Logo、语义色彩、字号与间距。", "Foundations: logo, semantic color, type, and spacing."), c("交互：焦点、状态、键盘、恢复路径与收藏。", "Interaction: focus, states, keyboard, recovery, and saved items."), c("内容：来源、日期、双语与真实用途。", "Content: sources, dates, both languages, and real purpose."), c("维护：版本、共用参数、代码映射与静态导出同步。", "Maintenance: synchronize versions, shared tokens, code mappings, and exports.")],
    parameters: [
      { name: "severity.blocking", value: "broken / misleading", usage: c("无法完成任务、内容错误、链接失效或关键操作不可达。", "Broken tasks, incorrect content, dead links, or inaccessible core actions.") },
      { name: "severity.major", value: "hierarchy / states", usage: c("首屏内容被挤走、关键状态缺失、手机严重溢出。", "Buried content, missing key states, or major mobile overflow.") },
      { name: "severity.polish", value: "consistency", usage: c("局部间距、非关键文案和轻微视觉差异。", "Local spacing, non-critical wording, and minor visual inconsistencies.") },
    ],
    rules: [c("每个问题附具体页面、规则 id 和可复现证据。", "Attach a page, rule ID, and reproducible evidence to each finding."), c("先解决阻断与主要问题，再调整视觉细节。", "Resolve blocking and major findings before polishing."), c("检查通过只覆盖实际执行的项目，不推导完整合规认证。", "A pass covers executed checks only and does not imply full certification."), c("改动公共规则时同步规则文本、映射和代码示例。", "When shared rules change, update prose, mappings, and code examples together.")],
    states: [{ name: c("待检查", "Not checked"), behavior: c("没有运行就保留待检查，不预先勾选。", "Keep items unchecked until verified.") }, { name: c("发现问题", "Issue found"), behavior: c("记录证据、严重度和修复动作。", "Record evidence, severity, and the fix.") }, { name: c("已验证", "Verified"), behavior: c("记录实际验证范围，改动后复查相关项。", "Record the verified scope and recheck affected items after changes.") }],
    good: c("“390px 下分类首卡可见，按钮可键盘触发”，附截图或检查结果。", "At 390px, the first card is visible and actions are keyboard-operable, with evidence."), bad: c("只写“看起来不错”或把所有检查默认标记为通过。", "Write only looks good or mark all checks as passed by default."),
    checks: [c("检查记录能对应具体页面与规则。", "Review records identify the page and rule."), c("重要问题已关闭，剩余问题明确说明。", "Important findings are resolved and remaining ones are explicit."), c("构建通过，相关交互已实际操作。", "The build passes and affected interactions were exercised.")],
    tokens: [], code: [{ path: "scripts/verify-build.mjs", purpose: c("构建与规范数据检查", "Build and design-data verification") }], dependencies: ["foundations", "layout", "buttons", "resource-cards", "feedback"], reference: "blog/building-design-wiki-for-aigui",
    snippet: `npm run build\n# Then exercise affected pages in both themes and languages.\n# Capture evidence at 320, 390, 768, and 1440 CSS px.`,
  },
];

export function specMarkdown(spec: DesignSpec) {
  const lines = (items: Copy[]) => items.map(item => `- ${item.zh}\n  ${item.en}`).join("\n");
  return `# ${spec.title.zh} / ${spec.title.en}\n\nID: ${spec.id}\nVersion: ${designSystemVersion}\n\n${spec.definition.zh}\n\n${spec.definition.en}\n\n## Anatomy\n${lines(spec.anatomy)}\n\n## Parameters\n${spec.parameters.map(p => `- ${p.name}: ${p.value}\n  ${p.usage.zh}\n  ${p.usage.en}`).join("\n")}\n\n## Rules\n${lines(spec.rules)}\n\n## States\n${spec.states.map(s => `- ${s.name.zh} / ${s.name.en}: ${s.behavior.zh}\n  ${s.behavior.en}`).join("\n")}\n\n## Do / Avoid\n- Do: ${spec.good.zh} / ${spec.good.en}\n- Avoid: ${spec.bad.zh} / ${spec.bad.en}\n\n## Code mapping\n${spec.code.map(ref => `- ${ref.path}: ${ref.purpose.zh} / ${ref.purpose.en}`).join("\n")}\n\n## Dependencies\n${spec.dependencies.join(", ") || "None"}\n\n## Acceptance\n${lines(spec.checks)}\n\n## Implementation example\n\`\`\`\n${spec.snippet}\n\`\`\`\n\n## Reference\nMethod reference: ${referenceBase}#${spec.reference}\nRules, parameters, examples, and branding in this file are specific to AI UP LAB.\n`;
}
export function resolveSpecs(ids: string[]) {
  const chosen = new Set<string>();
  const visit = (id: string) => { if (chosen.has(id)) return; const spec = designKnowledge.find(item => item.id === id); if (!spec) return; chosen.add(id); spec.dependencies.forEach(visit); };
  ids.forEach(visit);
  return designKnowledge.filter(spec => chosen.has(spec.id));
}
export const taskModes = [c("新建页面", "Create a page"), c("修改界面", "Modify an interface"), c("检查设计", "Review a design")];
export const pageModes = [c("首页", "Homepage"), c("分类页", "Category page"), c("资源详情", "Resource detail"), c("搜索页", "Search page")];
export function taskBrief(task: number, page: number, requirement: string, origin: string) {
  const specs = resolveSpecs(task === 2 ? ["page-patterns", "review"] : ["page-patterns"]);
  return `# AI UP LAB · ${taskModes[task]?.zh ?? taskModes[0].zh}\n\n## Task\n${taskModes[task]?.en ?? taskModes[0].en}\nPage: ${pageModes[page]?.zh ?? pageModes[0].zh} / ${pageModes[page]?.en ?? pageModes[0].en}\n\n## Requirement\n${requirement.trim() || "说明目标读者、需要完成的任务、真实内容来源与改动范围。 / Describe the audience, task, real content source, and scope."}\n\n## Read first\n- ${origin}brand/tokens.json\n- ${origin}brand/knowledge.json\n${specs.map(spec => `- ${origin}brand/rules/${spec.id}.md`).join("\n")}\n\n## Workflow\n1. Clarify task and scope.\n2. Select relevant rule IDs and existing components.\n3. Outline page structure and responsive behavior.\n4. ${task === 2 ? "Inspect actual screenshots and interactions; report findings with evidence." : "Implement using shared tokens and existing source data."}\n5. Verify the affected states, both languages, and both themes.\n\n## Required output\n${task === 2 ? "Findings with page, rule ID, severity, evidence, and recommended fix. Do not claim unperformed checks." : "Working changes, a short rationale mapped to rule IDs, and actual validation results."}\n\n## Relevant code\n${[...new Set(specs.flatMap(spec => spec.code.map(ref => ref.path)))].map(path => `- ${path}`).join("\n")}\n\n## Acceptance\n- Keep real sources, resource IDs, favorite keys, and legacy URLs.\n- Category pages show content immediately; full filters belong to search.\n- Use Chinese and English copy and both theme palettes.\n- Check 320/390/768/1440px, keyboard focus, loading/empty/error states, and saved state.\n- Run npm run build and exercise affected interactions.\n`;
}
