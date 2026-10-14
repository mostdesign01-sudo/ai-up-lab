// One-off migration: strip crawl markers from summaries. Parentheticals made of
// log detail are cut in place; sentences that are only log move to verifyLog.
// Usage: node scripts/split-summaries.mjs [--write]
import fs from "node:fs";
import { SUMMARY_LOG_PATTERN } from "./quality-note-rules.mjs";

const files = { "cases.json": "cases", "html-items.json": "items", "agent-ui.json": "items", "models.json": "models", "image-prompts.json": "items" };
const write = process.argv.includes("--write");
const PAREN = /[（(][^（）()]*[）)]/g;

function clean(text, splitter, joiner) {
  if (!text) return { text, log: [] };
  const log = [];
  const stripped = text.replace(PAREN, (group) => (SUMMARY_LOG_PATTERN.test(group) ? (log.push(group), " ") : group));
  const keep = [];
  for (const sentence of splitter(stripped)) {
    if (!SUMMARY_LOG_PATTERN.test(sentence)) { keep.push(sentence); continue; }
    // Long sentences chain facts with semicolons; keep the clauses that are not log.
    const clauses = sentence.split(/(?<=[；;])\s*/);
    const clean = clauses.filter(clause => !SUMMARY_LOG_PATTERN.test(clause));
    log.push(...clauses.filter(clause => SUMMARY_LOG_PATTERN.test(clause)));
    if (clean.length) keep.push(clean.join(joiner === "" ? "" : " ").replace(/[；;]\s*$/, joiner === "" ? "。" : "."));
  }
  const out = keep.join(joiner).replace(/[ \t]{2,}/g, " ").replace(/\s+([，。,.;；：:])/g, "$1").trim();
  return { text: out, log };
}
const splitZh = (text) => text.split(/(?<=[。！？])\s*/).map(s => s.trim()).filter(Boolean);
const splitEn = (text) => text.split(/(?<=[.!?])\s+(?=[A-Z"“(])/).map(s => s.trim()).filter(Boolean);

let touched = 0, shown = 0;
for (const [file, key] of Object.entries(files)) {
  const path = new URL(`../data/${file}`, import.meta.url);
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  for (const item of data[key]) {
    const zh = clean(item.summary, splitZh, "");
    const en = clean(item.summaryEn, splitEn, " ");
    if (!zh.log.length && !en.log.length) continue;
    touched++;
    if (!write && shown++ < 8) console.log(`\n[${file}] ${item.id}\n  BEFORE: ${item.summary}\n  AFTER:  ${zh.text}\n  LOG:    ${zh.log.join(" ")}`);
    if (!zh.text) throw new Error(`${item.id}: summary would be empty`);
    item.summary = zh.text;
    if (item.summaryEn !== undefined) item.summaryEn = en.text || item.summaryEn;
    if (zh.log.length) item.verifyLog = [item.verifyLog, zh.log.join(" ")].filter(Boolean).join(" ");
    if (en.log.length) item.verifyLogEn = [item.verifyLogEn, en.log.join(" ")].filter(Boolean).join(" ");
  }
  if (write) fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}
console.log(`\n${write ? "wrote" : "dry run"}: ${touched} summaries cleaned.`);
