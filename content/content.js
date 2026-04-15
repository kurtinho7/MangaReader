console.log("content script loaded");

if (!globalThis.__mangaOcrInitialized) {
  globalThis.__mangaOcrInitialized = true;

  const selection = createSelectionController({
    onComplete: (box) => {
      console.log("selection complete", box);
      injectTextLayer({
        text: "これはテストです",
        box,
        debugVisible: true
      });
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    console.log("message received in content script", message);

    if (message?.type === "START_SELECTION") {
      selection.enable();
    }

    if (message?.type === "CLEAR_OVERLAYS") {
      clearTextLayers();
    }

    if (message?.type === "TOGGLE_DEBUG_TEXT") {
      setDebugVisibility(Boolean(message.visible));
    }
  });
}