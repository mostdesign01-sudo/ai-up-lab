# AI UP LAB

把 AI 用到你的下一件事里。按任务探索教程、工具、界面范例、模型能力和提示词；每条资源附原文链接。

公开站点：https://mostdesign01-sudo.github.io/grokbot-use-cases/

## 目录方向

本站从 Grok Bot 用法起步，逐步扩展为跨产品、跨模型的 AI 实践库。目录围绕稳定需求组织；Grok Bot、Cursor、Claude、具体模型版本留在条目的产品名与标签中，不作为一级目录。

| 一级目录 | 路径 | 收录范围 |
| --- | --- | --- |
| 学习与工作流 | `/learn/` | 入门教程、研究方法、创作流程、Agent 协作与自动化实践 |
| 工具与应用 | `/tools/` | 可直接使用的应用、Skill、插件、开源 Agent 与网页工具 |
| 界面与范例 | `/design/` | 网页与交互参考、组件、模板、可给 Agent 使用的界面范例 |
| 模型与能力 | `/models/` | 模型公告、获取方式、能力变化、评测来源与社区展示 |
| 提示词与素材 | `/prompts/` | 任务配方、图像提示词、设计参考与可复用素材 |

任务是第二层筛选：研究与学习、内容与创作、编程与开发、自动化与协作、业务与运营。未标注任务或难度的资源不会被当作已标注；同一资源可以进入多个目录。

未来的视觉、语音、视频、实时交互和自主 Agent 内容仍按“读者想完成什么”归档。出现足够多的独立资源后，再增加能力标签或子类，不为单个新品开一个一级栏目。

## 现有内容如何迁移

底层五套数据继续独立保存，现有 id、slug、原文链接和收藏键不变。新的展示层在 `src/lib/directory.ts` 汇总它们，`data/directory.json` 保存人工挑出的跨库归属：

- Cases 默认进“学习与工作流”；`caseTools` 中的工具进入“工具与应用”，`casePrompts` 可同时进入“提示词与素材”。新增工具案例请同时更新这张映射表。
- HTML 中 `tool` 类型进“工具与应用”；演示、交互、组件等进“界面与范例”；`htmlLearning`、`htmlPrompts` 补充学习和素材归属。
- Agent UI 进入“界面与范例”。目前条目来自 ThreeUI Community，后续可按来源许可扩展；不要把免费、免登录等当前来源条件推定到未来所有来源。
- Models 进入“模型与能力”；Image Prompts 进入“提示词与素材”。当前图像条目仍明确标注适用模型，目录名称不绑定版本。

`/cases/`、`/html/`、`/agent-ui/`、`/image-prompts/` 及所有详情链接继续可用。历史收藏仍用 `grok:id` 等键，新目录收藏与旧详情页互通。内部 `paths/`、`combos/` 暂不在公开导航展示，并保留 noindex。

## 本地运行与发布

需要 Node.js 20+。

```bash
npm ci
npm run dev
npm run build
npm run preview
```

本地入口为 `http://localhost:4321/grokbot-use-cases/`。GitHub Pages 的项目路径由 `astro.config.mjs` 的 `base` 决定；改仓库名时同步调整它和 `src/lib/site.ts` 的仓库链接。

`.github/workflows/deploy.yml` 在 PR 上构建检查，在 main 推送后部署。新目录通过静态 HTML 发布，不需要服务器、数据库或访问时调用模型。

## 日常编辑

数据与页面分离。每次新增或修订：

1. 选择数据文件：`data/cases.json`、`data/html-items.json`、`data/agent-ui.json`、`data/models.json` 或 `data/image-prompts.json`。
2. 核对原文、获取方式和重要边界。新增的是工具、教程、模型、组件还是提示词？不要把一般资讯塞进教程库。
3. 维护 `meta.updatedAt`、`meta.version`、`meta.count` 和条目日期。日期表示整理时间，不是实测证明。
4. Cases / HTML / Agent UI 要写成对的 `hook` / `hookEn`：一句话说读者能做什么。中文最多 36 字、英文最多 90 字，不放抓取日志、HTTP 状态、互动数字或日期；缺失或格式错误会阻断构建。
5. 必要时更新 `data/directory.json` 的跨库归属。不同来源讲同一个资源时，优先补充已有条目的来源与步骤，避免重复收录。
6. 有界面的条目用真实截图：`public/previews/{id}.webp`；分类插画仅作缺图回退，不能当产品实拍。
7. 更新 `data/changelog.json` 的中英说明，运行 `npm run build` 并检查受影响的页面。

字段说明见 `data/schema.md`、`data/html-schema.md`、`data/agent-ui-schema.md`、`data/models-schema.md`、`data/image-prompts-schema.md`。

### 精选教程的最低内容

优先加厚精选条目，不要求每个薄目录卡都写成教程。向外分享的落地页应说明：是什么、适合谁、准备条件、操作步骤、预期结果、限制和真实来源。Cases 使用可选 `landing` 字段。没有实际运行过，不能写“实测通过”；作者声称与官方声称必须清楚归因。

## AIHOT 借用方向与推进顺序

已对照 [KKKKhazix/AIHOT](https://github.com/KKKKhazix/AIHOT) 的公开架构、提示词、精选评测和接口。当前改版没有引入其代码依赖，也没有同步其线上内容。

1. **本轮已实现：** 读者向目录、五库全站搜索、任务和难度筛选、每页渐进展示、短简介与分类封面、现有内容与收藏兼容、Agent 可读目录和 sitemap。
2. **下一轮：** 人工选 10–20 条精选补齐步骤与边界；补充实际产品标签、任务标签和核验记录。先明确“来源已核对”和“操作实测”的独立字段，不能用模型评分代替。
3. **候选池试点：** 借鉴 AIHOT 的采集 → 去重 → 摘要草稿 → 编辑核验流程，从自行选定的官方 RSS、GitHub Releases 和公开文档开始；候选不直接进入公开目录。暂不需要整个 PostgreSQL / worker 架构。
4. **校准：** 用人工标注的该收／不该收样本比较漏收和误收，再决定评分提示词与门槛。AIHOT 的注意力评分不等于本站的实用性与核验结果。
5. **规模增长后：** 再评估后台、事件归组、预算熔断与完整 AIHOT 自托管；不要先为几百条静态资源迁移整个服务栈。

AIHOT 的代码是 MIT；复制代码或实质部分时保留对应版权和许可，不能沿用它的名称与 Logo。线上服务另受 [使用规则](https://aihot.news/terms) 约束，公开镜像、批量公开再分发、对外商业产品等需书面授权；匿名免 Key 不等于允许公开转载。自己的采集也应遵循各原始来源的许可。

## 读取与检索

首页优先展示精选入门，再进入五个目录和最近更新；主按钮直接跳到精选或最新内容。头部搜索收在“更多”菜单中，不占首页主要位置。菜单支持键盘、Esc 关闭和点击外部关闭，禁用 JavaScript 时仍可展开。

`/search/` 同时搜索五套内容，支持多关键词、目录、任务、难度、内容形式和排序，标题匹配优先。URL 中保留筛选，兼容已有 `?lib=grok`、`?lib=html` 等入口。浏览器先显示 24 条，按需加载更多；禁用 JavaScript 时仍可阅读全部静态条目。

`/catalog.json` 提供统一目录摘要、原文链接和归属，`/llms.txt` 说明 Agent 入口；原有五套 JSON 下载路径继续保留。`/sitemap.xml` 只列公开目录与详情，不包含内部运营路径、搜索或收藏。
