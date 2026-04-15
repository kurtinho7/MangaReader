import { createWorker } from "https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.esm.min.js";

let workerPromise = null;

async function getWorker(lang = "jpn") {
  if (!workerPromise) {
    workerPromise = createWorker(lang);
  }
  return workerPromise;
}

export function createOcrEngine() {
  return {
    async recognize(blob, { lang = "jpn" } = {}) {
      const worker = await getWorker(lang);
      const {
        data: { text }
      } = await worker.recognize(blob);
      return text.trim();
    }
  };
}