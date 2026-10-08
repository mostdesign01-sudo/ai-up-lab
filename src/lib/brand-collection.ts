/** Public brand-collection pages. Copy is taken from the source notes; do not invent facts here. */
export const brandCollectionCopyright = {
  zh: "素材均来自各品牌公开发布的资料，版权归原品牌所有，仅作学习与参考。",
  en: "Materials come from each brand’s public releases. Copyright stays with the original brand. For study and reference only.",
};

export const brandCollectionPages = [
  { href: "brand-collection/", zh: "总览", en: "Overview" },
  { href: "brand-collection/references/", zh: "参考清单", en: "References" },
  { href: "brand-collection/dewu/", zh: "得物对标", en: "Dewu" },
  { href: "brand-collection/ai-up-lab/", zh: "AI UP LAB 对标", en: "AI UP LAB" },
  { href: "brand-collection/joma/", zh: "JOMA 调研", en: "JOMA" },
  { href: "brand-collection/joma/visual-audit/", zh: "JOMA 视觉", en: "JOMA visuals" },
  { href: "brand-collection/joma/china-ecommerce/", zh: "JOMA 中国电商", en: "JOMA China" },
] as const;

export interface ReferenceCard {
  id: string;
  name: string;
  notable: string;
  /** Anchor on the reference list. */
  anchor: string;
  url?: string;
  logo?: string;
  /** Dark chip for artwork drawn in white. */
  ink?: boolean;
}

/** First grapheme of the display name; Latin letters are uppercased. */
export function brandMonogram(name: string): string {
  const ch = Array.from(name.trim())[0] ?? "";
  return /[a-z]/i.test(ch) ? ch.toUpperCase() : ch;
}

export const referenceGroups: { id: string; title: { zh: string; en: string }; cards: ReferenceCard[] }[] = [
  {
    id: "overseas",
    title: { zh: "海外 AI 品牌", en: "Overseas AI brands" },
    cards: [
      { id: "openai", name: "OpenAI", anchor: "openai", url: "https://openai.com/brand/", notable: "词标优先、Blossom 不作主品牌、禁止变形/效果/商品化；专属字体 OpenAI Sans", logo: "brand-collection/assets/references/openai/openai-wordmark-dark.svg" },
      { id: "anthropic", name: "Anthropic / Claude", anchor: "anthropic", url: "https://www.anthropic.com/news", notable: "偏人文编辑气质；公开侧以媒体包为主，非完整对外 Brand Book 网页", logo: "brand-collection/assets/references/anthropic/anthropic-logo-slate.svg" },
      { id: "gemini", name: "Google Gemini", anchor: "gemini", url: "https://design.google/library/gemini-ai-visual-design", notable: "AI 产品用「软渐变 + 意图动效」建立信任，而不是硬科技冷感", logo: "brand-collection/assets/references/google/gemini-sparkle.svg" },
      { id: "mistral", name: "Mistral AI", anchor: "mistral", url: "https://mistral.ai/brand/", notable: "模型级像素插画系统与 M 符号一体；偏好渐变版徽章", logo: "brand-collection/assets/references/mistral/mistral-icon.png" },
      { id: "elevenlabs", name: "ElevenLabs", anchor: "elevenlabs", url: "https://elevenlabs.io/brand", notable: "子产品分色分图形（Agents 圆/球体、Creative/API 用 Chladni 纹等），适合多产品线 AI 公司参考", logo: "brand-collection/assets/references/elevenlabs/elevenlabs-logo-black.svg" },
      { id: "cursor", name: "Cursor", anchor: "cursor", url: "https://cursor.com/brand", notable: "开发者工具品牌把「立方体」做成可缩放的立体资产系统", logo: "brand-collection/assets/references/cursor/cursor-logo.svg" },
      { id: "runway", name: "Runway", anchor: "runway", url: "https://runway.com/brand-guidelines", notable: "词标独立、禁止把 Symbol 塞进词标或替换字母", logo: "brand-collection/assets/references/runway/runway-logo.png" },
      { id: "huggingface", name: "Hugging Face", anchor: "huggingface", url: "https://huggingface.co/brand", notable: "开源社区友好、资产直接挂 Hub；气质活泼而非「企业冷白皮」", logo: "brand-collection/assets/references/huggingface/huggingface-logo.svg", ink: true },
      { id: "xai", name: "xAI / Grok", anchor: "xai", url: "https://x.ai/legal/brand-guidelines", notable: "偏法律/商标条款型指南，不是视觉系统说明书；注明与 X（Twitter）为不同公司", logo: "brand-collection/assets/references/xai/xai-mark.png" },
      { id: "meta", name: "Meta", anchor: "meta", url: "https://www.meta.com/brand/resources/", notable: "集团级品牌管控严格；未找到「Meta AI」单独完整公开 Brand Book", logo: "brand-collection/assets/references/meta/meta-mark.jpg" },
      { id: "notion", name: "Notion", anchor: "notion", url: "https://notion.notion.site/Media-Kit-205535b1d9c4440497a3d7a2ac096286", notable: "未找到独立「Notion AI」VI；沿用 Notion 母品牌", logo: "brand-collection/assets/references/notion/notion-logo.png" },
    ],
  },
  {
    id: "china",
    title: { zh: "国内 AI 品牌", en: "AI brands in China" },
    cards: [
      { id: "kimi", name: "月之暗面 Kimi", anchor: "kimi", url: "https://www.kimi.ai/zh-hans/resources/kimi-brand", notable: "国内少见的「完整公开 Brand System 网页」——科学人文 + De-coding 质感 + 生成式资产", logo: "brand-collection/assets/references/kimi/kimi-logo.png" },
      { id: "minimax", name: "MiniMax", anchor: "minimax", url: "https://www.minimax.io/brand-vi", notable: "把「生长/生命」做成全链路视觉系统，并给出 AI 出图 Prompt", logo: "brand-collection/assets/references/minimax/minimax-logo-1.webp" },
      { id: "tencent", name: "腾讯", anchor: "tencent", url: "https://www.tencent.com/zh-cn/newsroom/media-resources/brand-and-usage-guides/", notable: "集团级 VI 完整；AI 子品牌规范未公开独立成册", logo: "brand-collection/assets/references/tencent/tencent-logo.png" },
    ],
  },
  {
    id: "systems",
    title: { zh: "网页与设计系统", en: "Web and design systems" },
    cards: [
      { id: "geist", name: "Vercel Geist", anchor: "vercel", url: "https://vercel.com/geist/introduction", notable: "AI 产品（v0）直接挂在同一品牌资产目录；Geist 是「网页级」设计系统标杆", logo: "brand-collection/assets/references/vercel/vercel-logo.png" },
      { id: "linear", name: "Linear", anchor: "linear", url: "https://linear.app/brand", notable: "极简词标+色（Mercury White / Nordic Gray）；可下 Brand Assets zip", logo: "brand-collection/assets/references/linear/linear-wordmark-dark.svg" },
      { id: "carbon", name: "IBM Carbon", anchor: "carbon", url: "https://carbondesignsystem.com/", notable: "企业级组件与无障碍", logo: "brand-collection/assets/references/ibm/ibm-mark.png" },
      { id: "carbon-ai", name: "IBM Carbon for AI", anchor: "carbon-ai", url: "https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai", notable: "AI Label、可解释性、AI 态组件——做「产品内 AI 标识」必看", logo: "brand-collection/assets/references/ibm/carbon-favicon.svg" },
      { id: "fluent", name: "Microsoft Fluent 2", anchor: "fluent", url: "https://fluent2.microsoft.design/", notable: "把 Copilot 当作 Fluent 的 AI 扩展层，强调组件一致性而非独立「炫彩 AI」皮肤", logo: "brand-collection/assets/references/fluent/fluent-logo-light.svg" },
      { id: "material", name: "Google Material 3", anchor: "material", url: "https://m3.material.io/", notable: "动态色、语义角色、动效", logo: "brand-collection/assets/references/google/material-favicon.svg" },
      { id: "stripe", name: "Stripe", anchor: "stripe", url: "https://stripe.com/newsroom/information", notable: "Logo kit / Powered by 徽章；slate & blurple 规则", logo: "brand-collection/assets/references/stripe/stripe-mark.svg" },
      { id: "atlassian", name: "Atlassian Design", anchor: "atlassian", url: "https://atlassian.design/", notable: "企业协作产品规范完整", logo: "brand-collection/assets/references/atlassian/atlassian-mark-192.png" },
      { id: "apple-hig", name: "Apple HIG", anchor: "apple-hig", url: "https://developer.apple.com/design/human-interface-guidelines/", notable: "平台交互与视觉原则", logo: "brand-collection/assets/references/apple/apple-logo.png" },
    ],
  },
];

export const referenceGaps: { name: string; notable: string; anchor: string; url?: string }[] = [
  { name: "Cohere", anchor: "cohere", url: "https://cohere.com/newsroom", notable: "未找到官方公开完整 Brand Book / logo kit 自助页（需走 press）" },
  { name: "Perplexity", anchor: "perplexity", notable: "未找到官方公开规范" },
  { name: "Midjourney", anchor: "midjourney", notable: "未找到官方公开 Brand Guidelines / Brand Kit 页" },
  { name: "Stability AI", anchor: "stability", url: "https://stability.ai/press", notable: "未找到可用的官方公开 Brand Book" },
  { name: "百度 / 文心", anchor: "baidu", url: "https://yiyan.baidu.com/", notable: "文心未找到官方公开独立规范页" },
  { name: "阿里 / 通义 / Qwen", anchor: "alibaba", url: "https://tongyi.aliyun.com/", notable: "未找到官方公开完整 VI 手册" },
  { name: "字节豆包 / 火山引擎", anchor: "doubao", url: "https://www.doubao.com/", notable: "未找到官方公开规范" },
  { name: "DeepSeek", anchor: "deepseek", url: "https://www.deepseek.com/", notable: "未找到官方公开 Brand Guidelines" },
  { name: "智谱", anchor: "zhipu", notable: "未找到可核实的官方公开 Brand Guidelines" },
  { name: "科大讯飞", anchor: "iflytek", url: "https://www.iflytek.com/", notable: "未见完整消费级 AI 产品 Brand Book" },
];

export const benchmarkStudies: { href: string; title: { zh: string; en: string }; line: string; logo?: string; ink?: boolean }[] = [
  { href: "brand-collection/dewu/", title: { zh: "得物 / POIZON 参考对标", en: "Dewu / POIZON benchmark" }, line: "借 AI 品牌的规范方法、资产管理和数字体验，不借它们的「AI 气质」。网页色值来自官网 CSS 实测。", logo: "brand-collection/assets/dewu/dewu-logo-120.webp" },
  { href: "brand-collection/ai-up-lab/", title: { zh: "AI UP LAB 参考对标", en: "AI UP LAB benchmark" }, line: "不重做体系，只记录规范和线上实际不一致的地方，以及规范还没覆盖的触点。", logo: "brand-collection/assets/ai-up-lab/logo.svg" },
  { href: "brand-collection/joma/", title: { zh: "JOMA 品牌调研", en: "JOMA overview" }, line: "公开资料：品牌基本信息、定位口号、中国业务、渠道与赞助、竞品。调研日期 2026-09-09。", logo: "brand-collection/assets/joma/logo-joma-official-header-blue.svg" },
  { href: "brand-collection/joma/visual-audit/", title: { zh: "JOMA 视觉审计", en: "JOMA visual audit" }, line: "标志、色彩、字体、官网视觉；以及升级时可保留与可改之处。", logo: "brand-collection/assets/joma/logo-joma-official-header-blue.svg" },
  { href: "brand-collection/joma/china-ecommerce/", title: { zh: "JOMA 中国电商视觉", en: "JOMA China commerce" }, line: "京东、天猫等中国电商渠道的视觉与文案。调研日期 2026-09-09。", logo: "brand-collection/assets/joma/logo-joma-official-header-blue.svg" },
];
