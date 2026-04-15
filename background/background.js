chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === "POPUP_START_SELECTION") {
      sendToActiveTab({ type: "START_SELECTION" });
      sendResponse({ ok: true });
      return true;
    }
  
    if (message?.type === "POPUP_CLEAR_OVERLAYS") {
      sendToActiveTab({ type: "CLEAR_OVERLAYS" });
      sendResponse({ ok: true });
      return true;
    }
  
    if (message?.type === "POPUP_TOGGLE_DEBUG_TEXT") {
      sendToActiveTab({
        type: "TOGGLE_DEBUG_TEXT",
        visible: Boolean(message.visible)
      });
      sendResponse({ ok: true });
      return true;
    }
  });
  
  async function sendToActiveTab(message) {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });
  
    if (!tab?.id) return;
    await chrome.tabs.sendMessage(tab.id, message);
  }