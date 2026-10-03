import type { APIRoute } from "astro";
import { designTokenCSS } from "../../lib/design-system";
export const GET: APIRoute = () => new Response(designTokenCSS + "\n", { headers: { "Content-Type": "text/css; charset=utf-8" } });
