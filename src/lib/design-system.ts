export const designSystemVersion = "1.1.0";
export const designSystemUpdatedAt = "2026-10-02";

export const colorRoles = [
  { id: "background", zh: "页面底色", en: "Background", variable: "--bg" },
  { id: "surface", zh: "内容表面", en: "Surface", variable: "--bg-card" },
  { id: "elevated", zh: "浮层表面", en: "Elevated surface", variable: "--bg-elev" },
  { id: "soft", zh: "柔和底色", en: "Soft surface", variable: "--bg-soft" },
  { id: "text", zh: "主要文字", en: "Primary text", variable: "--ink" },
  { id: "muted", zh: "辅助文字", en: "Secondary text", variable: "--muted" },
  { id: "subtle", zh: "来源与注释", en: "Metadata", variable: "--faint" },
  { id: "border", zh: "分隔线", en: "Border", variable: "--line" },
  { id: "borderStrong", zh: "强调边界", en: "Strong border", variable: "--line-strong" },
  { id: "brand", zh: "品牌紫", en: "Brand violet", variable: "--brass" },
  { id: "brandSoft", zh: "品牌浅底", en: "Soft violet", variable: "--brass-soft" },
  { id: "onBrand", zh: "主按钮文字", en: "On-brand text", variable: "--accent-ink" },
  { id: "success", zh: "完成状态", en: "Success", variable: "--lab-color-success" },
  { id: "warning", zh: "待复核状态", en: "Warning", variable: "--lab-color-warning" },
  { id: "error", zh: "失效状态", en: "Error", variable: "--lab-color-error" },
] as const;
export type ColorRole = typeof colorRoles[number]["id"];
export const themes: Record<"light" | "dark", Record<ColorRole, string>> = {
  light: {
    background: "#fffefd", surface: "#ffffff", elevated: "#ffffff", soft: "#f5f2fa",
    text: "#17151b", muted: "#625d6d", subtle: "#777080", border: "#e8e5ee", borderStrong: "#d9d3e2",
    brand: "#6741c2", brandSoft: "#6741c20d", onBrand: "#ffffff",
    success: "#217a4d", warning: "#8a5b12", error: "#b42318",
  },
  dark: {
    background: "#141218", surface: "#1b1822", elevated: "#1b1822", soft: "#25202e",
    text: "#f5f2fa", muted: "#b2aabb", subtle: "#968ba4", border: "#332d3c", borderStrong: "#494050",
    brand: "#b79af5", brandSoft: "#b79af51a", onBrand: "#17111f",
    success: "#75d49e", warning: "#ecc17a", error: "#ff9e98",
  },
};
export const foundations = {
  spacing: [4, 8, 12, 16, 20, 24, 32, 48, 64],
  radius: { control: 7, card: 8, small: 6 },
  layout: { maxWidth: 1344, mobileGutter: 14, desktopGutterMin: 14, mobileMax: 700, tabletMax: 1050 },
  typography: {
    sans: '"Geist", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace',
    body: 15, metadata: 12, cardTitle: 17, sectionTitle: 23, mobileLead: 34, desktopLeadMax: 57,
  },
  logo: { desktop: 32, mobile: 24, minimum: 16, clearSpace: "0.25 × mark box width", centerScale: 0.45 },
  motion: { durationMs: 160, easing: "ease-out", reducedMotion: "Respect prefers-reduced-motion" },
};
const declarations = (theme: "light" | "dark") => colorRoles.map(role => `--lab-color-${role.id}:${themes[theme][role.id]};`).join("");
const foundationCSS = `${foundations.spacing.map(size => `--lab-space-${size}:${size}px;`).join("")}--lab-radius-control:${foundations.radius.control}px;--lab-radius-card:${foundations.radius.card}px;--lab-width-content:${foundations.layout.maxWidth}px;--lab-logo-desktop:${foundations.logo.desktop}px;--lab-logo-mobile:${foundations.logo.mobile}px;--lab-font-sans:${foundations.typography.sans};--lab-font-mono:${foundations.typography.mono};`;
export const designTokenCSS = `:root{${declarations("dark")}${foundationCSS}}html[data-theme="light"]{${declarations("light")}}`;

export const designRules = [
  { zh: "先展示内容，再提供操作。分类页保留标题、简介、数量与最新列表；搜索和筛选进入独立搜索页。", en: "Show content first. Category pages have a title, a short description, a count, and the newest entries. Search and filters live on the search page." },
  { zh: "首页采用一条主推、两条补充，再接最新更新和目录入口。精选应说明具体用途与适用人群。", en: "Use one editorial lead and two supporting picks, followed by recent entries and section links. Explain a concrete purpose and audience." },
  { zh: "白底承载信息，紫色引导行动。每个局部只突出一个主操作，次操作用描边或文字链接。", en: "Use neutral surfaces for information and violet for action. Give each area one primary action; use outlines or text links for secondary actions." },
  { zh: "沿用六边形标志与 45% 中心三角形；等比缩放，深色背景用反白版本。", en: "Keep the hexagonal mark and its 45% central triangle. Scale proportionally and reverse the mark on dark surfaces." },
  { zh: "优先使用资源的真实预览；生成插图应明确用于概念表达，不代替产品截图或操作证据。", en: "Prefer real resource previews. Generated illustrations communicate concepts and do not replace product screenshots or evidence." },
  { zh: "保留真实来源、原有详情链接和收藏键。收录日期不等于实际验证；失效资源进入复核。", en: "Keep real sources, existing detail links, and favorite keys. Listing dates do not imply hands-on validation; review stale resources." },
  { zh: "标题与说明中英成对；按钮写清动作。推荐理由说明用途，避免空泛形容词和无法证实的效果。", en: "Provide paired Chinese and English copy. Label actions clearly and describe purpose without unsupported claims." },
  { zh: "手机上优先呈现内容。避免横向溢出；按钮可用键盘操作，收藏与卡片链接分开。", en: "Prioritize content on mobile. Prevent page overflow, support keyboards, and keep favorite controls separate from card links." },
] as const;

export const aiGuide = `# AI UP LAB · Brand and interface guide\n\nVersion: ${designSystemVersion}\nUpdated: ${designSystemUpdatedAt}\n\n## 中文工作说明\n\n你正在为 AI UP LAB 设计或实现界面。它是面向任务的 AI 实践资源站，沿用现有的白底、黑色文字与紫色强调视觉。读取同目录的 tokens.json 和 tokens.css，复用现有 Astro 组件；不要重新设计品牌。\n\n${designRules.map((rule, index) => `${index + 1}. ${rule.zh}`).join("\n")}\n\n## English implementation brief\n\nYou are designing or implementing AI UP LAB, a task-oriented collection of practical AI resources. Keep its existing neutral surfaces, dark typography, and violet accent. Read tokens.json and tokens.css in this directory and reuse the existing Astro components.\n\n${designRules.map((rule, index) => `${index + 1}. ${rule.en}`).join("\n")}\n\n## Implementation contract\n\n- Themes: light by default; preserve the visitor's saved dark/light preference.\n- Fonts: Geist with a system CJK fallback; IBM Plex Mono for code and parameters.\n- Layout: maximum ${foundations.layout.maxWidth}px; mobile gutter ${foundations.layout.mobileGutter}px; reflow at ${foundations.layout.mobileMax}px and ${foundations.layout.tabletMax}px.\n- Spacing: ${foundations.spacing.join(", ")}px. Controls: ${foundations.radius.control}px radius; cards: ${foundations.radius.card}px radius.\n- Logo: use the supplied logo.svg, with no stretching, rotation, outline, or extra decoration. Minimum box size ${foundations.logo.minimum}px; keep a quarter-box clear space.\n- Icons: reuse Phosphor regular icons through Icon.astro; keep the custom brand mark separate.\n- States: default, hover, focus-visible, selected, disabled, empty, and loading must remain distinguishable when applicable. Use text as well as color for status.\n- Accessibility: target 4.5:1 for normal text and 3:1 for large text; use visible focus and meaningful labels. Aim for 44px interactive targets on new mobile components. Respect reduced motion. These are requirements, not a claim of whole-site conformance.\n- Source integrity: never fabricate sources, use-case results, benchmark rankings, or dates.\n- Verify: build, mobile and desktop widths, both languages and themes, keyboard navigation, saved state, and no-JavaScript reading.\n\n## Knowledge library\n\nRead knowledge.json for stable rule IDs, dependencies, tokens, and source-code mappings. Read rules/<id>.md for each selected rule. These are static context files, not an MCP endpoint. Method reference: https://tmall-design.com/#blog/building-design-wiki-for-aigui . AI UP LAB owns its rules, parameters, and examples.\n\n## Existing components\n\nBrandMark.astro · Icon.astro · DirectoryCard.astro · EditorialPreview.astro · FavButton.astro · Loc.astro · BaseLayout.astro\n\n## Before delivery\n\n${["Use the current tokens and shared components.", "Keep content immediately visible on category pages.", "Preserve URLs, sources, and favorite IDs.", "Provide Chinese and English copy.", "Check 320px, 390px, 768px, and 1440px widths.", "Check light/dark, focus, disabled and empty states.", "Use npm run build and exercise the affected interactions."].map(item => `- [ ] ${item}`).join("\n")}\n`;
