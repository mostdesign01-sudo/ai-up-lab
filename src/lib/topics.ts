import data from "../../data/topics.json";
import { cases } from "./cases";
import { entries, tasks, type DirectoryEntry } from "./directory";
import type { Copy } from "./i18n";

/**
 * Hot topics (data/topics.json): a themed page at /topics/<id>/ plus, for the
 * topic marked `hot`, a homepage band and a header link. Membership is
 * derived from the data so new catalog entries join on their own; `start` and
 * `also` are hand-picked keys.
 */
export interface TopicGroup {
  id: string;
  title: Copy;
  note?: Copy;
  entries: DirectoryEntry[];
}

export interface Topic {
  id: string;
  hot: boolean;
  nav: Copy;
  title: Copy;
  lede: Copy;
  band: Copy;
  /** Newest first. */
  members: DirectoryEntry[];
  /** Newest members that name the product, for the homepage band. */
  latest: DirectoryEntry[];
  start: DirectoryEntry[];
  roles: TopicGroup[];
  tools: DirectoryEntry[];
  stories: DirectoryEntry[];
  guides: DirectoryEntry[];
  also: DirectoryEntry[];
}

const byKey = new Map(entries.map(entry => [entry.key, entry]));
const pick = (topic: string, keys: string[]) => keys.map(key => {
  const entry = byKey.get(key);
  if (!entry) throw new Error(`Topic ${topic} lists a key that is not catalogued: ${key}`);
  return entry;
});
const ROLE_TASK_ORDER = ["business", "code", "create", "research", "automate"] as const;
const caseById = new Map(cases.map(item => [item.id, item]));
const kindOf = (entry: DirectoryEntry) => caseById.get(entry.id)?.kind;

export const topics: Topic[] = data.topics.map(raw => {
  const pattern = new RegExp(raw.match.pattern, "i");
  const kinds = new Set<string>(raw.match.kinds);
  const exclude = new Set<string>(raw.match.exclude);
  const named = (entry: DirectoryEntry) => {
    const item = caseById.get(entry.id);
    return Boolean(item) && pattern.test(`${item!.title} ${item!.titleEn} ${item!.summary}`);
  };
  // A playbook joins only when it behaves like an agent: it runs on a schedule, splits work across bots, or waits for approval.
  const agentLike = (entry: DirectoryEntry) => {
    const item = caseById.get(entry.id);
    return Boolean(item && kinds.has(item.kind) && (item.hasRoutine || item.hasMultiAgent || item.requiresApproval));
  };
  const members = entries.filter(entry => entry.lib === "grok" && !exclude.has(entry.key) && (named(entry) || agentLike(entry)));
  const start = pick(raw.id, raw.start);
  const also = pick(raw.id, raw.also).filter(entry => !members.includes(entry));
  if (start.some(entry => !members.includes(entry))) throw new Error(`Topic ${raw.id}: every start entry must belong to the topic`);
  const rest = members.filter(entry => !start.includes(entry));
  // Role recipes: playbooks plus the "Grok Bot for <team>" guides, grouped by the task they serve.
  const isRole = (entry: DirectoryEntry) => kindOf(entry) === "playbook" || /^Grok Bot for /.test(entry.title.en);
  const roleEntries = rest.filter(isRole);
  // Most role recipes also count as automation, so file each under its most specific task.
  const primary = (entry: DirectoryEntry) => ROLE_TASK_ORDER.find(id => entry.tasks.includes(id)) ?? "automate";
  const roles = ROLE_TASK_ORDER
    .map(id => ({ id, title: tasks.find(task => task.id === id)!.title, entries: roleEntries.filter(entry => primary(entry) === id) }))
    .filter(group => group.entries.length);
  const others = rest.filter(entry => !isRole(entry));
  return {
    id: raw.id,
    hot: raw.hot,
    nav: raw.nav,
    title: raw.title,
    lede: raw.lede,
    band: raw.band,
    members,
    latest: members.filter(entry => named(entry) && entry.thumb && !entry.cover).slice(0, 4),
    start,
    roles,
    tools: others.filter(entry => kindOf(entry) === "tool"),
    stories: others.filter(entry => kindOf(entry) === "showcase" || kindOf(entry) === "news"),
    guides: others.filter(entry => kindOf(entry) === "guide"),
    also,
  };
});

export const hotTopic = topics.find(topic => topic.hot);
