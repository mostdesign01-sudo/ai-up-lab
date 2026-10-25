#!/usr/bin/env node
/**
 * Per-entry share cards: dist/og/<section>/<slug>.jpg, 1200 × 630.
 *
 * Every detail page used to share the same og.png, so a link to any entry
 * looked identical on X, WeChat or Slack. Each card is the entry's own
 * screenshot (top of the page, where the hero is) in a white frame with the
 * AI UP LAB lockup underneath. The title stays in og:title, so the card
 * carries no text and needs no fonts.
 *
 * Runs after `astro build`; detail pages point at these paths through
 * `ogCard()` in src/lib/og.ts, and verify-build checks that every og:image exists.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dist = path.join(root, "dist");
const W = 1200;
const H = 630;
const PAD = 48;
const SHOT = { left: PAD, top: PAD, width: W - PAD * 2, height: 462 };
const RADIUS = 18;

// Same section/slug pairs as the detail routes (see src/lib/og.ts).
const sources = [
  ["cases", "data/cases.json", "cases"],
  ["html", "data/html-items.json", "items"],
  ["agent-ui", "data/agent-ui.json", "items"],
  ["models", "data/models.json", "models"],
  ["image-prompts", "data/image-prompts.json", "items"],
];

async function lockup() {
  // The wordmark lives only as artwork in og.png; reuse it rather than
  // re-typesetting it with whatever fonts the build machine has.
  // sharp runs trim before extract inside one pipeline, so crop first.
  const crop = await sharp(path.join(root, "public/og.png"))
    .extract({ left: 340, top: 215, width: 550, height: 140 })
    .png()
    .toBuffer();
  const mark = await sharp(crop).trim({ background: "#ffffff", threshold: 10 }).resize({ height: 34 }).png().toBuffer();
  const { width, height } = await sharp(mark).metadata();
  return { mark, width, height };
}

const frameSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SHOT.width}" height="${SHOT.height}">` +
    `<rect x="0.5" y="0.5" width="${SHOT.width - 1}" height="${SHOT.height - 1}" rx="${RADIUS}" fill="none" stroke="#17151b" stroke-opacity="0.12"/></svg>`,
);
const maskSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SHOT.width}" height="${SHOT.height}"><rect width="${SHOT.width}" height="${SHOT.height}" rx="${RADIUS}" fill="#fff"/></svg>`,
);

async function card(previewFile, outFile, brand) {
  const shot = await sharp(previewFile)
    .resize({ width: SHOT.width, height: SHOT.height, fit: "cover", position: "top" })
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();
  const brandTop = SHOT.top + SHOT.height + Math.round((H - SHOT.top - SHOT.height - brand.height) / 2);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite([
      { input: shot, left: SHOT.left, top: SHOT.top },
      { input: frameSvg, left: SHOT.left, top: SHOT.top },
      { input: brand.mark, left: PAD, top: brandTop },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outFile);
}

const brand = await lockup();
const jobs = [];
for (const [section, file, key] of sources) {
  const items = JSON.parse(await readFile(path.join(root, file), "utf8"))[key] ?? [];
  await mkdir(path.join(dist, "og", section), { recursive: true });
  for (const item of items) {
    if (!item.previewImage || /^(https?:)?\/\//.test(item.previewImage)) continue;
    jobs.push([path.join(root, "public", item.previewImage), path.join(dist, "og", section, `${item.slug}.jpg`)]);
  }
}

// Topic pages share a 2 × 2 grid of their starter entries' screenshots.
const topicJobs = [];
const caseItems = JSON.parse(await readFile(path.join(root, "data/cases.json"), "utf8")).cases;
const { topics } = JSON.parse(await readFile(path.join(root, "data/topics.json"), "utf8"));
await mkdir(path.join(dist, "og", "topics"), { recursive: true });
for (const topic of topics) {
  const shots = topic.start
    .map(key => caseItems.find(item => `grok:${item.id}` === key)?.previewImage)
    .filter(src => src && !/^(https?:)?\/\//.test(src))
    .slice(0, 4)
    .map(src => path.join(root, "public", src));
  if (shots.length === 4) topicJobs.push([shots, path.join(dist, "og", "topics", `${topic.id}.jpg`)]);
}

async function grid(files, outFile, brand) {
  const GAP = 16;
  const cw = (SHOT.width - GAP) / 2;
  const ch = (SHOT.height - GAP) / 2;
  const cellMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><rect width="${cw}" height="${ch}" rx="12" fill="#fff"/></svg>`);
  const cellFrame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><rect x="0.5" y="0.5" width="${cw - 1}" height="${ch - 1}" rx="12" fill="none" stroke="#17151b" stroke-opacity="0.12"/></svg>`);
  const layers = [];
  for (const [i, file] of files.entries()) {
    const left = SHOT.left + (i % 2) * (cw + GAP);
    const top = SHOT.top + Math.floor(i / 2) * (ch + GAP);
    const cell = await sharp(file).resize({ width: cw, height: ch, fit: "cover", position: "top" }).composite([{ input: cellMask, blend: "dest-in" }]).png().toBuffer();
    layers.push({ input: cell, left, top }, { input: cellFrame, left, top });
  }
  const brandTop = SHOT.top + SHOT.height + Math.round((H - SHOT.top - SHOT.height - brand.height) / 2);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite([...layers, { input: brand.mark, left: PAD, top: brandTop }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outFile);
}
for (const [files, out] of topicJobs) await grid(files, out, brand);

let done = topicJobs.length;
const failed = [];
async function worker() {
  while (jobs.length) {
    const [src, out] = jobs.shift();
    try {
      await card(src, out, brand);
      done++;
    } catch (error) {
      failed.push(`${path.relative(root, src)}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
if (failed.length) {
  console.error(`Share cards failed:\n  ${failed.join("\n  ")}`);
  process.exit(1);
}
console.log(`Share cards: ${done} written to dist/og/.`);
