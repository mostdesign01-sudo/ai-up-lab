import membership from "../../data/directory.json";
import { cases, caseSearchText } from "./cases";
import { htmlItems, htmlSearchText } from "./html";
import { agentUiItems, agentUiSearchText } from "./agent-ui";
import { models } from "./models";
import { imagePrompts } from "./image-prompts";
import { cardLine } from "./cardline";
import { caseCover } from "./covers";
import { withBase, assetUrl } from "./paths";
import { caseKindLabels } from "./labels";
import type { Copy } from "./i18n";

export const sections = [
  { id: "learn", title: { zh: "学习与工作流", en: "Learning & workflows" }, description: { zh: "从第一次使用 AI，到研究、创作和 Agent 协作。", en: "From your first AI task to research, creation, and Agent teamwork." }, tone: "grok", image: "/brand/lib-grok.webp" },
  { id: "tools", title: { zh: "工具与应用", en: "Tools & apps" }, description: { zh: "找能解决具体问题的应用、Skill 和自动化工具。", en: "Apps, Skills, and automation tools for a concrete problem." }, tone: "html", image: "/brand/lib-html.webp" },
  { id: "design", title: { zh: "界面与范例", en: "Interfaces & examples" }, description: { zh: "给 AI 看得懂的组件、网页和交互参考。", en: "Components, web examples, and interactions to build with AI." }, tone: "agent-ui", image: "/brand/lib-agent-ui.webp" },
  { id: "models", title: { zh: "模型与能力", en: "Models & capabilities" }, description: { zh: "了解模型能做什么、如何获取，以及能力边界。", en: "Understand capabilities, access, and the limits of each model." }, tone: "grok", image: "/brand/lib-grok.webp" },
  { id: "prompts", title: { zh: "提示词与素材", en: "Prompts & resources" }, description: { zh: "复用提示词、任务配方和视觉素材，适配不同模型。", en: "Reusable prompts, task recipes, and visual resources across models." }, tone: "html", image: "/brand/lib-html.webp" },
] as const;
export type SectionId = typeof sections[number]["id"];
export type LibraryId = "grok" | "html" | "agent-ui" | "models" | "image-prompts";

export const tasks = [
  { id: "research", title: { zh: "研究与学习", en: "Research & learning" }, categories: ["research", "daily-digest", "getting-started"] },
  { id: "create", title: { zh: "内容与创作", en: "Content & creation" }, categories: ["content", "prompts", "templates"] },
  { id: "code", title: { zh: "编程与开发", en: "Coding & development" }, categories: ["coding", "engineering"] },
  { id: "automate", title: { zh: "自动化与协作", en: "Automation & teamwork" }, categories: ["automation", "multi-agent", "project-management", "productivity", "skills", "sharing"] },
  { id: "business", title: { zh: "业务与运营", en: "Business & operations" }, categories: ["sales", "marketing", "finance", "recruiting", "ops", "support", "customer-success"] },
] as const;

export interface DirectoryEntry {
  key: string;
  lib: LibraryId;
  id: string;
  href: string;
  title: Copy;
  /** Short content-type label for card kickers, e.g. 工具 / 组件 / 模型. */
  kind: Copy;
  line: Copy;
  sections: SectionId[];
  tasks: string[];
  updatedAt: string;
  searchText: string;
  sourceUrl: string;
  thumb?: string;
  cover?: boolean;
  stars?: number;
  difficulty?: string;
  featured?: boolean;
}

// First matching type wins, so list the more specific ones first.
const htmlKinds: [string, Copy][] = [
  ["game", { zh: "网页游戏", en: "Web game" }], ["component", { zh: "组件", en: "Component" }], ["library", { zh: "组件库", en: "Library" }],
  ["template", { zh: "模板", en: "Template" }], ["motion", { zh: "动效", en: "Motion" }], ["interactive", { zh: "互动网页", en: "Interactive" }],
  ["tool", { zh: "网页工具", en: "Web tool" }], ["landing", { zh: "落地页", en: "Landing page" }], ["demo", { zh: "演示", en: "Demo" }],
  ["portfolio", { zh: "作品集", en: "Portfolio" }], ["docs", { zh: "文档", en: "Docs" }],
];
const agentUiKinds: [string, Copy][] = [
  ["agent-api", { zh: "Agent 接口", en: "Agent API" }], ["library", { zh: "组件库", en: "Library" }], ["button", { zh: "按钮", en: "Button" }],
  ["text-animation", { zh: "文字动效", en: "Text motion" }], ["hero", { zh: "首屏", en: "Hero" }], ["section", { zh: "区块", en: "Section" }],
  ["landing", { zh: "落地页", en: "Landing page" }], ["background", { zh: "背景", en: "Background" }], ["shader", { zh: "着色器", en: "Shader" }],
  ["threejs", { zh: "3D 场景", en: "3D scene" }], ["motion", { zh: "动效", en: "Motion" }], ["component", { zh: "组件", en: "Component" }],
];
const typeKind = (types: readonly string[], table: [string, Copy][], fallback: Copy) => table.find(([type]) => types.includes(type))?.[1] ?? fallback;
// A news case that a model page links to also belongs under Models.
const modelCaseIds = new Set(models.flatMap(model => model.relatedCaseIds ?? []));

const inList = (list: string[], id: string) => list.includes(id);
const caseTaskIds = (categories: string[]) => tasks.filter(task => task.categories.some(category => categories.includes(category))).map(task => task.id);
const base = (lib: LibraryId, item: { id: string; slug: string; title: string; titleEn?: string; summary: string; summaryEn?: string; hook?: string; hookEn?: string; updatedAt: string; stars?: number; featured?: boolean; previewImage?: string }, path: string) => ({
  key: `${lib}:${item.id}`, lib, id: item.id, href: withBase(`${path}/${item.slug}/`),
  title: { zh: item.title, en: item.titleEn ?? item.title },
  line: { zh: cardLine(item), en: cardLine(item, "en") },
  updatedAt: item.updatedAt, stars: item.stars, featured: item.featured,
  thumb: assetUrl(item.previewImage),
});

export const entries: DirectoryEntry[] = [
  ...cases.map(item => {
    const sectionIds: SectionId[] = [item.kind === "tool" || item.kind === "news" ? "tools" : "learn"];
    if (item.kind === "news" && modelCaseIds.has(item.id)) sectionIds.push("models");
    if (inList(membership.casePrompts, item.id) || item.categories.some(category => category === "prompts" || category === "templates")) sectionIds.push("prompts");
    return { ...base("grok", item, "cases"), kind: caseKindLabels[item.kind], sections: sectionIds, tasks: caseTaskIds(item.categories), difficulty: item.difficulty, searchText: caseSearchText(item), sourceUrl: item.sourceUrl, thumb: assetUrl(item.previewImage ?? caseCover(item)), cover: !item.previewImage };
  }),
  ...htmlItems.map(item => {
    const sectionIds: SectionId[] = [];
    if (item.types.includes("tool")) sectionIds.push("tools");
    if (item.types.some(type => type !== "tool" && type !== "docs") || !sectionIds.length) sectionIds.push("design");
    if (inList(membership.htmlLearning, item.id)) sectionIds.push("learn");
    if (inList(membership.htmlPrompts, item.id) || item.tags.some(tag => tag.startsWith("prompt"))) sectionIds.push("prompts");
    return { ...base("html", item, "html"), kind: typeKind(item.types, htmlKinds, { zh: "网页", en: "Web page" }), sections: sectionIds, tasks: [], searchText: htmlSearchText(item), sourceUrl: item.sourceUrl };
  }),
  ...agentUiItems.map(item => ({ ...base("agent-ui", item, "agent-ui"), kind: typeKind(item.types, agentUiKinds, { zh: "界面件", en: "UI piece" }), sections: ["design"] as SectionId[], tasks: [], searchText: agentUiSearchText(item), sourceUrl: item.sourceUrl })),
  ...models.map(item => ({ ...base("models", item, "models"), kind: { zh: `${item.vendor} · 模型`, en: `${item.vendor} · Model` }, sections: ["models"] as SectionId[], tasks: [], searchText: [item.title, item.titleEn, item.name, item.vendor, item.summary, item.summaryEn, item.qualityNote, item.qualityNoteEn, ...(item.highlights?.flatMap(x => [x.text, x.textEn]) ?? [])].join(" "), sourceUrl: item.sources.find(source => source.kind === "official")!.url })),
  ...imagePrompts.map(item => ({ ...base("image-prompts", item, "image-prompts"), kind: { zh: "提示词画廊", en: "Prompt gallery" }, sections: ["prompts"] as SectionId[], tasks: [], searchText: [item.title, item.titleEn, item.summary, item.summaryEn, item.tags.join(" "), item.modelTag ?? "gpt-image-2.5", item.qualityNote, item.qualityNoteEn].join(" "), sourceUrl: item.sourceUrl })),
].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.key.localeCompare(b.key));

export function sectionEntries(id: SectionId) {
  return entries.filter(entry => entry.sections.includes(id));
}

export function entrySearchText(entry: DirectoryEntry) {
  const labels = sections.filter(section => entry.sections.includes(section.id)).flatMap(section => [section.title.zh, section.title.en]);
  const taskLabels = tasks.filter(task => entry.tasks.includes(task.id)).flatMap(task => [task.title.zh, task.title.en]);
  return [entry.searchText, entry.line.zh, entry.line.en, ...labels, ...taskLabels].join(" ");
}
