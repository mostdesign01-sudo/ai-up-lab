/** Public umbrella brand. Library names stay separate. */
export const siteName = "AI UP LAB";

export const siteTagline = "面向任务的 AI 实践资源";
export const siteTaglineEn = "AI resources for real tasks";

export const siteDescription =
  "AI UP LAB：按任务探索学习与工作流、工具与应用、界面与范例、模型与能力、提示词与素材。每条附原文链接。";
export const siteDescriptionEn =
  "AI UP LAB: learning, workflows, tools, interfaces, model capabilities, and prompts, organized around your tasks. Every entry links to its source.";

/** Public source repo for this site. The GitHub-star CTA points here; it is unrelated to curator ★ or visitor ☆. */
export const repoSlug = "mostdesign01-sudo/ai-up-lab";
export const repoUrl = `https://github.com/${repoSlug}`;
/** Unauthenticated public endpoint used only to paint the live stargazer count client-side. */
export const repoApiUrl = `https://api.github.com/repos/${repoSlug}`;

export function pageTitle(page?: string) {
  return page ? `${page} · ${siteName}` : siteName;
}
