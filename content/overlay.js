export function createOverlayManager() {
    const created = new Set();
  
    function showLoading(box) {
      const el = makeBox(box, "Scanning...");
      created.add(el);
    }
  
    function showResult(box, text) {
      const el = makeBox(box, text || "(no text)");
      created.add(el);
    }
  
    function showError(box, message) {
      const el = makeBox(box, message || "Error");
      created.add(el);
    }
  
    function hideSelection() {
      // no-op for now
    }
  
    function clearAll() {
      for (const el of created) el.remove();
      created.clear();
    }
  
    function makeBox(box, label) {
      const el = document.createElement("div");
      el.className = "manga-ocr-result-box";
      el.textContent = label;
      Object.assign(el.style, {
        left: `${box.x + window.scrollX}px`,
        top: `${box.y + window.scrollY - 28}px`
      });
      document.documentElement.appendChild(el);
      return el;
    }
  
    return { showLoading, showResult, showError, hideSelection, clearAll };
  }