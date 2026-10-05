import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const dataset = JSON.parse(await readFile(new URL("../data/cases.json", import.meta.url), "utf8"));
const htmlDataset = JSON.parse(await readFile(new URL("../data/html-items.json", import.meta.url), "utf8"));
const agentUiDataset = JSON.parse(await readFile(new URL("../data/agent-ui.json", import.meta.url), "utf8"));
const changelog = JSON.parse(await readFile(new URL("../data/changelog.json", import.meta.url), "utf8"));
const pathsDataset = JSON.parse(await readFile(new URL("../data/paths.json", import.meta.url), "utf8"));
const combosDataset = JSON.parse(await readFile(new URL("../data/combos.json", import.meta.url), "utf8"));
const modelsDataset = JSON.parse(await readFile(new URL("../data/models.json", import.meta.url), "utf8"));
const imagePromptsDataset = JSON.parse(await readFile(new URL("../data/image-prompts.json", import.meta.url), "utf8"));

const requiredPages = [
  "index.html",
  "learn/index.html",
  "tools/index.html",
  "design/index.html",
  "prompts/index.html",
  "about/index.html",
  "catalog.json",
  "llms.txt",
  "sitemap.xml",
  "cases/index.html",
  "featured/index.html",
  "latest/index.html",
  "types/index.html",
  "docs/index.html",
  "changelog/index.html",
  "search/index.html",
  "favorites/index.html",
  "data.json",
  "html-items.json",
  "agent-ui.json",
  "html/index.html",
  "html/featured/index.html",
  "html/latest/index.html",
  "html/types/index.html",
  "agent-ui/index.html",
  "agent-ui/featured/index.html",
  "agent-ui/latest/index.html",
  "agent-ui/types/index.html",
  "404.html",
  "paths/index.html",
  "combos/index.html",
  "models/index.html",
  "models.json",
  "image-prompts/index.html",
  "image-prompts.json",
  "brand-collection/index.html",
  "brand-collection/references/index.html",
  "brand-collection/dewu/index.html",
  "brand-collection/ai-up-lab/index.html",
  "brand-collection/joma/index.html",
  "brand-collection/joma/visual-audit/index.html",
  "brand-collection/joma/china-ecommerce/index.html",
];

const missing = [];

for (const page of requiredPages) {
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
}

const categories = [...new Set(dataset.cases.flatMap((item) => item.categories))];

for (const item of dataset.cases) {
  const path = `cases/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const category of categories) {
  const path = `types/${category}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

const htmlTypes = [...new Set(htmlDataset.items.flatMap((item) => item.types))];

for (const item of htmlDataset.items) {
  const path = `html/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const type of htmlTypes) {
  const path = `html/types/${type}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

if (dataset.cases.length !== dataset.meta.count) {
  console.error(`cases.json meta.count ${dataset.meta.count} does not match items ${dataset.cases.length}`);
  process.exit(1);
}

if (dataset.cases.length < 20) {
  console.error(`Expected at least 20 cases, found ${dataset.cases.length}`);
  process.exit(1);
}

if (htmlDataset.items.length !== htmlDataset.meta.count) {
  console.error(`html-items.json meta.count ${htmlDataset.meta.count} does not match items ${htmlDataset.items.length}`);
  process.exit(1);
}

if (htmlDataset.items.length < 8) {
  console.error(`Expected at least 8 HTML items, found ${htmlDataset.items.length}`);
  process.exit(1);
}

const agentUiTypes = [...new Set(agentUiDataset.items.flatMap((item) => item.types))];

for (const item of agentUiDataset.items) {
  const path = `agent-ui/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const type of agentUiTypes) {
  const path = `agent-ui/types/${type}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

if (agentUiDataset.items.length !== agentUiDataset.meta.count) {
  console.error(`agent-ui.json meta.count ${agentUiDataset.meta.count} does not match items ${agentUiDataset.items.length}`);
  process.exit(1);
}

if (agentUiDataset.items.length < 10) {
  console.error(`Expected at least 10 Agent UI items, found ${agentUiDataset.items.length}`);
  process.exit(1);
}

if (pathsDataset.paths.length !== pathsDataset.meta.count) {
  console.error(`paths.json meta.count ${pathsDataset.meta.count} does not match items ${pathsDataset.paths.length}`);
  process.exit(1);
}

if (pathsDataset.paths.length !== 5) {
  console.error(`Expected exactly 5 playbooks, found ${pathsDataset.paths.length}`);
  process.exit(1);
}

if (combosDataset.combos.length !== combosDataset.meta.count) {
  console.error(`combos.json meta.count ${combosDataset.meta.count} does not match items ${combosDataset.combos.length}`);
  process.exit(1);
}

if (combosDataset.combos.length < 3 || combosDataset.combos.length > 5) {
  console.error(`Expected 3–5 combos, found ${combosDataset.combos.length}`);
  process.exit(1);
}

if (modelsDataset.models.length !== modelsDataset.meta.count) {
  console.error(`models.json meta.count ${modelsDataset.meta.count} does not match items ${modelsDataset.models.length}`);
  process.exit(1);
}

if (modelsDataset.models.length < 1) {
  console.error("Expected at least 1 model in models.json.");
  process.exit(1);
}

if (imagePromptsDataset.items.length !== imagePromptsDataset.meta.count) {
  console.error(
    `image-prompts.json meta.count ${imagePromptsDataset.meta.count} does not match items ${imagePromptsDataset.items.length}`,
  );
  process.exit(1);
}

if (imagePromptsDataset.items.length < 1) {
  console.error("Expected at least 1 item in image-prompts.json.");
  process.exit(1);
}

const caseIds = new Set(dataset.cases.map((item) => item.id));
const htmlIds = new Set(htmlDataset.items.map((item) => item.id));
const agentUiIds = new Set(agentUiDataset.items.map((item) => item.id));

for (const path of pathsDataset.paths) {
  const page = `paths/${path.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
  for (const id of path.relatedCaseIds ?? []) {
    if (!caseIds.has(id)) missing.push(`paths.json relatedCaseId not found: ${path.id} → ${id}`);
  }
  for (const id of path.relatedHtmlIds ?? []) {
    if (!htmlIds.has(id)) missing.push(`paths.json relatedHtmlId not found: ${path.id} → ${id}`);
  }
  for (const id of path.relatedAgentUiIds ?? []) {
    if (!agentUiIds.has(id)) missing.push(`paths.json relatedAgentUiId not found: ${path.id} → ${id}`);
  }
}

for (const combo of combosDataset.combos) {
  const page = `combos/${combo.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
  if (!htmlIds.has(combo.htmlId)) missing.push(`combos.json htmlId not found: ${combo.id} → ${combo.htmlId}`);
  if (!agentUiIds.has(combo.agentUiId)) missing.push(`combos.json agentUiId not found: ${combo.id} → ${combo.agentUiId}`);
  if (!caseIds.has(combo.caseId)) missing.push(`combos.json caseId not found: ${combo.id} → ${combo.caseId}`);
}

for (const model of modelsDataset.models) {
  const page = `models/${model.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
  if (!(model.sources ?? []).some((source) => source.kind === "official")) {
    missing.push(`models.json ${model.id} needs at least one official source`);
  }
  for (const id of model.relatedCaseIds ?? []) {
    if (!caseIds.has(id)) missing.push(`models.json relatedCaseId not found: ${model.id} → ${id}`);
  }
  for (const id of model.relatedModelIds ?? []) {
    if (id === model.id || !modelsDataset.models.some((other) => other.id === id)) {
      missing.push(`models.json relatedModelId not found: ${model.id} → ${id}`);
    }
  }
}

const modelIds = new Set(modelsDataset.models.map((item) => item.id));
for (const item of imagePromptsDataset.items) {
  const page = `image-prompts/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
  if (!/^https?:\/\//.test(item.sourceUrl ?? "")) {
    missing.push(`image-prompts.json ${item.id} sourceUrl must be an absolute public URL`);
  }
  for (const id of item.relatedModelIds ?? []) {
    if (!modelIds.has(id)) missing.push(`image-prompts.json relatedModelId not found: ${item.id} → ${id}`);
  }
}

const previewItems = [
  ...dataset.cases.map((item) => ({ lib: "grok", ...item })),
  ...htmlDataset.items.map((item) => ({ lib: "html", ...item })),
  ...agentUiDataset.items.map((item) => ({ lib: "agent-ui", ...item })),
  ...modelsDataset.models.map((item) => ({ lib: "models", ...item })),
  ...imagePromptsDataset.items.map((item) => ({ lib: "image-prompts", ...item })),
];

// Curator `stars` is optional; when present it must be an integer 1–5.
for (const item of previewItems) {
  if (item.stars === undefined) continue;
  if (!Number.isInteger(item.stars) || item.stars < 1 || item.stars > 5) {
    missing.push(`stars for ${item.lib}:${item.id} must be an integer 1–5, got ${JSON.stringify(item.stars)}`);
  }
}

const starred = previewItems.filter((item) => Number.isInteger(item.stars));
if (starred.length === 0) {
  console.error("Expected at least one item with curator stars.");
  process.exit(1);
}

for (const item of previewItems) {
  if (!item.previewImage) continue;
  if (!item.previewImage.startsWith("/previews/")) {
    missing.push(`previewImage for ${item.lib}:${item.id} should be /previews/…, got ${item.previewImage}`);
    continue;
  }
  const file = item.previewImage.replace(/^\//, "");
  if (!existsSync(new URL(`../dist/${file}`, import.meta.url))) {
    missing.push(`dist/${file}`);
  }
}

const noteDates = [...new Set(changelog.notes.map((note) => note.date))];
for (const date of noteDates) {
  const path = `d/${date}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const path of pathsDataset.paths) {
  if (!path.run?.desk || !path.run?.targetHint || !path.run?.briefTemplate) {
    console.error(`paths.json ${path.id} is missing run.desk / run.targetHint / run.briefTemplate.`);
    process.exit(1);
  }
}

const runSampleSlugs = ["daily-to-draft", "marketing-desk-draft-only"];
for (const slug of runSampleSlugs) {
  const page = await readFile(new URL(`../dist/paths/${slug}/index.html`, import.meta.url), "utf8");
  if (!page.includes("开跑") || !page.includes("data-path-brief") || !page.includes("data-path-copy")) {
    console.error(`paths/${slug}/ is missing the 开跑 control (开跑 / data-path-brief / data-path-copy).`);
    process.exit(1);
  }
  if (!page.includes("【开跑 brief") || !page.includes("丢给 AIUP营销Lead")) {
    console.error(`paths/${slug}/ is missing a filled marketing-desk brief.`);
    process.exit(1);
  }
}

{
  const sample = starred[0];
  const dir = sample.lib === "grok" ? "cases" : sample.lib;
  const page = await readFile(new URL(`../dist/${dir}/${sample.slug}/index.html`, import.meta.url), "utf8");
  if (!page.includes(`data-stars="${sample.stars}"`) || !page.includes(`data-fav-key="${sample.lib}:${sample.id}"`)) {
    console.error(`${dir}/${sample.slug}/ is missing the curator stars badge or the ☆ favorite toggle.`);
    process.exit(1);
  }
}

const favorites = await readFile(new URL("../dist/favorites/index.html", import.meta.url), "utf8");
if (!favorites.includes("我的收藏") || !favorites.includes("data-fav-item=") || !favorites.includes("data-fav-clear")) {
  console.error("favorites/ is missing the 我的收藏 shell (data-fav-item / data-fav-clear).");
  process.exit(1);
}

const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
if (!home.includes("最近更新") || !home.includes("directory-home")) {
  console.error("Homepage is missing the plaza digest shell (今日看点 / home-plaza / home-pill).");
  process.exit(1);
}

if (/paths\/|combos\//.test(home) || home.includes("本周可抄") || home.includes("plaza-paths-strip")) {
  console.error("Homepage still exposes internal paths/ or combos/ (playbooks strip or links).");
  process.exit(1);
}

async function assertNoindex(rel) {
  const page = await readFile(new URL(`../dist/${rel}`, import.meta.url), "utf8");
  if (!page.includes('name="robots" content="noindex, nofollow"')) {
    console.error(`${rel} is missing <meta name="robots" content="noindex, nofollow">.`);
    process.exit(1);
  }
}

await assertNoindex("paths/index.html");
for (const path of pathsDataset.paths) {
  await assertNoindex(`paths/${path.slug}/index.html`);
}
await assertNoindex("combos/index.html");
for (const combo of combosDataset.combos) {
  await assertNoindex(`combos/${combo.slug}/index.html`);
}

if (!home.includes("models/") || !home.includes("模型与能力")) {
  console.error("Homepage is missing the Models rail link (models/ / 最新模型).");
  process.exit(1);
}

const modelsIndex = await readFile(new URL("../dist/models/index.html", import.meta.url), "utf8");
if (!modelsIndex.includes("models/gpt-6-astra/") || !modelsIndex.includes("GPT-6 Astra")) {
  console.error("models/ is missing the GPT-6 Astra card.");
  process.exit(1);
}

if (!home.includes("prompts/") || !home.includes("提示词与素材")) {
  console.error("Homepage is missing the Image 2.5 prompts rail link (image-prompts/ / Image 2.5 提示词).");
  process.exit(1);
}

const imagePromptsIndex = await readFile(new URL("../dist/image-prompts/index.html", import.meta.url), "utf8");
if (
  !imagePromptsIndex.includes("image-prompts/dsxzai-image-25-gallery/") ||
  !imagePromptsIndex.includes("img.dsxzai.com")
) {
  console.error("image-prompts/ is missing the dsxzai gallery card.");
  process.exit(1);
}

{
  const page = await readFile(new URL("../dist/image-prompts/dsxzai-image-25-gallery/index.html", import.meta.url), "utf8");
  if (
    !page.includes("https://img.dsxzai.com/") ||
    !page.includes("https://x.com/dashiAIxz/status/2099390242197565492") ||
    !page.includes('data-fav-key="image-prompts:dsxzai-image-25-gallery"')
  ) {
    console.error("image-prompts/dsxzai-image-25-gallery/ is missing the gallery link, the X source post, or the ☆ toggle.");
    process.exit(1);
  }
}

{
  const linked = modelsDataset.models.find((model) => (model.relatedModelIds ?? []).length > 0);
  if (linked) {
    const page = await readFile(new URL(`../dist/models/${linked.slug}/index.html`, import.meta.url), "utf8");
    const target = modelsDataset.models.find((model) => model.id === linked.relatedModelIds[0]);
    if (!page.includes("同板相关") || !page.includes(`models/${target.slug}/`)) {
      console.error(`models/${linked.slug}/ is missing the 同板相关 section linking to models/${target.slug}/.`);
      process.exit(1);
    }
  }
}

if (!home.includes("编辑精选") || !home.includes("editorial-feature")) {
  console.error("Homepage is missing the editorial feature.");
  process.exit(1);
}

if (!home.includes("新手从这里开始") || !home.replaceAll("&#38;", "&").replaceAll("&amp;", "&").includes("search/?section=learn&difficulty=starter")) {
  console.error("Homepage is missing the starter row link to search/?section=learn&difficulty=starter.");
  process.exit(1);
}

if (!home.includes("按任务探索")) {
  console.error("Homepage meta/OG is missing task-based positioning.");
  process.exit(1);
}

// GitHub star CTA for this repo: home rail card + header pill / footer line on a regular page.
const repoUrl = `https://github.com/${process.env.GITHUB_REPOSITORY || "mostdesign01-sudo/grokbot-use-cases"}`;
if (!home.includes("给本项目点个 Star") || !home.includes("gh-star-rail") || !home.includes(repoUrl)) {
  console.error("Homepage is missing the GitHub star CTA (给本项目点个 Star / gh-star-rail → repo URL).");
  process.exit(1);
}
if (!favorites.includes("gh-star-pill") || !favorites.includes("gh-star-line") || !favorites.includes(repoUrl)) {
  console.error("Site chrome is missing the GitHub star pill (header) or line (footer).");
  process.exit(1);
}

const errandPage = await readFile(new URL("../dist/cases/errand-opensource/index.html", import.meta.url), "utf8");
const errandChecks = [
  "它是什么",
  "怎么试",
  "对照",
  "边界",
  "https://runerrand.dev/",
  "https://github.com/runta-dev/errand",
  "https://news.ycombinator.com/item?id=49803044",
  "https://runta.com/blog/building-errand-in-one-week/",
  "/previews/errand-opensource.webp",
];
for (const needle of errandChecks) {
  if (!errandPage.includes(needle)) {
    console.error(`cases/errand-opensource/ is missing landing content: ${needle}`);
    process.exit(1);
  }
}
if (errandPage.includes("把跑通的步骤存成 Skill") || errandPage.includes("再上 Routine")) {
  console.error("cases/errand-opensource/ still renders the generic Skill / Routine start path.");
  process.exit(1);
}

if (missing.length) {
  console.error("Missing build outputs:\n" + missing.join("\n"));
  process.exit(1);
}

{
  const hookNoise = /HTTP|gh api|Algolia|\d\s*pts\b|\bpts\b|★|撰写时|item \d|\d{4}-\d\d-\d\d/;
  const hookBad = [];
  const lintHooks = (label, items) => {
    const absent = [];
    const bad = [];
    for (const item of items) {
      const hasHook = item.hook !== undefined || item.hookEn !== undefined;
      if (!hasHook) {
        absent.push(item.id);
        continue;
      }
      const zh = typeof item.hook === "string" ? item.hook : "";
      const en = typeof item.hookEn === "string" ? item.hookEn : "";
      const reasons = [];
      if (!zh || !en) reasons.push("pair");
      if ([...zh].length > 36) reasons.push(`zh ${[...zh].length}`);
      if (en.length > 90) reasons.push(`en ${en.length}`);
      if (!/[。！]$/.test(zh)) reasons.push("zh ending");
      if (!/[.!]$/.test(en)) reasons.push("en ending");
      if (hookNoise.test(zh + en)) reasons.push("banned token");
      if (reasons.length) bad.push(`${item.id} (${reasons.join(", ")})`);
    }
    if (absent.length) {
      hookBad.push(...absent.map(id => `${label}/${id} (missing hook pair)`));
      console.error(`hook lint: ${label} ${absent.length} without a hook: ${absent.join(", ")}`);
    }
    if (bad.length) {
      hookBad.push(...bad.map((line) => `${label}/${line}`));
      console.error(`hook lint: ${label} ${bad.length} format violation(s): ${bad.join("; ")}`);
    } else {
      console.log(`hook lint: ${label} ${items.length} items, ${absent.length} missing, 0 format violations.`);
    }
  };
  lintHooks("cases", dataset.cases);
  lintHooks("html", htmlDataset.items);
  lintHooks("agent-ui", agentUiDataset.items);
  if (hookBad.length) process.exit(1);
}

console.log(
  `Build verified: ${dataset.cases.length} case pages, ${htmlDataset.items.length} HTML item pages, ${agentUiDataset.items.length} Agent UI pages, ${pathsDataset.paths.length} playbook pages, ${combosDataset.combos.length} combo pages, ${modelsDataset.models.length} model pages, ${imagePromptsDataset.items.length} image prompt pages, and core routes present.`,
);

// A purpose-based directory must preserve each legacy entry, URL, and favorite key.
const directory = JSON.parse(await readFile(new URL("../dist/catalog.json", import.meta.url), "utf8"));
const membership = JSON.parse(await readFile(new URL("../data/directory.json", import.meta.url), "utf8"));
const sources = [
  ["grok", "cases", dataset.cases], ["html", "html", htmlDataset.items],
  ["agent-ui", "agent-ui", agentUiDataset.items], ["models", "models", modelsDataset.models],
  ["image-prompts", "image-prompts", imagePromptsDataset.items],
];
const expectedKeys = sources.flatMap(([lib, , list]) => list.map(item => `${lib}:${item.id}`));
const actualKeys = directory.entries.map(entry => entry.key);
if (new Set(actualKeys).size !== actualKeys.length || actualKeys.length !== expectedKeys.length || expectedKeys.some(key => !actualKeys.includes(key))) {
  throw new Error("Unified directory duplicates or loses an existing entry.");
}
const sectionIds = ["learn", "tools", "design", "models", "prompts"];
const searchPage = await readFile(new URL("../dist/search/index.html", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
for (const section of sectionIds) {
  if (!directory.entries.some(entry => entry.sections.includes(section))) throw new Error(`Empty section: ${section}`);
  const page = await readFile(new URL(`../dist/${section}/index.html`, import.meta.url), "utf8");
  if (!page.includes(`/${section}/`)) throw new Error(`Missing section navigation: ${section}`);
}
for (const [lib, path, list] of sources) {
  for (const item of list) {
    const entry = directory.entries.find(entry => entry.key === `${lib}:${item.id}`);
    if (!entry.href.endsWith(`/${path}/${item.slug}/`)) throw new Error(`Legacy URL changed: ${entry.key}`);
    if (!entry.sections.length || entry.sections.some(id => !sectionIds.includes(id))) throw new Error(`Invalid section membership: ${entry.key}`);
    if (!searchPage.includes(`data-key="${entry.key}"`) || !searchPage.includes(`data-fav-key="${entry.key}"`)) throw new Error(`Missing search or favorite entry: ${entry.key}`);
    if (!sitemap.includes(entry.href)) throw new Error(`Missing detail URL in sitemap: ${entry.key}`);
  }
}
for (const [key, ids] of Object.entries(membership)) {
  const pool = key.startsWith("case") ? dataset.cases : htmlDataset.items;
  if (new Set(ids).size !== ids.length || ids.some(id => !pool.some(item => item.id === id))) throw new Error(`Stale directory mapping: ${key}`);
}
if (/paths\/|combos\/|favorites\/|search\//.test(sitemap)) throw new Error("Sitemap exposes internal or user-specific pages.");
console.log(`Directory verified: ${actualKeys.length} unique entries across five source libraries; legacy links and favorite keys preserved.`);

// Public design assets must agree with the live brand and stay usable by assistants.
const brandPage = await readFile(new URL("../dist/brand/index.html", import.meta.url), "utf8");
const brandTokens = JSON.parse(await readFile(new URL("../dist/brand/tokens.json", import.meta.url), "utf8"));
const brandCSS = await readFile(new URL("../dist/brand/tokens.css", import.meta.url), "utf8");
const brandBrief = await readFile(new URL("../dist/brand/ai-guide.md", import.meta.url), "utf8");
const brandSVG = await readFile(new URL("../dist/brand/logo.svg", import.meta.url), "utf8");
const inverseSVG = await readFile(new URL("../dist/brand/logo-inverse.svg", import.meta.url), "utf8");
const faviconSVG = await readFile(new URL("../dist/favicon.svg", import.meta.url), "utf8");
const pathsOf = svg => [...svg.matchAll(/\sd="([^"]+)"/g)].map(match => match[1]);
if (JSON.stringify(pathsOf(brandSVG)) !== JSON.stringify(pathsOf(faviconSVG)) || JSON.stringify(pathsOf(brandSVG)) !== JSON.stringify(pathsOf(inverseSVG))) throw new Error("Logo downloads and favicon have different shapes.");
if (!sitemap.includes("/brand/") || !brandPage.includes("品牌与界面规范") || !brandBrief.includes("## Implementation contract") || !brandBrief.includes("## 中文工作说明")) throw new Error("Brand guidelines, sitemap, or bilingual brief are missing.");
if (brandTokens.brand !== "AI UP LAB" || brandTokens.defaultTheme !== "light") throw new Error("Invalid brand token export.");
const luminance = hex => {
  const channels = hex.slice(1).match(/.{2}/g).map(value => parseInt(value, 16) / 255);
  const linear = channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
};
const contrast = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
for (const theme of ["light", "dark"]) {
  const colors = brandTokens.themes[theme];
  for (const [role, value] of Object.entries(colors)) {
    if (!/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value) || !brandCSS.includes(`--lab-color-${role}:${value};`)) throw new Error(`Invalid or inconsistent exported color: ${theme}/${role}`);
  }
  for (const role of ["text", "muted", "subtle", "brand", "success", "warning", "error"]) {
    if (contrast(colors[role], colors.background) < 4.5 || contrast(colors[role], colors.surface) < 4.5) throw new Error(`Brand text contrast below target: ${theme}/${role}`);
  }
  if (contrast(colors.onBrand, colors.brand) < 4.5) throw new Error(`Brand button contrast below target: ${theme}`);
}
console.log("Brand system verified: public downloads, consistent logo shapes and tokens, bilingual AI brief, and text contrast targets in both themes.");

// Public rules must resolve to real pages, dependencies, source files, and tokens.
const knowledge = JSON.parse(await readFile(new URL("../dist/brand/knowledge.json", import.meta.url), "utf8"));
const ruleIds = new Set(knowledge.specs.map(spec => spec.id));
if (ruleIds.size !== knowledge.specs.length || knowledge.version !== brandTokens.version) throw new Error("Invalid design knowledge IDs or version.");
const visitRule = (id, trail = []) => {
  if (trail.includes(id)) throw new Error(`Design rule dependency cycle: ${[...trail, id].join(" -> ")}`);
  const spec = knowledge.specs.find(item => item.id === id);
  if (!spec) throw new Error(`Missing design rule: ${id}`);
  for (const dep of spec.dependencies) visitRule(dep, [...trail, id]);
};
for (const spec of knowledge.specs) {
  visitRule(spec.id);
  const page = await readFile(new URL(`../dist/brand/guides/${spec.id}/index.html`, import.meta.url), "utf8");
  const rule = await readFile(new URL(`../dist/brand/rules/${spec.id}.md`, import.meta.url), "utf8");
  if (!page.includes(spec.title.zh) || !page.includes(spec.title.en.replaceAll("&", "&amp;")) || !rule.includes(`ID: ${spec.id}`) || !sitemap.includes(`/brand/guides/${spec.id}/`)) throw new Error(`Missing handbook content: ${spec.id}`);
  for (const ref of spec.code) await readFile(new URL(`../${ref.path}`, import.meta.url), "utf8");
  for (const token of spec.tokens) if (!brandCSS.includes(`${token}:`)) throw new Error(`Unknown design token: ${spec.id}/${token}`);
}
console.log(`Design handbook verified: ${ruleIds.size} bilingual guides, Markdown rules, acyclic dependencies, source mappings, and shared tokens.`);

const brandCollectionPages = [
  "brand-collection/index.html",
  "brand-collection/references/index.html",
  "brand-collection/dewu/index.html",
  "brand-collection/ai-up-lab/index.html",
  "brand-collection/joma/index.html",
  "brand-collection/joma/visual-audit/index.html",
  "brand-collection/joma/china-ecommerce/index.html",
];
const brandCollectionForbidden = ["品牌书", "brand-book", "design-spec", "内部", "evidence", "brand-rules"];
for (const page of brandCollectionPages) {
  const html = await readFile(new URL(`../dist/${page}`, import.meta.url), "utf8");
  if (!html.includes("品牌收集") || !sitemap.includes(`/${page.replace(/index\.html$/, "")}`)) {
    throw new Error(`Brand collection page missing from the nav or sitemap: ${page}`);
  }
  for (const term of brandCollectionForbidden) {
    if (html.includes(term)) throw new Error(`Brand collection page includes “${term}”: ${page}`);
  }
}
const brandCollectionIndex = await readFile(new URL("../dist/brand-collection/index.html", import.meta.url), "utf8");
if (!brandCollectionIndex.includes("https://openai.com/brand/") || !brandCollectionIndex.includes("对标研究")) {
  throw new Error("Brand collection index is missing the reference grid or benchmark block.");
}
console.log("Brand collection verified: public pages, navigation, sitemap, and no internal-source wording.");
