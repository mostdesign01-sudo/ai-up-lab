import type { APIRoute } from "astro";
import { sections } from "../lib/directory";
import { withBase } from "../lib/paths";
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(withBase(path), site).href;
  return new Response(`# AI UP LAB\n\nPractical AI resources organized by task. Started with Grok Bot cases and now covers workflows, tools, interfaces, models, and prompts across products.\n\n## Directory\n${sections.map(section => `- [${section.title.en}](${url(`${section.id}/`)}): ${section.description.en}`).join("\n")}\n\n## Read and search\n- [Catalog JSON](${url("catalog.json")}): bilingual summaries, section and task membership, original sources, and detail links.\n- [Search](${url("search/")}): keyword, section, task, level, and format filters.\n- [Editorial standards](${url("about/")})\n\n## Brand and interface system\n- [Brand guidelines](${url("brand/")})\n- [Design tokens](${url("brand/tokens.json")})\n- [AI implementation brief](${url("brand/ai-guide.md")})\n\n## Evidence\nEvery entry links to its original source. Dates indicate listing or editorial updates, not successful hands-on testing. Vendor claims and community claims are not independent verification. Check original sources before relying on capabilities or prices.\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
