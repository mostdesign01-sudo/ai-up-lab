import selection from "../../data/home-creative.json";
import { entries, sections, type DirectoryEntry, type SectionId } from "./directory";
import type { Copy } from "./i18n";

export type CreativeKind = "gallery" | "motion" | "video" | "prompt";

export interface HomeCreativeItem {
  entry: DirectoryEntry;
  section: (typeof sections)[number];
  title: Copy;
  reason: Copy;
  kind: CreativeKind;
}

const kindLabels: Record<CreativeKind, Copy> = {
  gallery: { zh: "画廊", en: "Gallery" },
  motion: { zh: "动效", en: "Motion" },
  video: { zh: "视频", en: "Video" },
  prompt: { zh: "提示词", en: "Prompt" },
};

const allowedKinds = new Set<CreativeKind>(["gallery", "motion", "video", "prompt"]);

/** Editorial creative rail for the homepage right column — curated prompt / AIGC visuals, not popularity ranks. */
export const homeCreativeMeta = {
  eyebrow: selection.eyebrow as Copy,
  line: selection.line as Copy,
};

export const homeCreative: HomeCreativeItem[] = selection.items.map(item => {
  const entry = entries.find(entry => entry.key === item.key);
  if (!entry) throw new Error(`Invalid homepage creative pick: ${item.key}`);
  if (!entry.thumb) throw new Error(`Homepage creative pick needs a preview image: ${item.key}`);
  if (!allowedKinds.has(item.kind as CreativeKind)) throw new Error(`Homepage creative kind must be gallery|motion|video|prompt: ${item.key}`);
  if (!item.title.zh.trim() || !item.title.en.trim() || !item.reason.zh.trim() || !item.reason.en.trim()) {
    throw new Error(`Homepage creative pick needs a bilingual title and reason: ${item.key}`);
  }
  const sectionId = (entry.sections.includes("prompts") ? "prompts" : entry.sections[0]) as SectionId;
  const section = sections.find(section => section.id === sectionId);
  if (!section) throw new Error(`Homepage creative pick missing section: ${item.key}`);
  return {
    entry,
    section,
    title: item.title as Copy,
    reason: item.reason as Copy,
    kind: item.kind as CreativeKind,
  };
});

if (homeCreative.length < 2 || homeCreative.length > 4) {
  throw new Error("Homepage creative rail needs 2–4 curated items with previews.");
}
if (new Set(homeCreative.map(item => item.entry.key)).size !== homeCreative.length) {
  throw new Error("Homepage creative picks must be distinct.");
}

export function creativeKindLabel(kind: CreativeKind): Copy {
  return kindLabels[kind];
}
