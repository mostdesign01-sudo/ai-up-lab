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
    walk(tree, (node) => {
      if (node.type === "raw" && typeof node.value === "string" && node.value.includes('="/brand-collection/')) {
        node.value = node.value.replaceAll('="/brand-collection/', `="${base}/brand-collection/`);
      }
      if (node.type !== "element") return;
      for (const key of ["src", "href"]) {
        const value = node.properties?.[key];
        if (typeof value === "string" && value.startsWith("/brand-collection/")) {
          node.properties[key] = base + value;
        }
      }
    });
    for (const node of links) {
      const href = String(node.properties?.href ?? "");
      if (/^https?:/i.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
      const classes = node.properties?.className;
      const classList = Array.isArray(classes) ? classes : classes ? [classes] : [];
      if (classList.includes("bc-figure")) continue;
      if (href.includes("/brand-collection/assets/") && image.test(href)) {
        const label = textOf(node).trim();
        const onDark = /(?:wordmark-dark|logo-inverse)\./i.test(href);
        const cover = /-preview\./i.test(href);
        const mark = /-placeholder\./i.test(href);
        node.properties.className = ["bc-figure", onDark && "is-on-dark", cover && "is-cover", mark && "is-mark"].filter(Boolean);
        const img = { src: href, alt: label, loading: "lazy", decoding: "async" };
        if (cover || mark) {
          img.width = 1440;
          img.height = 900;
        }
        node.children = [
          { type: "element", tagName: "img", properties: img, children: [] },
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
