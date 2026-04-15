async function getActiveTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });
    return tab;
  }
  
  async function ensureInjected(tabId) {
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["content/content.css"]
    });
  
    await chrome.scripting.executeScript({
      target: { tabId },
      files: [
        "shared/messages.js",
        "content/selection.js",
        "content/domTextLayer.js",
        "content/content.js"
      ]
    });
  }
  
  async function sendToActiveTab(message) {
    const tab = await getActiveTab();
  
    if (!tab?.id) {
      console.error("No active tab found");
      return;
    }
  
    try {
      await ensureInjected(tab.id);
      await chrome.tabs.sendMessage(tab.id, message);
    } catch (err) {
      console.error("Failed to inject or send message:", err);
    }
  }
  
  document.getElementById("startBtn").addEventListener("click", async () => {
    await sendToActiveTab({ type: "START_SELECTION" });
    window.close();
  });
  
  document.getElementById("clearBtn").addEventListener("click", async () => {
    await sendToActiveTab({ type: "CLEAR_OVERLAYS" });
  });
  
  document.getElementById("debugToggle").addEventListener("change", async (e) => {
    await sendToActiveTab({
      type: "TOGGLE_DEBUG_TEXT",
      visible: e.target.checked
    });
  });