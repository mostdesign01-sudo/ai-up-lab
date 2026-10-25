import type { APIRoute } from "astro";
import { entries } from "../lib/directory";
import { withBase } from "../lib/paths";
import { siteDescription, siteName } from "../lib/site";

const LIMIT = 60;
const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Newest listings across all five libraries, for feed readers and newsletter tools. */
export const GET: APIRoute = ({ site }) => {
  const home = new URL(withBase("/"), site).href;
  const items = entries.slice(0, LIMIT).map(entry => {
    const link = new URL(entry.href, site).href;
    return `    <item>
      <title>${escape(entry.title.zh)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(entry.updatedAt).toUTCString()}</pubDate>
      <category>${escape(entry.kind.zh)}</category>
      <description>${escape(entry.line.zh)}</description>
    </item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${home}</link>
    <atom:link href="${new URL(withBase("rss.xml"), site).href}" rel="self" type="application/rss+xml" />
    <description>${escape(siteDescription)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date(entries[0]?.updatedAt ?? Date.now()).toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
