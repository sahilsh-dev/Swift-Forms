chrome.runtime.onInstalled.addListener(function () {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  });
});

const GOOGLE_FORMS_URL = "https://docs.google.com/forms";

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
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
      getAnswers(userContext, request.questions)
        .then((answers) => {
          sendResponse({ answers });
        })
        .catch((error) => {
          sendResponse({ error });
        });
    });
    return true;
  }
});

async function getAnswers(context, questions) {
  const url = "http://localhost:8000/predict-answers";
  let answers = {};
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ context, questions }),
    });
    if (!res.ok) {
      throw new Error("Failed to get answers from server!");
    }
    const json = await res.json();
    console.log("Get answers json: ", json);
    answers = json.answers;
  } catch (error) {
    console.error(error);
  }
  return answers;
}
