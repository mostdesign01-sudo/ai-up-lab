import type { APIRoute } from "astro";
import { brandMark } from "../../lib/brand";
export const GET: APIRoute = () => new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brandMark.viewBox}" role="img" aria-label="AI UP LAB"><path fill="#f5f2fa" fill-rule="evenodd" d="${brandMark.outline}"/><path fill="#f5f2fa" d="${brandMark.center}"/></svg>\n`, { headers: { "Content-Type": "image/svg+xml; charset=utf-8" } });
