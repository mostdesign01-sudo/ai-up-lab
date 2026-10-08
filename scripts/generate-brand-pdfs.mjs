/**
 * Build printable PDF notes for Brand Collection entries.
 *
 *   node scripts/generate-brand-pdfs.mjs
 *
 * Sources:
 * - reference cards → section text from references.md
 * - benchmark studies → full markdown pages
 *
 * These are AI UP LAB study notes, not official brand books.
 */
import { mkdir, readFile, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "brand-collection", "pdfs");
const tmpDir = join(root, ".tmp", "brand-pdfs");

const COPYRIGHT =
  "素材均来自各品牌公开发布的资料，版权归原品牌所有，仅作学习与参考。本 PDF 为 AI UP LAB 整理笔记，不是官方 Brand Book。";

const studies = [
  { id: "dewu", title: "得物 / POIZON 参考对标", source: "src/pages/brand-collection/dewu.md" },
  { id: "ai-up-lab", title: "AI UP LAB 参考对标", source: "src/pages/brand-collection/ai-up-lab.md" },
  { id: "joma", title: "JOMA 品牌调研", source: "src/pages/brand-collection/joma/index.md" },
  { id: "joma-visual-audit", title: "JOMA 视觉审计", source: "src/pages/brand-collection/joma/visual-audit.md" },
  { id: "joma-china-ecommerce", title: "JOMA 中国电商视觉", source: "src/pages/brand-collection/joma/china-ecommerce.md" },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMd(text) {
  let s = escapeHtml(text);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let inUl = false;
  let inOl = false;
  let inTable = false;
  let inCode = false;
  let codeBuf = [];

  const closeLists = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      out.push("</tbody></table>");
      inTable = false;
    }
  };

  for (const raw of lines) {
    const line = raw;

    if (line.startsWith("```")) {
      if (inCode) {
        out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        closeLists();
        closeTable();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    if (/^\s*\|/.test(line)) {
      closeLists();
      if (/^\s*\|?\s*:?-+:?\s*\|/.test(line)) continue;
      const cells = line
        .replace(/^\s*\|/, "")
        .replace(/\|\s*$/, "")
        .split("|")
        .map((c) => c.trim());
      if (!inTable) {
        out.push("<table><thead><tr>");
        for (const cell of cells) out.push(`<th>${inlineMd(cell)}</th>`);
        out.push("</tr></thead><tbody>");
        inTable = true;
      } else {
        out.push("<tr>");
        for (const cell of cells) out.push(`<td>${inlineMd(cell)}</td>`);
        out.push("</tr>");
      }
      continue;
    }
    closeTable();

    if (/^\s*$/.test(line)) {
      closeLists();
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeLists();
      const level = heading[1].length;
      out.push(`<h${level}>${inlineMd(heading[2].replace(/⭐/g, "").trim())}</h${level}>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeLists();
      out.push(`<blockquote><p>${inlineMd(line.replace(/^>\s?/, ""))}</p></blockquote>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      closeLists();
      out.push("<hr />");
      continue;
    }

    const ul = line.match(/^\s*[-*]\s+(.+)$/);
    if (ul) {
      if (inOl) {
        out.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inlineMd(ul[1])}</li>`);
      continue;
    }

    const ol = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ol) {
      if (inUl) {
        out.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        out.push("<ol>");
        inOl = true;
      }
      out.push(`<li>${inlineMd(ol[1])}</li>`);
      continue;
    }

    closeLists();
    out.push(`<p>${inlineMd(line)}</p>`);
  }

  closeLists();
  closeTable();
  if (inCode) out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
  return out.join("\n");
}

function stripFrontmatter(md) {
  if (!md.startsWith("---")) return md;
  const end = md.indexOf("\n---", 3);
  if (end === -1) return md;
  return md.slice(end + 4).replace(/^\s+/, "");
}

function extractReferenceSections(md) {
  const map = new Map();
  const re = /<a id="([^"]+)"><\/a>\s*\n([\s\S]*?)(?=\n<a id="[^"]+"><\/a>\s*\n|\n## |\n---\s*\n|$)/g;
  let match;
  while ((match = re.exec(md))) {
    map.set(match[1], match[2].trim());
  }
  // MiniMax uses <h3 id="minimax">
  const minimax = md.match(/<h3 id="minimax">([\s\S]*?)(?=\n<a id="|\n## |\n---\s*\n|$)/);
  if (minimax) map.set("minimax", minimax[0].replace(/^<h3 id="minimax">/, "### ").replace(/<\/h3>/, "").trim());

  // Table-row anchors: capture the whole design-system table block once, then slice rows
  const tableBlock = md.match(/### 设计系统 \/ 品牌页[\s\S]*?(?=\n<a id="aggregators"><\/a>|\n### 聚合站)/);
  if (tableBlock) {
    const rows = [...tableBlock[0].matchAll(/\|[^\n]*<a id="([^"]+)"><\/a>[^\n]*\|[^\n]*\|[^\n]*\|[^\n]*\|/g)];
    for (const row of rows) {
      const id = row[1];
      if (map.has(id)) continue;
      const cells = row[0]
        .replace(/^\s*\|/, "")
        .replace(/\|\s*$/, "")
        .split("|")
        .map((c) => c.trim());
      const name = cells[0].replace(/<a id="[^"]+"><\/a>/, "").trim();
      const type = cells[1] ?? "";
      const url = cells[2] ?? "";
      const note = cells[3] ?? "";
      map.set(
        id,
        [
          `### ${name}`,
          `- **类型**：${type}`,
          `- **官方 URL**：${url}`,
          `- **摘要**：${note}`,
          "",
          "> 本条目来自参考清单「网页品牌设计规范」表；完整上下文见品牌收集参考清单页。",
        ].join("\n"),
      );
    }
  }
  return map;
}

function loadCardsFromTs(ts) {
  const cards = [];
  const re =
    /\{\s*id:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)"\s*,\s*anchor:\s*"([^"]+)"\s*,\s*url:\s*(?:"([^"]*)"|undefined)?[^}]*notable:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(ts))) {
    cards.push({
      id: m[1],
      name: m[2],
      anchor: m[3],
      url: m[4] || undefined,
      notable: m[5].replace(/\\"/g, '"'),
    });
  }
  return cards;
}

function printDocument({ title, subtitle, bodyHtml, sourceLabel }) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)} · AI UP LAB</title>
<style>
  @page { size: A4; margin: 18mm 16mm 20mm; }
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #17151b;
    font: 11.5pt/1.65 "Noto Sans CJK SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  }
  .sheet { max-width: 720px; margin: 0 auto; }
  .kicker { margin: 0 0 6px; color: #8a7a4a; font-size: 10pt; letter-spacing: 0.04em; text-transform: uppercase; }
  h1 { margin: 0 0 8px; font-size: 22pt; line-height: 1.25; letter-spacing: -0.02em; }
  .lede { margin: 0 0 18px; color: #5b5664; font-size: 11pt; }
  .meta { margin: 0 0 20px; padding: 10px 12px; border: 1px solid #e6e1d6; border-radius: 8px; background: #faf8f3; font-size: 10pt; color: #5b5664; }
  .meta a { color: #8a7a4a; word-break: break-all; }
  hr { border: 0; border-top: 1px solid #e6e1d6; margin: 18px 0; }
  h2 { font-size: 14pt; margin: 20px 0 8px; }
  h3 { font-size: 12.5pt; margin: 16px 0 6px; }
  h4 { font-size: 11.5pt; margin: 14px 0 6px; }
  p, li { margin: 0 0 8px; }
  ul, ol { margin: 0 0 12px; padding-left: 1.3em; }
  blockquote { margin: 10px 0; padding: 2px 0 2px 12px; border-left: 2px solid #8a7a4a; color: #5b5664; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.9em; background: #f3f0ea; padding: 0.05em 0.3em; border-radius: 4px; }
  pre { overflow: hidden; padding: 10px 12px; border-radius: 8px; background: #f3f0ea; font-size: 9.5pt; white-space: pre-wrap; word-break: break-word; }
  table { width: 100%; border-collapse: collapse; margin: 0 0 14px; font-size: 9.5pt; }
  th, td { border: 1px solid #e6e1d6; padding: 6px 8px; vertical-align: top; text-align: left; }
  th { background: #f3f0ea; }
  a { color: #8a7a4a; text-decoration: none; }
  .foot { margin-top: 28px; padding-top: 12px; border-top: 1px solid #e6e1d6; color: #8a8490; font-size: 9pt; line-height: 1.55; }
</style>
</head>
<body>
  <main class="sheet">
    <p class="kicker">AI UP LAB · Brand Collection</p>
    <h1>${escapeHtml(title)}</h1>
    <p class="lede">${escapeHtml(subtitle)}</p>
    <p class="meta">${escapeHtml(sourceLabel)}</p>
    <hr />
    ${bodyHtml}
    <p class="foot">${escapeHtml(COPYRIGHT)}</p>
  </main>
</body>
</html>`;
}

async function resolvePlaywright() {
  try {
    const require = createRequire(import.meta.url);
    return require("playwright");
  } catch {
    /* fall through */
  }
  const npxRoot = join(process.env.HOME || "/home/ubuntu", ".npm/_npx");
  if (!existsSync(npxRoot)) throw new Error("playwright not found; run: npx playwright --version");
  const entries = await readdir(npxRoot);
  for (const entry of entries) {
    const candidate = join(npxRoot, entry, "node_modules", "playwright", "index.mjs");
    if (existsSync(candidate)) return import(pathToFileURL(candidate).href);
  }
  throw new Error("playwright not found in npx cache");
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(tmpDir, { recursive: true });

  const refsMd = await readFile(join(root, "src/pages/brand-collection/references.md"), "utf8");
  const sections = extractReferenceSections(refsMd);
  const cardsTs = await readFile(join(root, "src/lib/brand-collection.ts"), "utf8");
  const cards = loadCardsFromTs(cardsTs);

  const jobs = [];

  for (const card of cards) {
    const section = sections.get(card.anchor) || sections.get(card.id);
    if (!section) {
      console.warn(`skip reference (no section): ${card.id} / ${card.anchor}`);
      continue;
    }
    const body = markdownToHtml(section);
    const html = printDocument({
      title: card.name,
      subtitle: card.notable,
      sourceLabel: card.url
        ? `官方入口：${card.url} · 笔记来源：品牌收集 / 参考清单 #${card.anchor}`
        : `笔记来源：品牌收集 / 参考清单 #${card.anchor}`,
      bodyHtml: body,
    });
    jobs.push({ id: card.id, title: card.name, html });
  }

  for (const study of studies) {
    const raw = await readFile(join(root, study.source), "utf8");
    const body = markdownToHtml(stripFrontmatter(raw));
    const html = printDocument({
      title: study.title,
      subtitle: "AI UP LAB 对标 / 调研笔记（公开资料与官网实测）",
      sourceLabel: `笔记来源：${study.source}`,
      bodyHtml: body,
    });
    jobs.push({ id: study.id, title: study.title, html });
  }

  const playwright = await resolvePlaywright();
  const browser = await playwright.chromium.launch({ channel: "chrome", headless: true });
  const manifest = [];

  for (const job of jobs) {
    const htmlPath = join(tmpDir, `${job.id}.html`);
    const pdfPath = join(outDir, `${job.id}.pdf`);
    await writeFile(htmlPath, job.html, "utf8");
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "16mm", right: "14mm", bottom: "16mm", left: "14mm" },
    });
    await page.close();
    const size = (await stat(pdfPath)).size;
    manifest.push({ id: job.id, title: job.title, path: `brand-collection/pdfs/${job.id}.pdf`, bytes: size });
    console.log(`pdf ${job.id}.pdf (${Math.round(size / 1024)} KB)`);
  }

  await browser.close();
  await writeFile(join(outDir, "manifest.json"), JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2) + "\n");
  console.log(`Wrote ${manifest.length} PDFs to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
