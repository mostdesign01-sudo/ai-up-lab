import selection from "../../data/home-picks.json";
import { entries, sections } from "./directory";
import type { Copy } from "./i18n";

/** Explicit editorial selection; recency and popularity do not substitute for usefulness. */
export const homePicks = selection.picks.map(pick => {
  const entry = entries.find(entry => entry.key === pick.key);
  const section = sections.find(section => section.id === pick.section);
  if (!entry || !section || !entry.sections.includes(section.id)) throw new Error(`Invalid homepage pick or section: ${pick.key} / ${pick.section}`);
  if (!pick.title.zh.trim() || !pick.title.en.trim() || !pick.reason.zh.trim() || !pick.reason.en.trim()) throw new Error(`Homepage pick needs a bilingual title and reason: ${pick.key}`);
  return { entry, section, title: pick.title as Copy, reason: pick.reason as Copy };
});
if (homePicks.length !== 3 || new Set(homePicks.map(pick => pick.entry.key)).size !== 3) throw new Error("Homepage needs one lead and two distinct supporting picks.");
export function sourceHost(sourceUrl: string) { return new URL(sourceUrl).hostname.replace(/^www\./, ""); }
export const homeTitles = new Map(selection.titles.map(item => {
  if (!entries.some(entry => entry.key === item.key) || !item.title.zh.trim() || !item.title.en.trim()) throw new Error(`Invalid homepage short title: ${item.key}`);
  return [item.key, item.title] as const;
}));
