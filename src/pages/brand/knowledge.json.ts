import type { APIRoute } from "astro";
import { designKnowledge, designGroups, referenceBase } from "../../lib/design-knowledge";
import { designSystemVersion } from "../../lib/design-system";
import { withBase } from "../../lib/paths";
export const GET: APIRoute = ({site}) => new Response(JSON.stringify({brand:"AI UP LAB",version:designSystemVersion,format:"ai-up-lab-design-knowledge/v1",delivery:"Static JSON and Markdown; no MCP endpoint",reference:referenceBase,groups:designGroups,specs:designKnowledge.map(spec=>({...spec,url:new URL(withBase(`brand/guides/${spec.id}/`),site).href,rules:new URL(withBase(`brand/rules/${spec.id}.md`),site).href,reference:`${referenceBase}#${spec.reference}`}))},null,2),{headers:{"Content-Type":"application/json; charset=utf-8"}});
