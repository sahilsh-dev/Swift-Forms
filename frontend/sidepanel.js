const knowledgeBase = document.querySelector("#knowledge-base");
let { context } = chrome.storage.local.get("context");
if (context) {
  knowledgeBase.value = context;
}
document
  .querySelector("#context-save-btn")
  .addEventListener("click", async function () {
    context = knowledgeBase.value;
    if (context) {
      chrome.storage.local.set({ context });
      console.log("Context saved: ", context);
    } else {
      console.log("No context found");
    }
  });

document
  .querySelector("#extract-btn") // TODO: Change name from extract btn
  .addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    console.log("Extracting questions from tab", tab.url);
    if (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"],
      });
    } else {
      console.log("No active tab found");
    }
  });
