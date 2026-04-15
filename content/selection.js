function createSelectionController({ onComplete }) {
    let active = false;
    let startX = 0;
    let startY = 0;
    let boxEl = null;
  
    function enable() {
      if (active) return;
      active = true;
      document.addEventListener("mousedown", onMouseDown, true);
      document.addEventListener("keydown", onKeyDown, true);
    }
  
    function disable() {
      active = false;
      document.removeEventListener("mousedown", onMouseDown, true);
      document.removeEventListener("mousemove", onMouseMove, true);
      document.removeEventListener("mouseup", onMouseUp, true);
      document.removeEventListener("keydown", onKeyDown, true);
      boxEl?.remove();
      boxEl = null;
    }
  
    function onMouseDown(e) {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
  
      boxEl = document.createElement("div");
      boxEl.className = "manga-ocr-selection-box";
      document.body.appendChild(boxEl);
  
      Object.assign(boxEl.style, {
        left: `${startX}px`,
        top: `${startY}px`,
        width: `0px`,
        height: `0px`
      });
  
      document.addEventListener("mousemove", onMouseMove, true);
      document.addEventListener("mouseup", onMouseUp, true);
    }
  
    function onMouseMove(e) {
      const x = Math.min(startX, e.clientX);
      const y = Math.min(startY, e.clientY);
      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);
  
      Object.assign(boxEl.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      });
    }
  
    function onMouseUp(e) {
      const x = Math.min(startX, e.clientX);
      const y = Math.min(startY, e.clientY);
      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);
  
      disable();
  
      if (width >= 8 && height >= 8) {
        onComplete?.({ x, y, width, height });
      }
    }
  
    function onKeyDown(e) {
      if (e.key === "Escape") disable();
    }
  
    return { enable, disable };
  }
  
  globalThis.createSelectionController = createSelectionController;