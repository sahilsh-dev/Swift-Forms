function extractQuestions() {
  const questionInputPairs = {};
  const questionsItems = document.querySelectorAll("[role='listitem']");
  for (let item of questionsItems) {
    let question = item.querySelector("[role='heading'] span:first-child");
    let answer = item.querySelector("input");
    if (!answer) {
      answer = item.querySelector("textarea");
    }

    if (question && answer) {
      questionInputPairs[question.innerText] = answer;
    }
  }
  console.log(questionInputPairs);
  return questionInputPairs;
}

async function fillGoogleForm() {
  const questionInputPairs = extractQuestions();
  const response = await chrome.runtime.sendMessage({
    action: "getAnswers",
    questions: Object.keys(questionInputPairs),
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fillGoogleForm") {
    fillGoogleForm()
      .then(() => {
        sendResponse({ message: "Filling Google Form completed" });
      })
      .catch((error) => {
        sendResponse({ message: `Error: ${error.message}` });
      });
    // Return true to indicate that we're responding asynchronously
    return true;
  }
});
