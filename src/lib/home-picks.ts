import selection from "../../data/home-picks.json";
import { entries, sections, type DirectoryEntry, type SectionId } from "./directory";
import type { Copy } from "./i18n";

/** Weekly editorial lead. `data/home-picks.json` holds a queue of issues keyed by ISO week
 *  (Asia/Shanghai); each build shows the latest issue whose week has started.
 *  Recency and popularity do not substitute for usefulness: every issue is chosen by hand.
 *  Supporting prompt / AIGC visuals live in `home-creative.json` (right rail). */
/** `illustration` (default) is commissioned art in the house style; `source` is the recommended site's own
 *  key visual (hero, OG image, product shot) and must credit where it came from. */
export interface EditorialArt { src: string; width: number; height: number; kind?: "illustration" | "source"; credit?: Copy }
export interface EditorialIssue {
  week: string;
  /** Monday and Sunday of the issue's week, YYYY-MM-DD. */
  start: string;
  end: string;
  entry: DirectoryEntry;
  section: (typeof sections)[number];
  title: Copy;
  reason: Copy;
  art?: EditorialArt;
}

const WEEK = /^(\d{4})-W(\d{2})$/;
const SHANGHAI_OFFSET_MS = 8 * 3600 * 1000;
const DAY_MS = 864e5;

/** ISO 8601 week of a moment, read on the Asia/Shanghai calendar. */
export function isoWeek(at: Date): string {
  const local = new Date(at.getTime() + SHANGHAI_OFFSET_MS);
  const day = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
  day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
  const year = day.getUTCFullYear();
  const week = Math.ceil(((day.getTime() - Date.UTC(year, 0, 1)) / DAY_MS + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

/** Monday of an ISO week as a UTC date. */
function weekMonday(week: string): Date {
  const [, year, num] = week.match(WEEK)!;
  const jan4 = new Date(Date.UTC(Number(year), 0, 4));
  const monday = new Date(jan4.getTime() - ((jan4.getUTCDay() || 7) - 1) * DAY_MS);
  return new Date(monday.getTime() + (Number(num) - 1) * 7 * DAY_MS);
}
const ymd = (date: Date) => date.toISOString().slice(0, 10);

/** `HOME_WEEK=2026-W44 npm run build` previews a future issue. */
const buildEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
export const thisWeek = buildEnv.HOME_WEEK ?? isoWeek(new Date());
if (!WEEK.test(thisWeek)) throw new Error(`HOME_WEEK must look like 2026-W42, got ${thisWeek}`);

const issues: EditorialIssue[] = selection.issues.map((issue, index, list) => {
  if (!WEEK.test(issue.week)) throw new Error(`Homepage issue week must look like 2026-W42: ${issue.week}`);
  if (index > 0 && list[index - 1].week >= issue.week) throw new Error(`Homepage issues must be in ascending week order without repeats: ${issue.week}`);
  const entry = entries.find(entry => entry.key === issue.key);
  const section = sections.find(section => section.id === (issue.section as SectionId));
  if (!entry || !section || !entry.sections.includes(section.id)) throw new Error(`Invalid homepage pick or section: ${issue.week} ${issue.key} / ${issue.section}`);
  if (!issue.title.zh.trim() || !issue.title.en.trim() || !issue.reason.zh.trim() || !issue.reason.en.trim()) throw new Error(`Homepage pick needs a bilingual title and reason: ${issue.week} ${issue.key}`);
  const monday = weekMonday(issue.week);
  const art = "art" in issue ? (issue.art as EditorialArt) : undefined;
  if (art?.kind === "source" && (!art.credit?.zh.trim() || !art.credit?.en.trim())) throw new Error(`Homepage art taken from the source site needs a bilingual credit: ${issue.week} ${issue.key}`);
  return { week: issue.week, start: ymd(monday), end: ymd(new Date(monday.getTime() + 6 * DAY_MS)), entry, section, title: issue.title as Copy, reason: issue.reason as Copy, art };
});

const started = issues.filter(issue => issue.week <= thisWeek);
if (!started.length) throw new Error(`No homepage issue has started by ${thisWeek}; the first queued issue is ${issues[0]?.week}.`);

/** The issue on the homepage this week. */
export const currentIssue = started[started.length - 1];
/** Earlier issues, newest first. Queued future issues stay private until their week. */
export const pastIssues = started.slice(0, -1).reverse();
export const queuedIssues = issues.filter(issue => issue.week > thisWeek);

if (currentIssue.week !== thisWeek) console.warn(`[home-picks] No issue queued for ${thisWeek}; the homepage keeps ${currentIssue.week}. Add one to data/home-picks.json.`);
else if (!queuedIssues.length) console.warn(`[home-picks] ${thisWeek} is the last queued issue; queue next week's pick in data/home-picks.json.`);

/** Kept as a one-item list for existing callers. */
export const homePicks = [currentIssue];
export const editorialIssues = issues;

export function sourceHost(sourceUrl: string) { return new URL(sourceUrl).hostname.replace(/^www\./, ""); }
export const homeTitles = new Map(selection.titles.map(item => {
  if (!entries.some(entry => entry.key === item.key) || !item.title.zh.trim() || !item.title.en.trim()) throw new Error(`Invalid homepage short title: ${item.key}`);
  return [item.key, item.title] as const;
}));

/** Wide images (most site heroes) sit in a frame; portrait art fills the lead column. */
export const artFits = (art: EditorialArt) => (art.width / art.height > 1.15 ? "frame" : "fill");
