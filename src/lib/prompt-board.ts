import { readFileSync } from "node:fs";
import { join } from "node:path";
import membership from "../../data/directory.json";
import { cases, type CaseItem } from "./cases";
import { htmlItems, type HtmlItem } from "./html";
import type { Copy } from "./i18n";
import { imageModelTag, imagePrompts, type ImagePromptItem } from "./image-prompts";
import { categoryLabels, categoryLabelsEn } from "./labels";
import { models } from "./models";
import { assetUrl, withBase } from "./paths";
import type { FavLib } from "./stars";

/** Sidebar id for records that have no tags (or, for cases, no categories). */
export const OTHER_TAG = "other";

/**
 * Engagement fields we would honor for 最热. Editorial `stars` are quality, not popularity.
 * None of the prompt records set these today, so the control stays hidden.
 */
const POPULARITY_KEYS = ["popularity", "views", "likes", "hot"] as const;

export interface PromptBoardCard {
  key: string;
  href: string;
  lib: FavLib;
  id: string;
  title: Copy;
  /** Raw model tag from the record. Omitted when the record has no model. */
  model?: string;
  modelLabel: string;
  /** Existing tags or case categories. Empty means 其他. */
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  stars?: number;
  image?: string;
  width?: number;
  height?: number;
  /** Set only when the record lists more than one image. The card shows the first. */
  imageTotal?: number;
  popularity?: number;
}

export interface PromptFacet {
  id: string;
  label: Copy;
  count: number;
}

const tagCopy: Record<string, Copy> = {
  gallery: { zh: "画廊", en: "Gallery" },
  "prompt-library": { zh: "提示词库", en: "Prompt library" },
  "copy-to-recreate": { zh: "可复制复现", en: "Copy to recreate" },
  chinese: { zh: "中文", en: "Chinese" },
  "ai-poster": { zh: "AI 海报", en: "AI poster" },
  design: { zh: "设计", en: "Design" },
  html: { zh: "HTML", en: "HTML" },
  "show-hn-adjacent": { zh: "Show HN 相邻", en: "Show HN adjacent" },
  generative: { zh: "生成", en: "Generative" },
  tool: { zh: "工具", en: "Tool" },
  "design-tokens": { zh: "设计变量", en: "Design tokens" },
  skill: { zh: "Skill", en: "Skill" },
  css: { zh: "CSS", en: "CSS" },
  grid: { zh: "网格", en: "Grid" },
  claude: { zh: "Claude", en: "Claude" },
  saas: { zh: "SaaS", en: "SaaS" },
  glassmorphism: { zh: "玻璃拟态", en: "Glassmorphism" },
};

function humanize(tag: string): string {
  return tag
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function tagLabel(tag: string): Copy {
  if (tag === OTHER_TAG) return { zh: "其他", en: "Other" };
  const knownZh = categoryLabels[tag];
  const knownEn = categoryLabelsEn[tag];
  if (knownZh || knownEn) {
    const fallback = humanize(tag);
    return { zh: knownZh ?? fallback, en: knownEn ?? fallback };
  }
  return tagCopy[tag] ?? { zh: humanize(tag), en: humanize(tag) };
}

/** Display name for a model tag that already exists on a record. Does not add models. */
export function modelDisplayName(tag: string): string {
  const known = models.find((model) => model.id === tag || model.slug === tag);
  if (known) return known.name;
  return tag
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (/^\d+(?:\.\d+)?$/.test(part)) return part;
      if (part.length <= 4 && /^[a-z0-9]+$/i.test(part)) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function readPopularity(record: object): number | undefined {
  const source = record as Record<string, unknown>;
  for (const key of POPULARITY_KEYS) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return undefined;
}

function readImageList(record: { previewImage?: string }): string[] {
  const extra = record as { images?: unknown; previewImages?: unknown };
  for (const list of [extra.images, extra.previewImages]) {
    if (!Array.isArray(list)) continue;
    const urls = list.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
    if (urls.length > 0) return urls;
  }
  return record.previewImage ? [record.previewImage] : [];
}

function webpSize(publicPath: string): { width: number; height: number } | undefined {
  if (!publicPath.startsWith("/") || publicPath.includes("..")) return undefined;
  let data: Buffer;
  try {
    data = readFileSync(join(process.cwd(), "public", publicPath.slice(1)));
  } catch {
    return undefined;
  }
  if (data.length < 30 || data.toString("ascii", 0, 4) !== "RIFF" || data.toString("ascii", 8, 12) !== "WEBP") {
    return undefined;
  }
  let offset = 12;
  while (offset + 8 <= data.length) {
    const kind = data.toString("ascii", offset, offset + 4);
    const size = data.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (start + size > data.length) return undefined;
    if (kind === "VP8X" && size >= 10) {
      return {
        width: 1 + data.readUIntLE(start + 4, 3),
        height: 1 + data.readUIntLE(start + 7, 3),
      };
    }
    if (kind === "VP8 " && size >= 10) {
      const keyframe = (data[start] & 1) === 0;
      if (keyframe && data[start + 3] === 0x9d && data[start + 4] === 0x01 && data[start + 5] === 0x2a) {
        return {
          width: data.readUInt16LE(start + 6) & 0x3fff,
          height: data.readUInt16LE(start + 8) & 0x3fff,
        };
      }
    }
    if (kind === "VP8L" && size >= 5 && data[start] === 0x2f) {
      const bits = data.readUInt32LE(start + 1);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    offset += 8 + size + (size & 1);
  }
  return undefined;
}

function cardImages(record: { previewImage?: string }): Pick<PromptBoardCard, "image" | "width" | "height" | "imageTotal"> {
  const list = readImageList(record);
  const first = list[0];
  if (!first) return {};
  const size = first.startsWith("/") ? webpSize(first) : undefined;
  return {
    image: assetUrl(first),
    width: size?.width,
    height: size?.height,
    imageTotal: list.length > 1 ? list.length : undefined,
  };
}

function baseCard(
  lib: FavLib,
  path: string,
  item: {
    id: string;
    slug: string;
    title: string;
    titleEn?: string;
    featured?: boolean;
    publishedAt: string;
    updatedAt: string;
    stars?: number;
    previewImage?: string;
  },
  tags: string[],
  model?: string,
): PromptBoardCard {
  const trimmed = model?.trim();
  return {
    key: `${lib}:${item.id}`,
    href: withBase(`${path}/${item.slug}/`),
    lib,
    id: item.id,
    title: { zh: item.title, en: item.titleEn?.trim() || item.title },
    model: trimmed || undefined,
    modelLabel: trimmed ? modelDisplayName(trimmed) : "",
    tags: [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))],
    featured: Boolean(item.featured),
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    stars: item.stars,
    popularity: readPopularity(item),
    ...cardImages(item),
  };
}

function imageCard(item: ImagePromptItem): PromptBoardCard {
  return baseCard("image-prompts", "image-prompts", item, item.tags, imageModelTag(item));
}

function caseCard(item: CaseItem): PromptBoardCard {
  return baseCard("grok", "cases", item, item.categories);
}

function htmlCard(item: HtmlItem): PromptBoardCard {
  return baseCard("html", "html", item, item.tags);
}

export function sortPromptCards(cards: PromptBoardCard[], order: "featured" | "newest" | "hot"): PromptBoardCard[] {
  return [...cards].sort((a, b) => {
    if (order === "hot") {
      const hot = (b.popularity ?? -1) - (a.popularity ?? -1);
      if (hot !== 0) return hot;
    }
    if (order === "featured") {
      const featured = Number(b.featured) - Number(a.featured);
      if (featured !== 0) return featured;
    }
    return (
      b.publishedAt.localeCompare(a.publishedAt) ||
      b.updatedAt.localeCompare(a.updatedAt) ||
      a.title.zh.localeCompare(b.title.zh, "zh")
    );
  });
}

/** Image prompts board: one card per record in `data/image-prompts.json`. */
export function imagePromptBoardCards(): PromptBoardCard[] {
  return sortPromptCards(imagePrompts.map(imageCard), "featured");
}

/**
 * Prompts & resources directory: cases, HTML items, and image prompts already
 * filed there. Models come only from image-prompt `modelTag`.
 */
export function promptsSectionBoardCards(): PromptBoardCard[] {
  const caseIds = new Set(membership.casePrompts);
  const htmlIds = new Set(membership.htmlPrompts);
  const cards = [
    ...cases.filter((item) => caseIds.has(item.id)).map(caseCard),
    ...htmlItems.filter((item) => htmlIds.has(item.id)).map(htmlCard),
    ...imagePrompts.map(imageCard),
  ];
  return sortPromptCards(cards, "featured");
}

export function modelFacets(cards: PromptBoardCard[]): PromptFacet[] {
  const counts = new Map<string, { label: string; count: number }>();
  for (const card of cards) {
    if (!card.model) continue;
    const current = counts.get(card.model);
    if (current) current.count += 1;
    else counts.set(card.model, { label: card.modelLabel, count: 1 });
  }
  return [...counts.entries()]
    .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
    .map(([id, entry]) => ({ id, label: { zh: entry.label, en: entry.label }, count: entry.count }));
}

export function tagFacets(cards: PromptBoardCard[]): PromptFacet[] {
  const counts = new Map<string, number>();
  for (const card of cards) {
    const tags = card.tags.length > 0 ? card.tags : [OTHER_TAG];
    for (const tag of new Set(tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  const facets = [...counts.entries()]
    .filter(([id]) => id !== OTHER_TAG)
    .sort((a, b) => b[1] - a[1] || tagLabel(a[0]).zh.localeCompare(tagLabel(b[0]).zh, "zh"))
    .map(([id, count]) => ({ id, label: tagLabel(id), count }));
  const other = counts.get(OTHER_TAG);
  if (other) facets.push({ id: OTHER_TAG, label: tagLabel(OTHER_TAG), count: other });
  return facets;
}

export function boardHasPopularity(cards: PromptBoardCard[]): boolean {
  return cards.some((card) => card.popularity !== undefined);
}
