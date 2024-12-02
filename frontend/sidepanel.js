document
  .getElementById("extract-btn")
  .addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    console.log("Extracting questions on tab", tab.url);
    if (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"],
      });
    } else {
      console.log("No active tab found");
    }
  });
