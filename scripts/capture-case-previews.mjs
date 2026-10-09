/**
 * Capture real case card thumbnails for entries still on category cover fallbacks.
 *
 *   npm i -D playwright sharp
 *   node scripts/capture-case-previews.mjs
 *   node scripts/capture-case-previews.mjs --only=grok-bot-for-work,haggle-bot-procurement
 *   node scripts/capture-case-previews.mjs --unique   # only one-off source URLs
 *   node scripts/capture-case-previews.mjs --write    # patch data/cases.json on success
 *
 * Unique source pages get a full-page crop. Hash/shared pages try to clip the
 * matching section; if that fails they are skipped (use generate-case-covers).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "previews");
const casesPath = join(root, "data", "cases.json");
const WIDTH = 900;
const HEIGHT = 600;
const VIEWPORT = { width: 1280, height: 900 };

const argv = process.argv.slice(2);
const writeJson = argv.includes("--write");
const uniqueOnly = argv.includes("--unique");
const force = argv.includes("--force");
const onlyArg = argv.find((arg) => arg.startsWith("--only="))?.slice(7);
const onlyIds = onlyArg ? new Set(onlyArg.split(",").map((s) => s.trim()).filter(Boolean)) : null;

function baseUrl(url) {
  const u = new URL(url);
  u.hash = "";
  return u.toString();
}

async function dismissOverlays(page) {
  const clicks = [
    "#onetrust-accept-btn-handler",
    "button:has-text('Accept all')",
    "button:has-text('Accept All')",
    "button:has-text('Accept')",
    "button:has-text('I agree')",
    "button:has-text('Got it')",
    "button:has-text('OK')",
    "button:has-text('Close')",
    "[aria-label='Close']",
    "[aria-label='Dismiss']",
  ];
  for (const sel of clicks) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      try {
        await loc.click({ timeout: 800 });
      } catch {
        /* ignore */
      }
    }
  }
}

async function isUsefulImage(sharp, buf) {
  const stats = await sharp(buf).stats();
  const channels = stats.channels.filter((c) => c.mean !== undefined);
  const stdev = channels.reduce((sum, c) => sum + c.stdev, 0) / Math.max(channels.length, 1);
  const mean = channels.reduce((sum, c) => sum + c.mean, 0) / Math.max(channels.length, 1);
  if (stdev < 7) return false;
  if (mean < 6 || mean > 250) return false;
  return true;
}

function slugTokens(id, title) {
  return [id, ...(title || "").toLowerCase().split(/[^a-z0-9\u4e00-\u9fff]+/)]
    .map((t) => t.trim())
    .filter((t) => t.length >= 3)
    .slice(0, 8);
}

function cssEscapeIdent(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, (ch) => `\\${ch}`);
}

async function sectionScreenshot(page, item) {
  const hash = new URL(item.sourceUrl).hash.replace(/^#/, "");
  const tokens = slugTokens(item.id, item.titleEn || item.title);
  if (hash) {
    const byId = page.locator(`#${cssEscapeIdent(hash)}, [name="${hash}"]`);
    if (await byId.count()) {
      await byId.first().scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(400);
      const box = await byId.first().boundingBox();
      if (box && box.width >= 240 && box.height >= 120) {
        return page.screenshot({
          type: "png",
          animations: "disabled",
          clip: {
            x: Math.max(0, box.x - 12),
            y: Math.max(0, box.y - 12),
            width: Math.min(VIEWPORT.width - Math.max(0, box.x - 12), Math.max(box.width + 24, 640)),
            height: Math.min(VIEWPORT.height - Math.max(0, box.y - 12), Math.max(box.height + 24, 360)),
          },
        });
      }
    }
  }

  for (const token of tokens) {
    const heading = page.locator("h1, h2, h3, h4, a, [data-usecase]").filter({ hasText: new RegExp(token.replace(/[-_]/g, "[-\\s_]*"), "i") }).first();
    if (!(await heading.count())) continue;
    try {
      await heading.scrollIntoViewIfNeeded({ timeout: 2000 });
      await page.waitForTimeout(300);
      const handle = await heading.elementHandle();
      const section = await page.evaluateHandle((el) => el.closest("article, section, li, .card, [class*='card'], [class*='use']") || el.parentElement, handle);
      const box = await section.asElement()?.boundingBox();
      if (box && box.width >= 240 && box.height >= 120) {
        return page.screenshot({
          type: "png",
          animations: "disabled",
          clip: {
            x: Math.max(0, box.x - 8),
            y: Math.max(0, box.y - 8),
            width: Math.min(VIEWPORT.width - Math.max(0, box.x - 8), Math.max(box.width + 16, 640)),
            height: Math.min(VIEWPORT.height - Math.max(0, box.y - 8), Math.max(Math.min(box.height + 16, 520), 360)),
          },
        });
      }
    } catch {
      /* try next token */
    }
  }
  return null;
}

async function main() {
  const [{ chromium }, sharpMod] = await Promise.all([import("playwright"), import("sharp")]);
  const sharp = sharpMod.default;
  await mkdir(outDir, { recursive: true });

  const dataset = JSON.parse(await readFile(casesPath, "utf8"));
  const pool = dataset.cases.filter((item) => force || !item.previewImage);
  const counts = {};
  for (const item of pool) counts[baseUrl(item.sourceUrl)] = (counts[baseUrl(item.sourceUrl)] || 0) + 1;

  let targets = pool.filter((item) => {
    if (onlyIds && !onlyIds.has(item.id)) return false;
    if (uniqueOnly && counts[baseUrl(item.sourceUrl)] > 1) return false;
    return true;
  });

  console.log(`Capturing ${targets.length} case(s); write=${writeJson} uniqueOnly=${uniqueOnly} force=${force}`);

  const browser = await chromium.launch({ channel: "chrome", headless: true }).catch(() =>
    chromium.launch({ headless: true })
  );

  const results = [];
  const patched = new Map();

  for (const item of targets) {
    const shared = counts[baseUrl(item.sourceUrl)] > 1;
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();
    page.setDefaultTimeout(25000);
    const started = Date.now();
    try {
      const response = await page.goto(item.sourceUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
      const status = response?.status() ?? 0;
      if (status >= 400) throw new Error(`HTTP ${status}`);
      await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1200);
      await dismissOverlays(page);

      let raw = null;
      if (shared || new URL(item.sourceUrl).hash) {
        raw = await sectionScreenshot(page, item);
      }
      if (!raw) {
        if (shared) throw new Error("shared source needs a distinct section clip");
        raw = await page.screenshot({ type: "png", animations: "disabled" });
      }
      if (!(await isUsefulImage(sharp, raw))) throw new Error("screenshot looks blank / blocked");

      const dest = join(outDir, `${item.id}.webp`);
      await sharp(raw)
        .resize({ width: WIDTH, height: HEIGHT, fit: "cover", position: "top" })
        .webp({ quality: 74, effort: 5 })
        .toFile(dest);

      const file = `/previews/${item.id}.webp`;
      patched.set(item.id, {
        file,
        creditZh: shared || new URL(item.sourceUrl).hash
          ? "预览：Playwright 实拍来源页对应区块，裁成 3:2 WebP"
          : "预览：Playwright 实拍来源页，裁成 3:2 WebP",
        creditEn: shared || new URL(item.sourceUrl).hash
          ? "Preview: Playwright clip of the matching source section, cropped to 3:2 WebP"
          : "Preview: Playwright capture of the source page, cropped to 3:2 WebP",
      });
      results.push({ id: item.id, ok: true, ms: Date.now() - started, file, shared });
      console.log(`OK  ${item.id}  ${item.sourceUrl}`);
    } catch (error) {
      results.push({ id: item.id, ok: false, error: String(error.message || error), shared });
      console.warn(`SKIP ${item.id}  ${item.sourceUrl}  → ${error.message || error}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();

  if (writeJson && patched.size) {
    for (const item of dataset.cases) {
      const patch = patched.get(item.id);
      if (!patch) continue;
      item.previewImage = patch.file;
      item.previewCredit = patch.creditZh;
      item.previewCreditEn = patch.creditEn;
    }
    await writeFile(casesPath, `${JSON.stringify(dataset, null, 2)}\n`);
    console.log(`Patched data/cases.json with ${patched.size} previewImage field(s).`);
  }

  await writeFile(join(root, "scripts", "capture-case-report.json"), `${JSON.stringify(results, null, 2)}\n`);
  const ok = results.filter((r) => r.ok);
  console.log(`\nCaptured ${ok.length}/${results.length}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
