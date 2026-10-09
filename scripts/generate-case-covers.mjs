/**
 * Generate distinct flat editorial covers for cases still missing previewImage,
 * and refresh shared category fallbacks under public/covers/.
 *
 *   npm i -D sharp
 *   node scripts/generate-case-covers.mjs
 *   node scripts/generate-case-covers.mjs --write   # also set previewImage in cases.json
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const previewDir = join(root, "public", "previews");
const coverDir = join(root, "public", "covers");
const casesPath = join(root, "data", "cases.json");
const WIDTH = 900;
const HEIGHT = 600;
const writeJson = process.argv.includes("--write");

const PALETTES = [
  ["#f4f1ec", "#1a1a1a", "#6b4eff", "#d9d2ff"],
  ["#eef3f8", "#142033", "#0f6e56", "#b7e4d4"],
  ["#f7efe8", "#2a1810", "#b45a1a", "#f0c9a8"],
  ["#eef0f4", "#17181c", "#3b5bdb", "#c5d0ff"],
  ["#f3f6ef", "#1c2418", "#5b7c3a", "#d5e6c0"],
  ["#f6eef4", "#23141f", "#9b3d7a", "#efc5df"],
  ["#eef5f4", "#102221", "#1f7a7a", "#b9e3e1"],
  ["#f7f2ea", "#241c12", "#8a6a2f", "#ead7a8"],
  ["#eef1f7", "#151822", "#4455aa", "#c8cff0"],
  ["#f5efef", "#221616", "#a13d3d", "#efc4c4"],
];

const CATEGORY_META = {
  sales: { label: "Sales", palette: 3 },
  automation: { label: "Automate", palette: 2 },
  engineering: { label: "Build", palette: 4 },
  coding: { label: "Code", palette: 4 },
  marketing: { label: "Market", palette: 5 },
  content: { label: "Create", palette: 7 },
  "multi-agent": { label: "Agents", palette: 0 },
  ops: { label: "Ops", palette: 6 },
  "project-management": { label: "Ops", palette: 6 },
  support: { label: "Support", palette: 9 },
  "customer-success": { label: "Success", palette: 9 },
  research: { label: "Research", palette: 1 },
  "daily-digest": { label: "Digest", palette: 1 },
  finance: { label: "Finance", palette: 8 },
  recruiting: { label: "Hire", palette: 2 },
  default: { label: "Case", palette: 0 },
};

function hashInt(text) {
  return createHash("sha1").update(text).digest().readUInt32BE(0);
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function shortTitle(title) {
  const cleaned = String(title || "")
    .replace(/^工具[：:]/, "")
    .replace(/^官方[^：:]*[：:]/, "")
    .replace(/^清单[：:]/, "")
    .trim();
  return cleaned.length > 28 ? `${cleaned.slice(0, 27)}…` : cleaned;
}

function categoryKey(categories = []) {
  for (const category of categories) {
    if (CATEGORY_META[category]) return category;
  }
  return "default";
}

function buildSvg({ id, title, categories }) {
  const key = categoryKey(categories);
  const meta = CATEGORY_META[key];
  const h = hashInt(id);
  const palette = PALETTES[(meta.palette + (h % 3)) % PALETTES.length];
  const [bg, ink, accent, soft] = palette;
  const pattern = h % 4;
  const ox = 80 + (h % 160);
  const oy = 70 + ((h >> 8) % 120);
  const label = meta.label;
  const line = shortTitle(title);

  const shapes =
    pattern === 0
      ? `<circle cx="${ox}" cy="${oy}" r="120" fill="${soft}"/><circle cx="${ox + 150}" cy="${oy + 90}" r="70" fill="${accent}" fill-opacity=".35"/><rect x="${ox - 40}" y="${oy + 150}" width="220" height="18" rx="9" fill="${accent}"/>`
      : pattern === 1
        ? `<rect x="${ox}" y="${oy}" width="180" height="180" rx="28" fill="${soft}"/><rect x="${ox + 90}" y="${oy + 70}" width="160" height="160" rx="28" fill="${accent}" fill-opacity=".28"/><path d="M${ox + 40} ${oy + 220}h240" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`
        : pattern === 2
          ? `<polygon points="${ox},${oy + 160} ${ox + 90},${oy} ${ox + 180},${oy + 160}" fill="${soft}"/><circle cx="${ox + 220}" cy="${oy + 80}" r="54" fill="${accent}" fill-opacity=".4"/><rect x="${ox - 20}" y="${oy + 190}" width="280" height="14" rx="7" fill="${ink}" fill-opacity=".12"/>`
          : `<path d="M${ox} ${oy + 40}c40-60 120-60 160 0s120 60 160 0" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round"/><rect x="${ox + 20}" y="${oy + 100}" width="210" height="120" rx="20" fill="${soft}"/><circle cx="${ox + 260}" cy="${oy + 150}" r="36" fill="${accent}"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <circle cx="760" cy="90" r="140" fill="${soft}" fill-opacity=".55"/>
  <circle cx="80" cy="520" r="110" fill="${accent}" fill-opacity=".12"/>
  ${shapes}
  <rect x="48" y="48" width="140" height="34" rx="17" fill="${ink}" fill-opacity=".08"/>
  <text x="68" y="71" font-family="Geist, ui-sans-serif, system-ui, sans-serif" font-size="16" font-weight="700" fill="${accent}" letter-spacing="0.04em">${escapeXml(label.toUpperCase())}</text>
  <text x="48" y="520" font-family="Geist, ui-sans-serif, system-ui, sans-serif" font-size="34" font-weight="760" fill="${ink}">${escapeXml(line)}</text>
  <text x="48" y="556" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="14" fill="${ink}" fill-opacity=".45">${escapeXml(id)}</text>
</svg>`;
}

async function renderSvg(sharp, svg, dest) {
  await sharp(Buffer.from(svg)).webp({ quality: 78, effort: 5 }).toFile(dest);
}

async function main() {
  const sharpMod = await import("sharp");
  const sharp = sharpMod.default;
  await mkdir(previewDir, { recursive: true });
  await mkdir(coverDir, { recursive: true });

  const dataset = JSON.parse(await readFile(casesPath, "utf8"));
  const missing = dataset.cases.filter((item) => !item.previewImage);
  console.log(`Generating ${missing.length} case preview cover(s); write=${writeJson}`);

  let made = 0;
  for (const item of missing) {
    const svg = buildSvg(item);
    const dest = join(previewDir, `${item.id}.webp`);
    await renderSvg(sharp, svg, dest);
    item.previewImage = `/previews/${item.id}.webp`;
    item.previewCredit = item.previewCredit || "预览：站点生成的条目专用封面（非来源页实拍）";
    item.previewCreditEn = item.previewCreditEn || "Preview: site-generated per-entry cover (not a live source capture)";
    made += 1;
    console.log(`OK  ${item.id}`);
  }

  // Refresh shared category fallbacks so any future missing preview is not clay art.
  for (const [key, meta] of Object.entries(CATEGORY_META)) {
    if (key !== "default" && !["sales", "automation", "engineering", "marketing", "content", "multi-agent", "ops", "research", "finance", "recruiting", "support"].includes(key)) {
      continue;
    }
    const stem = key === "coding" ? "engineering" : key === "project-management" || key === "customer-success" ? "ops" : key === "daily-digest" ? "research" : key;
    if (key !== stem && key !== "recruiting" && key !== "support") continue;
    const svg = buildSvg({ id: `case-${stem}`, title: meta.label, categories: [key] });
    await renderSvg(sharp, svg, join(coverDir, `case-${stem}.webp`));
    console.log(`COVER case-${stem}.webp`);
  }
  // Always write default
  await renderSvg(sharp, buildSvg({ id: "case-default", title: "Case", categories: [] }), join(coverDir, "case-default.webp"));
  // Dedicated recruiting / support covers (no longer alias to finance/ops art)
  await renderSvg(sharp, buildSvg({ id: "case-recruiting", title: "Hiring", categories: ["recruiting"] }), join(coverDir, "case-recruiting.webp"));
  await renderSvg(sharp, buildSvg({ id: "case-support", title: "Support", categories: ["support"] }), join(coverDir, "case-support.webp"));

  if (writeJson) {
    await writeFile(casesPath, `${JSON.stringify(dataset, null, 2)}\n`);
    console.log(`Patched data/cases.json with ${made} generated previewImage field(s).`);
  }
  console.log(`Done. generated=${made}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
