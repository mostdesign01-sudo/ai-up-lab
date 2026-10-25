/**
 * Share card for a detail page, written by scripts/build-og.mjs after the
 * Astro build. Entries without a local screenshot fall back to the site card.
 */
export type OgSection = "cases" | "html" | "agent-ui" | "models" | "image-prompts";

export function ogCard(section: OgSection, item: { slug: string; previewImage?: string }): string | undefined {
  if (!item.previewImage || /^(https?:)?\/\//.test(item.previewImage)) return undefined;
  return `/og/${section}/${item.slug}.jpg`;
}
