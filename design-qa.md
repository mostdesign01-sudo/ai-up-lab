# AI UP LAB design studio — visual QA

Source visual truth: `/workspace/grokbot-use-cases-review/tmall-reference/home-1440.png` and `tmall-reference/style-component-button.png`.
Implementation: `/workspace/grokbot-use-cases-review/studio-overview-1440-light.png`, `studio-buttons-1440.png`, and overview captures at 320/390/768px in both themes.
Viewport: source and desktop implementation 1440 × 1000 CSS px, screenshots 1440 × 1000 pixels, deviceScaleFactor 1. Comparisons join unscaled captures into 2880 × 1000 images.
State: loaded homepage and button guide; Chinese/light implementation versus English/light reference. This is a visual adaptation, not a pixel clone.

Full-view comparison evidence: `studio-comparison-home.png` and `studio-comparison-buttons.png` in the review directory. Source and implementation were opened together as joined comparisons.
Focused comparison: `studio-comparison-specimen.png`, 2000 × 450 pixels, source and implementation cropped at native scale around the specimen and rule toolbar.

## Findings and required surfaces

- Typography: source uses restrained Roboto/Roboto Mono; implementation retains the approved Geist/system CJK and IBM Plex Mono. Large editorial display creates homepage hierarchy, while navigation and captions stay quiet. Chinese body text remains readable at mobile widths. This brand-specific adaptation is intentional.
- Spacing/layout: quiet persistent left navigation, open main column, fine dividers, low-radius demonstration surfaces, and generous specimen space follow the reference. The existing global resource navigation remains available. The homepage introduces content above the fold rather than copying the reference’s full-screen video. This serves the earlier content-first requirement.
- Colors: neutral surfaces and black type retain the reference’s restraint; violet uses AI UP LAB’s actual semantic tokens. Dark mode preserves the existing palette. Status labels and disabled/busy states remain distinct.
- Images: an original raster glass/black sculpture interprets the existing brand triangle. It is conceptual hero art, not a replacement logo. The supplied shared Logo remains unchanged. The compressed WebP is 68,852 bytes and renders successfully at all checked widths. Type, color, and button specimens are actual rendered UI, not decorative illustration substitutes.
- Content: bilingual titles, real routes, existing parameters, complete rules, source links, and working exports remain available. Visual copy identifies the design system and gives clear next actions.
- Icons: existing Phosphor icon component and supplied BrandMark retained. No replacement icon artwork added.

## Comparison history

1. [P2] Initial mobile display text used a fixed 58px scale that could crowd 320px. Changed to a 44–58px viewport-based scale, then captured 320px and verified no horizontal overflow.
2. [P2] Initial tablet hero overlaid faint artwork behind copy. Changed 701–1050px to a stacked, fully opaque image with its caption. Post-fix 768px browser capture confirms separated text and artwork.
3. [P2] At 320px the hero crop clipped the sculpture’s right edge. Shifted the mobile crop to 80% horizontal position and recaptured 320/390px.
4. Post-fix comparisons found no actionable P0/P1/P2 issues. Global header, localized content, violet identity, static hero, and real interactive specimens are intentional differences from the reference.

## Verification

Browser-rendered with Playwright/Chromium, local Astro preview at port 4322.
- Overview: 320/390/768/1440px, both themes, both languages, loaded art, collapsed mobile directory, showcase button, no overflow.
- Ten guide pages: bilingual layouts at 320/390/768/1440px, current navigation, copy/Markdown download, busy state, retry/empty states, keyboard Escape, unchecked checklist/reset, task brief editing/copy/download.
- New rule dock: rule and AI anchors navigate to their sections.
- Overview regression: six downloads, theme/color clipboard, language persistence, focus, no-JavaScript reading.
- Build: 460 pages; 324 resources, source mappings, rule dependencies, tokens and SVG consistency verified.
- Browser console/page errors: none observed.

## Follow-up polish

P3: The reference includes a looping video. This version uses a lightweight static sculpture; optional motion can be explored after the visual direction is reviewed.

final result: passed
