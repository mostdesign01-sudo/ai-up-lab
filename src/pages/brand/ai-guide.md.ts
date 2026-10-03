import type { APIRoute } from "astro";
import { aiGuide } from "../../lib/design-system";
export const GET: APIRoute = () => new Response(aiGuide, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
