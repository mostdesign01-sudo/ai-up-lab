import { defineConfig } from "astro/config";

const base = "/ai-up-lab";

function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

function textOf(node) {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

/** Root-relative asset links in this section pick up the GitHub Pages base. */
function prefixBrandCollectionAssets() {
  return (tree) => {
    walk(tree, (node) => {
      if ((node.type === "link" || node.type === "image") && typeof node.url === "string" && node.url.startsWith("/brand-collection/")) {
        node.url = base + node.url;
      }
    });
  };
}

/** Marks sit in a chip; specimen sheets and photography use a shot frame. */
function brandCollectionFigureClass(href) {
  const file = href.split("/").pop() ?? "";
  const shot = /openai-blossom|openai-wordmark|cursor-logo\.svg|history|evolution|1000logos|logos-world|emblem-eagle|runway-dont|china-ecommerce\//i.test(href);
  if (shot) {
    return /openai-wordmark-dark\.svg/i.test(href) ? ["bc-figure", "is-shot", "is-on-dark"] : ["bc-figure", "is-shot"];
  }
  if (/logo|wordmark|icon|favicon|powered-by/i.test(file)) {
    const ink = /(?:^|\/)huggingface-logo\.svg$/i.test(href) || /logo-inverse\./i.test(file);
    return ink ? ["bc-figure", "is-mark", "is-ink"] : ["bc-figure", "is-mark"];
  }
  return ["bc-figure", "is-shot"];
}

/** Open external notes in a new tab, and show hosted images instead of bare file links. */
function brandCollectionLinkAttrs() {
  const image = /\.(?:svg|webp|png|jpe?g|gif)(?:\?.*)?$/i;
  return (tree) => {
    const links = [];
    walk(tree, (node) => {
      if (node.type === "element" && node.tagName === "a") links.push(node);
    });
    for (const node of links) {
      const href = String(node.properties?.href ?? "");
      if (/^https?:/i.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
      if (href.includes("/brand-collection/assets/") && image.test(href)) {
        const label = textOf(node).trim();
        node.properties.className = brandCollectionFigureClass(href);
        node.children = [
          { type: "element", tagName: "img", properties: { src: href, alt: label, loading: "lazy", decoding: "async" }, children: [] },
          { type: "element", tagName: "span", properties: { className: ["bc-figure-label"] }, children: [{ type: "text", value: label }] },
        ];
      }
    }
  };
}

export default defineConfig({
  site: "https://mostdesign01-sudo.github.io",
  base,
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [prefixBrandCollectionAssets],
    rehypePlugins: [brandCollectionLinkAttrs],
  },
});
