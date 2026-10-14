// Sentences that read as crawl or verification logs, not as reasons a reader would care about.
// Shared by the split migration and the build lint so new notes stay clean.
export const LOG_PATTERN = new RegExp([
  String.raw`HTTP ?\d{3}`, String.raw`\bgh api\b`, "Algolia", String.raw`\d+\s?pts\b`, String.raw`\d[\d,.]*\s?★`,
  String.raw`\bitem\s?\d{6,}`, String.raw`\bHN\s?\d{6,}`, String.raw`item\?id=`, "https?://",
  "Playwright", "实拍", String.raw`\bcapture\b`, "预览为", "预览即", String.raw`\bPreview (is|was)\b`, "自托管预览", "self-hosted .*preview",
  "community-sync", "最近推送", "last push", "撰写时", "at write time", "at check time", "不打星", String.raw`^Unrated\.?$`,
  "线索", String.raw`^Lead:`, String.raw`T\d{2}:\d{2}`,
].join("|"), "i");
