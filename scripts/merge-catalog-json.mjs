#!/usr/bin/env node
/**
 * Git merge driver for the catalog JSON files (data/*.json).
 *
 * Catalog PRs branch from the same main and each append entries to the same
 * arrays, so a plain text merge conflicts on every pair. This driver merges
 * by entry instead: it applies "theirs" changes (relative to the common base)
 * onto "ours", keyed by `id` (changelog notes by date + title), then recounts
 * `meta`. It exits 1 only when both sides changed the same field of the same
 * entry to different values, which git then reports as a normal conflict.
 *
 * Usage (see .github/workflows/auto-merge-catalog.yml):
 *   git config merge.catalog-json.driver "node scripts/merge-catalog-json.mjs %O %A %B"
 *   echo "data/*.json merge=catalog-json" >> .git/info/attributes
 */
import { readFileSync, writeFileSync } from "node:fs";

const [basePath, oursPath, theirsPath] = process.argv.slice(2);
const read = (p) => {
  try {
    const s = readFileSync(p, "utf8");
    return s.trim() ? JSON.parse(s) : {};
  } catch {
    return {};
  }
};
const base = read(basePath);
const ours = read(oursPath);
const theirs = read(theirsPath);

const keyOf = (x) => x?.id ?? `${x?.date}|${x?.title}`;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const conflicts = [];

function mergeEntry(name, k, b, o, t) {
  const out = { ...o };
  for (const f of new Set([...Object.keys(b), ...Object.keys(t)])) {
    if (same(b[f], t[f])) continue;
    if (!same(b[f], o[f]) && !same(o[f], t[f])) conflicts.push(`${name}[${k}].${f}`);
    if (f in t) out[f] = t[f];
    else delete out[f];
  }
  return out;
}

function mergeArray(name, b = [], o = [], t = []) {
  const bm = new Map(b.map((x) => [keyOf(x), x]));
  const tm = new Map(t.map((x) => [keyOf(x), x]));
  let out = o.filter((x) => !(bm.has(keyOf(x)) && !tm.has(keyOf(x))));
  out = out.map((x) => {
    const k = keyOf(x);
    const bv = bm.get(k);
    const tv = tm.get(k);
    return bv && tv && !same(bv, tv) ? mergeEntry(name, k, bv, x, tv) : x;
  });
  // New entries keep their place: right after the entry that precedes them in theirs.
  t.forEach((tv, i) => {
    const k = keyOf(tv);
    if (bm.has(k)) return;
    const existing = out.findIndex((x) => keyOf(x) === k);
    if (existing >= 0) {
      if (!same(out[existing], tv)) conflicts.push(`${name}[${k}] added on both sides`);
      return;
    }
    let pos = 0;
    for (let j = i - 1; j >= 0; j--) {
      const p = out.findIndex((x) => keyOf(x) === keyOf(t[j]));
      if (p >= 0) {
        pos = p + 1;
        break;
      }
    }
    out.splice(pos, 0, tv);
  });
  return out;
}

const bumpPatch = (v) => {
  const [a, b, c] = String(v).split(".").map(Number);
  return [a, b, (c || 0) + 1].join(".");
};
const newer = (a, b) => (String(a) > String(b) ? a : b);

const result = { ...ours };
for (const k of new Set([...Object.keys(base), ...Object.keys(theirs)])) {
  const b = base[k];
  const t = theirs[k];
  if (k === "meta" || same(b, t)) continue;
  if (Array.isArray(t)) result[k] = mergeArray(k, b, ours[k], t);
  else if (!same(b, ours[k]) && !same(ours[k], t)) conflicts.push(k);
  else result[k] = t;
}

if (ours.meta || theirs.meta) {
  const meta = { ...ours.meta };
  const om = ours.meta ?? {};
  const tm = theirs.meta ?? {};
  for (const f of Object.keys(tm)) if (!same(base.meta?.[f], tm[f])) meta[f] = tm[f];
  if (om.updatedAt || tm.updatedAt) meta.updatedAt = newer(om.updatedAt ?? "", tm.updatedAt ?? "");
  if (om.version && tm.version) {
    const top = [om.version, tm.version].sort((x, y) => x.localeCompare(y, "en", { numeric: true })).pop();
    meta.version = bumpPatch(top);
  }
  const list = Object.entries(result).find(([key, v]) => key !== "meta" && Array.isArray(v));
  if ("count" in meta && list) meta.count = list[1].length;
  result.meta = meta;
}

if (conflicts.length) {
  console.error(`catalog-json: conflicting edits in ${oursPath}: ${conflicts.join(", ")}`);
  process.exit(1);
}
writeFileSync(oursPath, JSON.stringify(result, null, 2) + "\n");
