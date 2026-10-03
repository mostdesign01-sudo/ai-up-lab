import type { APIRoute } from "astro";
import { colorRoles, themes, foundations, designSystemVersion, designSystemUpdatedAt, designRules } from "../../lib/design-system";
export const GET: APIRoute = () => new Response(JSON.stringify({
  brand: "AI UP LAB", version: designSystemVersion, updatedAt: designSystemUpdatedAt,
  format: "AI UP LAB semantic tokens", defaultTheme: "light", themes, foundations,
  cssVariables: Object.fromEntries(colorRoles.map(role => [role.id, { token: `--lab-color-${role.id}`, siteAlias: role.variable }])),
  rules: designRules,
}, null, 2) + "\n", { headers: { "Content-Type": "application/json; charset=utf-8" } });
