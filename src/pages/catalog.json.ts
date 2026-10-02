import type { APIRoute } from "astro";
import { entries, sections, tasks } from "../lib/directory";
export const GET: APIRoute = () => new Response(JSON.stringify({
  schemaVersion: 1,
  sections: sections.map(({ id, title, description }) => ({ id, title, description })),
  tasks: tasks.map(({ id, title }) => ({ id, title })),
  entries: entries.map(({ key, lib, id, href, title, line, sections, tasks, sourceUrl, updatedAt, difficulty }) => ({ key, lib, id, href, title, summary: line, sections, tasks, sourceUrl, updatedAt, difficulty })),
}), { headers: { "Content-Type": "application/json; charset=utf-8" } });
