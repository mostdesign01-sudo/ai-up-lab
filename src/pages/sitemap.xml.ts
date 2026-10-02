import type { APIRoute } from "astro";
import { entries, sections } from "../lib/directory";
import { withBase } from "../lib/paths";
export const GET: APIRoute = ({ site }) => {
  const routes = new Map<string, string | undefined>([
    ...["", "about/", "brand/", "changelog/", "cases/", "html/", "agent-ui/", "image-prompts/"].map(path => [withBase(path), undefined] as const),
    ...sections.map(section => [withBase(`${section.id}/`), undefined] as const),
    ...entries.map(entry => [entry.href, entry.updatedAt] as const),
  ]);
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const urls = [...routes].map(([href, updated]) => `<url><loc>${escape(new URL(href, site).href)}</loc>${updated ? `<lastmod>${escape(updated)}</lastmod>` : ""}</url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
