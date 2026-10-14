import { cases, type CaseItem, type SourceType } from "./cases";

const STARTER_SOURCES = new Set<SourceType>(["official-docs", "official-launch", "tutorial"]);
/** Product-neutral primers that open the homepage starter row before any product guide. */
export const STARTER_PRIMERS = ["html:transformer-explainer"];

/** Starter guides from official docs or tutorials, featured first, then newest. Tools and news are not guides. */
export function starterCases(list: CaseItem[] = cases, limit = 4): CaseItem[] {
  return list
    .filter((item) => item.difficulty === "starter" && item.kind === "guide" && STARTER_SOURCES.has(item.sourceType))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.publishedAt.localeCompare(a.publishedAt);
    })
    .slice(0, limit);
}
