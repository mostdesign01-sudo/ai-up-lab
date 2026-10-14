// One-off migration: give every case an explicit `kind` and drop the type prefix
// that used to live in the title. Usage: node scripts/classify-cases.mjs [--write]
import fs from "node:fs";

const path = new URL("../data/cases.json", import.meta.url);
const dirPath = new URL("../data/directory.json", import.meta.url);
const data = JSON.parse(fs.readFileSync(path, "utf8"));
const dir = JSON.parse(fs.readFileSync(dirPath, "utf8"));
const write = process.argv.includes("--write");

const PREFIX = {
  tool: [/^工具[：:]\s*/, /^Tool:\s*/i],
  news: [/^(资讯|官方更新|官方发布)[：:]\s*/, /^(News|Official update|Official launch|Launch|Update):\s*/i],
  guide: [/^(官方指南|官方实践|官方设计文|HN 实操)[：:]\s*/, /^(Official guide|Official practice|Official design note|Official design essay|HN how-to|HN hands-on):\s*/i],
};

// Launch posts filed as tools by the old mapping table.
const OVERRIDE = { "grok-bot-shopify": "news", "grok-bot-and-x": "news" };
const ZH_PREFIX = [...Object.values(PREFIX).map(([zh]) => zh), /^(玩法|清单)[：:]\s*/];
const EN_PREFIX = [...Object.values(PREFIX).map(([, en]) => en), /^(Tool tip|How-to|List|Official case|HN case):\s*/i];

function classify(item) {
  if (OVERRIDE[item.id]) return OVERRIDE[item.id];
  if (item.kind) return item.kind;
  if (dir.caseTools.includes(item.id) || PREFIX.tool[0].test(item.title)) return "tool";
  if (PREFIX.news[0].test(item.title)) return "news";
  if (PREFIX.guide[0].test(item.title) || item.sourceType === "tutorial") return "guide";
  if (item.sourceType === "official-docs" || item.sourceType === "official-launch") return "playbook";
  return "showcase";
}

const counts = {};
for (const item of data.cases) {
  const kind = classify(item);
  counts[kind] = (counts[kind] ?? 0) + 1;
  const title = ZH_PREFIX.reduce((text, re) => text.replace(re, ""), item.title);
  const titleEn = item.titleEn && EN_PREFIX.reduce((text, re) => text.replace(re, ""), item.titleEn);
  if (!write) console.log(kind.padEnd(9), item.sourceType.padEnd(16), title.slice(0, 40), "|", (titleEn ?? "").slice(0, 50));
  // Keep `kind` right after the titles so it reads near the top of each entry.
  const entries = Object.entries({ ...item, title, titleEn, kind });
  const ordered = Object.fromEntries([...entries.filter(([k]) => ["id", "slug", "title", "titleEn"].includes(k)), ["kind", kind], ...entries.filter(([k]) => !["id", "slug", "title", "titleEn", "kind"].includes(k))]);
  Object.keys(item).forEach(k => delete item[k]);
  Object.assign(item, ordered);
}
console.log(counts);
if (write) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  delete dir.caseTools;
  fs.writeFileSync(dirPath, JSON.stringify(dir, null, 2) + "\n");
}
