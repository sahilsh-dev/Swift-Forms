const knowledgeBase = document.querySelector("#knowledge-base");
chrome.storage.local.get("context", function (result) {
  let context = result.context;
  if (context) {
    knowledgeBase.value = context;
  }
});

document
  .querySelector("#context-save-btn")
  .addEventListener("click", async function () {
    context = knowledgeBase.value;
    if (context) {
      chrome.storage.local.set({ context }, function () {
        console.log("Context saved: ", context);
      });
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
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "fillGoogleForm",
      });
      console.log("Response from content script: ", response);
    } else {
      console.log("No active tab found");
    }
  });
