export async function captureRegion(box) {
    const target = findBestImageUnderBox(box);
    if (!target) {
      throw new Error("No image found under selection");
    }
  
    const rect = target.getBoundingClientRect();
  
    const scaleX = target.naturalWidth / rect.width;
    const scaleY = target.naturalHeight / rect.height;
  
    const sx = Math.max(0, (box.x - rect.left) * scaleX);
    const sy = Math.max(0, (box.y - rect.top) * scaleY);
    const sw = Math.min(target.naturalWidth - sx, box.width * scaleX);
    const sh = Math.min(target.naturalHeight - sy, box.height * scaleY);
  
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(sw));
    canvas.height = Math.max(1, Math.round(sh));
  
    const ctx = canvas.getContext("2d");
    ctx.drawImage(target, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    return { blob, canvas, source: target };
  }
  
  function findBestImageUnderBox(box) {
    const images = [...document.querySelectorAll("img")];
    let best = null;
    let bestArea = 0;
  
    for (const img of images) {
      const rect = img.getBoundingClientRect();
      const overlap = intersectionArea(
        { x: box.x, y: box.y, width: box.width, height: box.height },
        { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
      );
  
      if (overlap > bestArea) {
        bestArea = overlap;
        best = img;
      }
    }
  
    return best;
  }
  
  function intersectionArea(a, b) {
    const x1 = Math.max(a.x, b.x);
    const y1 = Math.max(a.y, b.y);
    const x2 = Math.min(a.x + a.width, b.x + b.width);
    const y2 = Math.min(a.y + a.height, b.y + b.height);
  
    if (x2 <= x1 || y2 <= y1) return 0;
    return (x2 - x1) * (y2 - y1);
  }