chrome.runtime.onInstalled.addListener(function () {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  });
});

const GOOGLE_FORMS_URL = "https://docs.google.com/forms";

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  console.log(tabId, tab.url);
  if (!tab.url) return;
  if (tab.url.startsWith(GOOGLE_FORMS_URL)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html",
      enabled: true,
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getAnswers") {
    chrome.storage.local.get("context", function (result) {
      let userContext = result.context;
      console.log("User context: ", userContext);
    });
    let answers = {};
    for (let question of request.questions) {
      answers[question] = "Test";
    }
    sendResponse({ answers });
  }
});
