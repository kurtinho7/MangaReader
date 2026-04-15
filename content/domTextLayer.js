const ROOT_ID = "manga-ocr-text-root";
let debugVisible = false;

function getRoot() {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = ROOT_ID;
    root.className = "manga-ocr-text-root";
    document.documentElement.appendChild(root);
  }
  return root;
}

function injectTextLayer({ text, box, debugVisible: visible = false }) {
  const root = getRoot();
  const el = document.createElement("div");
  el.className = "manga-ocr-text-layer";
  el.dataset.mangaOcr = "true";

  Object.assign(el.style, {
    left: `${box.x + window.scrollX}px`,
    top: `${box.y + window.scrollY}px`,
    width: `${box.width}px`,
    height: `${box.height}px`
  });

  const span = document.createElement("span");
  span.className = "manga-ocr-text";
  span.textContent = text;
  span.style.opacity = visible || debugVisible ? "0.85" : "0.01";

  el.appendChild(span);
  root.appendChild(el);
}

function clearTextLayers() {
  getRoot().innerHTML = "";
}

function setDebugVisibility(visible) {
  debugVisible = visible;
  document.querySelectorAll(".manga-ocr-text").forEach((el) => {
    el.style.opacity = visible ? "0.85" : "0.01";
  });
}

globalThis.injectTextLayer = injectTextLayer;
globalThis.clearTextLayers = clearTextLayers;
globalThis.setDebugVisibility = setDebugVisibility;