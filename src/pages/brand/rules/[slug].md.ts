import type { APIRoute } from "astro";
import { designKnowledge, specMarkdown } from "../../../lib/design-knowledge";
export function getStaticPaths() { return designKnowledge.map(spec=>({params:{slug:spec.id},props:{spec}})); }
export const GET: APIRoute = ({props}) => new Response(specMarkdown(props.spec),{headers:{"Content-Type":"text/markdown; charset=utf-8"}});
