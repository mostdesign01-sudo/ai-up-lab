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
  /** light: white chip for dark artwork. plain: the file already includes its background. */
  well?: "light" | "plain";
  /** 16:10 visual. cover = page screenshot; mark = logo or name tile. */
  preview: string;
  previewAlt: string;
  previewFit?: "cover" | "mark";
}

export const referenceGroups: { id: string; title: { zh: string; en: string }; cards: ReferenceCard[] }[] = [
  {
    id: "overseas",
    title: { zh: "海外 AI 品牌", en: "Overseas AI brands" },
    cards: [
      { id: "openai", name: "OpenAI", anchor: "openai", url: "https://openai.com/brand/", notable: "词标优先、Blossom 不作主品牌、禁止变形/效果/商品化；专属字体 OpenAI Sans", logo: "brand-collection/assets/references/openai/openai-blossom-light.svg", well: "light", preview: "brand-collection/assets/references/openai/openai-blossom-light.svg", previewAlt: "OpenAI 官方 Blossom 标志", previewFit: "mark" },
      { id: "anthropic", name: "Anthropic / Claude", anchor: "anthropic", url: "https://www.anthropic.com/news", notable: "偏人文编辑气质；公开侧以媒体包为主，非完整对外 Brand Book 网页", preview: "brand-collection/assets/references/anthropic/anthropic-preview.webp", previewAlt: "Anthropic 新闻与媒体页预览" },
      { id: "gemini", name: "Google Gemini", anchor: "gemini", url: "https://design.google/library/gemini-ai-visual-design", notable: "AI 产品用「软渐变 + 意图动效」建立信任，而不是硬科技冷感", preview: "brand-collection/assets/references/gemini/gemini-preview.webp", previewAlt: "Google Gemini 视觉设计页预览" },
      { id: "mistral", name: "Mistral AI", anchor: "mistral", url: "https://mistral.ai/brand/", notable: "模型级像素插画系统与 M 符号一体；偏好渐变版徽章", preview: "brand-collection/assets/references/mistral/mistral-preview.webp", previewAlt: "Mistral AI 品牌资产页预览" },
      { id: "elevenlabs", name: "ElevenLabs", anchor: "elevenlabs", url: "https://elevenlabs.io/brand", notable: "子产品分色分图形（Agents 圆/球体、Creative/API 用 Chladni 纹等），适合多产品线 AI 公司参考", logo: "brand-collection/assets/references/elevenlabs/elevenlabs-logo-black.svg", well: "light", preview: "brand-collection/assets/references/elevenlabs/elevenlabs-preview.webp", previewAlt: "ElevenLabs 品牌规范页预览" },
      { id: "cursor", name: "Cursor", anchor: "cursor", url: "https://cursor.com/brand", notable: "开发者工具品牌把「立方体」做成可缩放的立体资产系统", logo: "brand-collection/assets/references/cursor/cursor-logo.svg", well: "plain", preview: "brand-collection/assets/references/cursor/cursor-preview.webp", previewAlt: "Cursor 品牌规范页预览" },
      { id: "runway", name: "Runway", anchor: "runway", url: "https://runway.com/brand-guidelines", notable: "词标独立、禁止把 Symbol 塞进词标或替换字母", preview: "brand-collection/assets/references/runway/runway-preview.webp", previewAlt: "Runway 品牌规范页预览" },
      { id: "huggingface", name: "Hugging Face", anchor: "huggingface", url: "https://huggingface.co/brand", notable: "开源社区友好、资产直接挂 Hub；气质活泼而非「企业冷白皮」", logo: "brand-collection/assets/references/huggingface/huggingface-logo.svg", well: "light", preview: "brand-collection/assets/references/huggingface/huggingface-preview.webp", previewAlt: "Hugging Face 品牌资产页预览" },
      { id: "xai", name: "xAI / Grok", anchor: "xai", url: "https://x.ai/legal/brand-guidelines", notable: "偏法律/商标条款型指南，不是视觉系统说明书；注明与 X（Twitter）为不同公司", preview: "brand-collection/assets/references/xai/xai-preview.webp", previewAlt: "xAI 品牌指南页预览" },
      { id: "meta", name: "Meta", anchor: "meta", url: "https://www.meta.com/brand/resources/", notable: "集团级品牌管控严格；未找到「Meta AI」单独完整公开 Brand Book", preview: "brand-collection/assets/references/meta/meta-preview.webp", previewAlt: "Meta 品牌资源中心预览" },
      { id: "notion", name: "Notion", anchor: "notion", url: "https://notion.notion.site/Media-Kit-205535b1d9c4440497a3d7a2ac096286", notable: "未找到独立「Notion AI」VI；沿用 Notion 母品牌", preview: "brand-collection/assets/references/notion/notion-preview.webp", previewAlt: "Notion 官网首页预览" },
    ],
  },
  {
    id: "china",
    title: { zh: "国内 AI 品牌", en: "AI brands in China" },
    cards: [
      { id: "kimi", name: "月之暗面 Kimi", anchor: "kimi", url: "https://www.kimi.ai/zh-hans/resources/kimi-brand", notable: "国内少见的「完整公开 Brand System 网页」——科学人文 + De-coding 质感 + 生成式资产", preview: "brand-collection/assets/references/kimi/kimi-preview.webp", previewAlt: "Kimi 品牌页预览" },
      { id: "minimax", name: "MiniMax", anchor: "minimax", url: "https://www.minimax.io/brand-vi", notable: "把「生长/生命」做成全链路视觉系统，并给出 AI 出图 Prompt", preview: "brand-collection/assets/references/minimax/minimax-preview.webp", previewAlt: "MiniMax 品牌视觉页预览" },
      { id: "tencent", name: "腾讯", anchor: "tencent", url: "https://www.tencent.com/zh-cn/newsroom/media-resources/brand-and-usage-guides/", notable: "集团级 VI 完整；AI 子品牌规范未公开独立成册", preview: "brand-collection/assets/references/tencent/tencent-preview.webp", previewAlt: "腾讯品牌和使用指南页预览" },
    ],
  },
  {
    id: "systems",
    title: { zh: "网页与设计系统", en: "Web and design systems" },
    cards: [
      { id: "geist", name: "Vercel Geist", anchor: "vercel", url: "https://vercel.com/geist/introduction", notable: "AI 产品（v0）直接挂在同一品牌资产目录；Geist 是「网页级」设计系统标杆", preview: "brand-collection/assets/references/vercel/vercel-preview.webp", previewAlt: "Vercel Geist 设计系统页预览" },
      { id: "linear", name: "Linear", anchor: "linear", url: "https://linear.app/brand", notable: "极简词标+色（Mercury White / Nordic Gray）；可下 Brand Assets zip", preview: "brand-collection/assets/references/linear/linear-preview.webp", previewAlt: "Linear 品牌页预览" },
      { id: "carbon", name: "IBM Carbon", anchor: "carbon", url: "https://carbondesignsystem.com/", notable: "企业级组件与无障碍", preview: "brand-collection/assets/references/carbon/carbon-preview.webp", previewAlt: "IBM Carbon 设计系统首页预览" },
      { id: "carbon-ai", name: "IBM Carbon for AI", anchor: "carbon-ai", url: "https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai", notable: "AI Label、可解释性、AI 态组件——做「产品内 AI 标识」必看", preview: "brand-collection/assets/references/carbon-ai/carbon-ai-preview.webp", previewAlt: "IBM Carbon for AI 页面预览" },
      { id: "fluent", name: "Microsoft Fluent 2", anchor: "fluent", url: "https://fluent2.microsoft.design/", notable: "把 Copilot 当作 Fluent 的 AI 扩展层，强调组件一致性而非独立「炫彩 AI」皮肤", preview: "brand-collection/assets/references/fluent/fluent-preview.webp", previewAlt: "Microsoft Fluent 2 设计系统页预览" },
      { id: "material", name: "Google Material 3", anchor: "material", url: "https://m3.material.io/", notable: "动态色、语义角色、动效", preview: "brand-collection/assets/references/material/material-preview.webp", previewAlt: "Google Material 3 页面预览" },
      { id: "stripe", name: "Stripe", anchor: "stripe", url: "https://stripe.com/newsroom/information", notable: "Logo kit / Powered by 徽章；slate & blurple 规则", logo: "brand-collection/assets/references/stripe/stripe-powered-by.svg", well: "light", preview: "brand-collection/assets/references/stripe/stripe-preview.webp", previewAlt: "Stripe 新闻室资料页预览" },
      { id: "atlassian", name: "Atlassian Design", anchor: "atlassian", url: "https://atlassian.design/", notable: "企业协作产品规范完整", preview: "brand-collection/assets/references/atlassian/atlassian-preview.webp", previewAlt: "Atlassian Design 首页预览" },
      { id: "apple-hig", name: "Apple HIG", anchor: "apple-hig", url: "https://developer.apple.com/design/human-interface-guidelines/", notable: "平台交互与视觉原则", preview: "brand-collection/assets/references/apple-hig/apple-hig-preview.webp", previewAlt: "Apple 人机界面指南页预览" },
    ],
  },
];

export const referenceGaps: { name: string; notable: string; anchor: string; url?: string; preview: string; previewAlt: string; previewFit?: "cover" | "mark" }[] = [
  { name: "Cohere", anchor: "cohere", url: "https://cohere.com/newsroom", notable: "未找到官方公开完整 Brand Book / logo kit 自助页（需走 press）", preview: "brand-collection/assets/references/cohere/cohere-preview.webp", previewAlt: "Cohere 新闻室预览" },
  { name: "Perplexity", anchor: "perplexity", url: "https://www.perplexity.ai/", notable: "未找到官方公开规范", preview: "brand-collection/assets/references/perplexity/perplexity-preview.webp", previewAlt: "Perplexity 官网首页预览" },
  { name: "Midjourney", anchor: "midjourney", url: "https://www.midjourney.com/", notable: "未找到官方公开 Brand Guidelines / Brand Kit 页", preview: "brand-collection/assets/references/midjourney/midjourney-preview.webp", previewAlt: "Midjourney 官网首页预览" },
  { name: "Stability AI", anchor: "stability", url: "https://stability.ai/press", notable: "未找到可用的官方公开 Brand Book", preview: "brand-collection/assets/references/stability/stability-preview.webp", previewAlt: "Stability AI 官网首页预览" },
  { name: "百度 / 文心", anchor: "baidu", url: "https://yiyan.baidu.com/", notable: "文心未找到官方公开独立规范页", preview: "brand-collection/assets/references/baidu/baidu-preview.webp", previewAlt: "文心一言产品页预览" },
  { name: "阿里 / 通义 / Qwen", anchor: "alibaba", url: "https://tongyi.aliyun.com/", notable: "未找到官方公开完整 VI 手册", preview: "brand-collection/assets/references/tongyi/tongyi-preview.webp", previewAlt: "千问官网首页预览" },
  { name: "字节豆包 / 火山引擎", anchor: "doubao", url: "https://www.doubao.com/", notable: "未找到官方公开规范", preview: "brand-collection/assets/references/doubao/doubao-preview.webp", previewAlt: "火山引擎官网首页预览" },
  { name: "DeepSeek", anchor: "deepseek", url: "https://www.deepseek.com/", notable: "未找到官方公开 Brand Guidelines", preview: "brand-collection/assets/references/deepseek/deepseek-preview.webp", previewAlt: "DeepSeek 官网首页预览" },
  { name: "智谱", anchor: "zhipu", url: "https://www.zhipuai.cn/", notable: "未找到可核实的官方公开 Brand Guidelines", preview: "brand-collection/assets/references/zhipu/zhipu-preview.webp", previewAlt: "智谱官网首页预览" },
  { name: "科大讯飞", anchor: "iflytek", url: "https://www.iflytek.com/", notable: "未见完整消费级 AI 产品 Brand Book", preview: "brand-collection/assets/references/iflytek/iflytek-preview.webp", previewAlt: "科大讯飞官网首页预览" },
];

export const benchmarkStudies: { href: string; title: { zh: string; en: string }; line: string; logo?: string; well?: "light" | "plain"; preview: string; previewAlt: string; previewFit?: "cover" | "mark" }[] = [
  { href: "brand-collection/dewu/", title: { zh: "得物 / POIZON 参考对标", en: "Dewu / POIZON benchmark" }, line: "借 AI 品牌的规范方法、资产管理和数字体验，不借它们的「AI 气质」。网页色值来自官网 CSS 实测。", logo: "brand-collection/assets/dewu/dewu-logo-120.webp", well: "light", preview: "brand-collection/assets/dewu/dewu-home-1440.webp", previewAlt: "得物官网首页预览" },
  { href: "brand-collection/ai-up-lab/", title: { zh: "AI UP LAB 参考对标", en: "AI UP LAB benchmark" }, line: "不重做体系，只记录规范和线上实际不一致的地方，以及规范还没覆盖的触点。", logo: "brand-collection/assets/ai-up-lab/logo.svg", well: "light", preview: "brand-collection/assets/ai-up-lab/home-1440.webp", previewAlt: "AI UP LAB 首页预览" },
  { href: "brand-collection/joma/", title: { zh: "JOMA 品牌调研", en: "JOMA overview" }, line: "公开资料：品牌基本信息、定位口号、中国业务、渠道与赞助、竞品。调研日期 2026-09-09。", logo: "brand-collection/assets/joma/logo-joma-official-header-blue.svg", well: "light", preview: "brand-collection/assets/joma/joma-sport-preview.webp", previewAlt: "JOMA 官网首页预览" },
  { href: "brand-collection/joma/visual-audit/", title: { zh: "JOMA 视觉审计", en: "JOMA visual audit" }, line: "标志、色彩、字体、官网视觉；以及升级时可保留与可改之处。", logo: "brand-collection/assets/joma/logo-joma-favicon-official-196.webp", well: "light", preview: "brand-collection/assets/joma/carousel-football-restyling-26.webp", previewAlt: "JOMA 足球品类官网海报" },
  { href: "brand-collection/joma/china-ecommerce/", title: { zh: "JOMA 中国电商视觉", en: "JOMA China commerce" }, line: "京东、天猫等中国电商渠道的视觉与文案。调研日期 2026-09-09。", logo: "brand-collection/assets/joma/logo-joma-official-header-blue.svg", well: "light", preview: "brand-collection/assets/joma/china-ecommerce/12-tmall-liga-t1-main-alicdn.webp", previewAlt: "JOMA 天猫商品主图" },
];
