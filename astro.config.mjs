import { defineConfig } from "astro/config";

const base = "/grokbot-use-cases";

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
        const onDark = /(?:wordmark-dark|logo-inverse)\./i.test(href);
        node.properties.className = onDark ? ["bc-figure", "is-on-dark"] : ["bc-figure"];
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
