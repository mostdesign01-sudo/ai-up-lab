(() => {
  const root = document.querySelector("[data-image-bench]");
  if (!root) return;

  const sampleSrc = root.getAttribute("data-sample") || "";
  const MODELS = {
    modnet: {
      id: "Xenova/modnet",
      dtype: "q8",
      label: { zh: "MODNet", en: "MODNet" },
    },
    birefnet: {
      id: "studioludens/birefnet-lite-512",
      dtype: "fp32",
      label: { zh: "BiRefNet_lite", en: "BiRefNet_lite" },
    },
  };
  const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.1";
  const WASM_PATHS = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.31.0-dev.20260914-8d85527a0/dist/";
  const UPSCALER_URL = "https://cdn.jsdelivr.net/npm/upscaler@1.0.0/+esm";
  const ESRGAN_URL = "https://cdn.jsdelivr.net/npm/@upscalerjs/esrgan-slim@1.0.0/2x/+esm";
  const MAX_EDGE = 1024;

  const stage = root.querySelector("[data-stage]");
  const statusEl = root.querySelector("[data-status]");
  const metaEl = root.querySelector("[data-meta]");
  const downloadBtn = root.querySelector("[data-download]");
  const cutoutBtn = root.querySelector("[data-cutout]");
  const upscaleBtn = root.querySelector("[data-upscale]");
  const fileInput = root.querySelector("[data-file]");
  const bgFile = root.querySelector("[data-bg-file]");
  const colorInput = root.querySelector("[data-color]");

  const state = {
    source: null,
    cutout: null,
    backgroundImage: null,
    upscaled: null,
    busy: false,
    key: "ready",
    detail: "",
  };

  const copy = {
    ready: {
      zh: "示例图已载入。抠图、换背景和放大都在这台设备上完成。",
      en: "Sample loaded. Cutout, background, and upscale all run on this device.",
    },
    loadingImage: { zh: "正在读取图片。", en: "Reading the image." },
    downloading: { zh: "正在下载模型。", en: "Downloading the model." },
    running: { zh: "正在抠图。", en: "Cutting out the subject." },
    cutoutDone: { zh: "抠图完成。可以换背景或放大。", en: "Cutout ready. Replace the background or upscale." },
    cutoutWeak: {
      zh: "抠图完成，但背景几乎没被拿掉。换一张主体更清晰的图，或改用 BiRefNet_lite。",
      en: "Cutout finished, but almost no background was removed. Try a clearer subject, or switch to BiRefNet_lite.",
    },
    upscaling: { zh: "正在放大。", en: "Upscaling." },
    upscaleDone: { zh: "放大完成。可以下载 PNG。", en: "Upscale ready. Download the PNG." },
    error: { zh: "这一步没有完成。", en: "This step did not finish." },
  };

  let transformersPromise = null;
  const cutters = new Map();
  let upscalerPromise = null;

  function locale() {
    return document.documentElement.dataset.locale === "en" ? "en" : "zh";
  }

  function say(key, detail = "") {
    state.key = key;
    state.detail = detail;
    const line = copy[key] ? copy[key][locale()] : key;
    statusEl.textContent = detail ? `${line} ${detail}` : line;
  }

  function setBusy(busy) {
    state.busy = busy;
    root.toggleAttribute("data-busy", busy);
    for (const control of root.querySelectorAll("button, input")) control.disabled = busy;
    if (!busy) downloadBtn.disabled = !state.source;
  }

  function selectedModel() {
    const picked = root.querySelector("[name='cutout-model']:checked");
    return MODELS[picked?.value] || MODELS.modnet;
  }

  function backgroundMode() {
    return root.querySelector("[name='bg-mode']:checked")?.value || "clear";
  }

  function fitCanvas(image, maxEdge) {
    const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(locale() === "en" ? "Could not read that image." : "这张图读不出来。"));
      image.src = src;
    });
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error(locale() === "en" ? "Could not read that file." : "这个文件读不出来。"));
      reader.readAsDataURL(file);
    });
  }

  function rawToCanvas(image) {
    if (image && typeof image.toCanvas === "function") return image.toCanvas();
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    const rgba = new Uint8ClampedArray(image.width * image.height * 4);
    const data = image.data;
    if (image.channels === 4) {
      rgba.set(data);
    } else if (image.channels === 1) {
      for (let i = 0; i < data.length; i += 1) {
        const p = i * 4;
        rgba[p] = rgba[p + 1] = rgba[p + 2] = data[i];
        rgba[p + 3] = 255;
      }
    } else {
      for (let i = 0, p = 0; i < data.length; i += image.channels, p += 4) {
        rgba[p] = data[i];
        rgba[p + 1] = data[i + 1];
        rgba[p + 2] = data[i + 2];
        rgba[p + 3] = 255;
      }
    }
    ctx.putImageData(new ImageData(rgba, image.width, image.height), 0, 0);
    return canvas;
  }

  function alphaStats(canvas) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let edge = 0;
    const pixels = canvas.width * canvas.height;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 16) clear += 1;
      else if (data[i] < 240) edge += 1;
    }
    return { clear: clear / pixels, edge: edge / pixels };
  }

  function drawCover(ctx, image, width, height) {
    const scale = Math.max(width / image.width, height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
  }

  function compose() {
    const foreground = state.cutout || state.source;
    if (!foreground) return null;
    const canvas = document.createElement("canvas");
    canvas.width = foreground.width;
    canvas.height = foreground.height;
    const ctx = canvas.getContext("2d");
    const mode = backgroundMode();
    if (mode === "color") {
      ctx.fillStyle = colorInput.value || "#f4f1ea";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (mode === "image" && state.backgroundImage) {
      drawCover(ctx, state.backgroundImage, canvas.width, canvas.height);
    }
    ctx.drawImage(foreground, 0, 0);
    return canvas;
  }

  function visibleCanvas() {
    if (state.upscaled) return state.upscaled;
    return compose();
  }

  function paint() {
    const canvas = visibleCanvas();
    stage.replaceChildren();
    if (!canvas) return;
    canvas.className = "bench-canvas";
    canvas.setAttribute("role", "img");
    const label = locale() === "en" ? "Edited image" : "处理后的图片";
    canvas.setAttribute("aria-label", label);
    stage.append(canvas);
    const model = selectedModel();
    const size = `${canvas.width}×${canvas.height}`;
    metaEl.textContent = `${model.label[locale()]} · ${size}`;
    downloadBtn.disabled = state.busy;
  }

  async function useSource(image, resetCutout) {
    state.source = fitCanvas(image, MAX_EDGE);
    if (resetCutout) {
      state.cutout = null;
      state.upscaled = null;
    }
    paint();
  }

  async function loadSample() {
    say("loadingImage");
    const image = await loadImage(sampleSrc);
    await useSource(image, true);
    say("ready");
  }

  function loadTransformers() {
    if (!transformersPromise) {
      transformersPromise = import(TRANSFORMERS_URL).then((mod) => {
        mod.env.allowLocalModels = false;
        mod.env.useBrowserCache = true;
        mod.env.backends.onnx.wasm.wasmPaths = WASM_PATHS;
        mod.env.backends.onnx.wasm.numThreads = 1;
        return mod;
      });
    }
    return transformersPromise;
  }

  function progressText(info) {
    if (!info || typeof info !== "object") return "";
    const status = info.status || "";
    if (status === "progress" && typeof info.progress === "number") {
      const pct = Math.round(info.progress);
      const file = info.file ? ` ${info.file}` : "";
      return locale() === "en" ? `${pct}%${file}` : `${pct}%${file}`;
    }
    if (status === "initiate" || status === "download") {
      return info.file || "";
    }
    if (status === "ready" || status === "done") {
      return locale() === "en" ? "weights ready" : "权重已就绪";
    }
    return "";
  }

  async function getCutter(model) {
    const key = `${model.id}:${model.dtype}`;
    if (!cutters.has(key)) {
      const pending = (async () => {
        const { pipeline } = await loadTransformers();
        return pipeline("background-removal", model.id, {
          dtype: model.dtype,
          device: "wasm",
          progress_callback: (info) => {
            const extra = progressText(info);
            if (info?.status === "progress" || info?.status === "download" || info?.status === "initiate") {
              say("downloading", extra);
            }
          },
        });
      })();
      cutters.set(key, pending);
    }
    return cutters.get(key);
  }

  async function runCutout() {
    if (!state.source || state.busy) return;
    const model = selectedModel();
    setBusy(true);
    state.upscaled = null;
    say("downloading", model.label[locale()]);
    try {
      const segmenter = await getCutter(model);
      say("running");
      const blob = await new Promise((resolve) => state.source.toBlob(resolve, "image/png"));
      const url = URL.createObjectURL(blob);
      let output;
      try {
        output = await segmenter(url);
      } finally {
        URL.revokeObjectURL(url);
      }
      const image = Array.isArray(output) ? output[0] : output;
      state.cutout = rawToCanvas(image);
      const stats = alphaStats(state.cutout);
      paint();
      const removed = Math.round(stats.clear * 100);
      const detail = locale() === "en" ? `Background cleared about ${removed}%.` : `背景大约清掉 ${removed}%。`;
      say(stats.clear < 0.02 && stats.edge < 0.01 ? "cutoutWeak" : "cutoutDone", detail);
    } catch (error) {
      console.error(error);
      say("error", error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
      paint();
    }
  }

  function loadUpscaler() {
    if (!upscalerPromise) {
      upscalerPromise = Promise.all([import(UPSCALER_URL), import(ESRGAN_URL)]).then(([upscalerMod, modelMod]) => {
        const Upscaler = upscalerMod.default;
        const model = modelMod.default;
        return new Upscaler({ model });
      });
    }
    return upscalerPromise;
  }

  async function runUpscale() {
    const base = compose();
    if (!base || state.busy) return;
    setBusy(true);
    say("upscaling");
    try {
      const mode = backgroundMode();
      let input = base;
      if (mode === "clear" || (mode === "image" && !state.backgroundImage)) {
        const flat = document.createElement("canvas");
        flat.width = base.width;
        flat.height = base.height;
        const ctx = flat.getContext("2d");
        ctx.fillStyle = colorInput.value || "#f4f1ea";
        ctx.fillRect(0, 0, flat.width, flat.height);
        ctx.drawImage(base, 0, 0);
        input = flat;
      }
      const upscaler = await loadUpscaler();
      const dataUrl = await upscaler.upscale(input, { patchSize: 128, padding: 4 });
      const image = await loadImage(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d").drawImage(image, 0, 0);
      state.upscaled = canvas;
      paint();
      say("upscaleDone", `${canvas.width}×${canvas.height}`);
    } catch (error) {
      console.error(error);
      say("error", error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
      paint();
    }
  }

  function download() {
    const canvas = visibleCanvas();
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ai-up-lab-image.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, "image/png");
  }

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      say("loadingImage");
      const image = await loadImage(await readFile(file));
      await useSource(image, true);
      say("ready", locale() === "en" ? "Your photo is loaded." : "已换成你的照片。");
    } catch (error) {
      say("error", error instanceof Error ? error.message : String(error));
    }
  });

  bgFile.addEventListener("change", async () => {
    const file = bgFile.files?.[0];
    if (!file) return;
    try {
      state.backgroundImage = fitCanvas(await loadImage(await readFile(file)), 1600);
      const imageRadio = root.querySelector("[name='bg-mode'][value='image']");
      if (imageRadio) imageRadio.checked = true;
      state.upscaled = null;
      paint();
    } catch (error) {
      say("error", error instanceof Error ? error.message : String(error));
    }
  });

  root.querySelector("[data-sample-btn]").addEventListener("click", () => {
    loadSample().catch((error) => say("error", error instanceof Error ? error.message : String(error)));
  });
  cutoutBtn.addEventListener("click", () => runCutout());
  upscaleBtn.addEventListener("click", () => runUpscale());
  downloadBtn.addEventListener("click", () => download());

  for (const input of root.querySelectorAll("[name='bg-mode'], [data-color]")) {
    input.addEventListener("input", () => {
      state.upscaled = null;
      paint();
    });
  }
  for (const input of root.querySelectorAll("[name='cutout-model']")) {
    input.addEventListener("change", () => {
      if (state.source) paint();
    });
  }

  new MutationObserver(() => {
    say(state.key, state.detail);
    paint();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-locale"] });

  loadSample().catch((error) => say("error", error instanceof Error ? error.message : String(error)));
})();
