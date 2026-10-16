// One-off migration: move crawl/verification log sentences out of reader-facing
// qualityNote into verifyLog. Re-runnable: sentences already moved stay moved.
// Usage: node scripts/split-quality-notes.mjs [--write]
import fs from "node:fs";
import { LOG_PATTERN } from "./quality-note-rules.mjs";

const files = { "cases.json": "cases", "html-items.json": "items", "agent-ui.json": "items", "models.json": "models", "image-prompts.json": "items" };
const write = process.argv.includes("--write");

const splitZh = (text) => text.split(/(?<=[。！？])\s*/).map(s => s.trim()).filter(Boolean);
const splitEn = (text) => text.split(/(?<=[.!?])\s+(?=[A-Z"“(])/).map(s => s.trim()).filter(Boolean);

function split(text, splitter) {
  const keep = [], log = [];
  for (const sentence of splitter(text ?? "")) (LOG_PATTERN.test(sentence) ? log : keep).push(sentence);
  return { keep, log };
}

let moved = 0, emptied = 0;
for (const [file, key] of Object.entries(files)) {
  const path = new URL(`../data/${file}`, import.meta.url);
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  for (const item of data[key]) {
    const zh = split(item.qualityNote, splitZh);
    const en = split(item.qualityNoteEn, splitEn);
    if (!zh.log.length && !en.log.length) continue;
    moved++;
    if (!zh.keep.length) emptied++;
    item.qualityNote = zh.keep.join("") || "来源已核对；本站没有实测，效果以原文为准。";
    if (item.qualityNoteEn !== undefined) item.qualityNoteEn = en.keep.join(" ") || "Sources checked; not tested here. Results follow the original source.";
    item.verifyLog = [item.verifyLog, zh.log.join("")].filter(Boolean).join("");
    if (item.qualityNoteEn !== undefined) item.verifyLogEn = [item.verifyLogEn, en.log.join(" ")].filter(Boolean).join(" ");
    if (!write && moved <= 6) console.log(`\n[${file}] ${item.id}\n  KEEP: ${item.qualityNote}\n  LOG:  ${item.verifyLog}\n  KEEP-EN: ${item.qualityNoteEn}`);
  }
  if (write) fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}
console.log(`\n${write ? "wrote" : "dry run"}: ${moved} notes split, ${emptied} fell back to the generic line.`);
