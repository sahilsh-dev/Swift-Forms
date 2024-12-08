function extractQuestions() {
  const questionInputPairs = {};
  const questionsItems = document.querySelectorAll("[role='listitem']");
  for (let item of questionsItems) {
    let question = item.querySelector("[role='heading'] span:first-child");
    let answer = item.querySelector("input");
    if (!answer) {
      answer = item.querySelector("textarea");
    } else if (answer.type != "text") {
      continue;
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
  const res = await chrome.runtime.sendMessage({
    action: "getAnswers",
    questions: Object.keys(questionInputPairs),
  });
  console.log("Response from service worker: ", res);
  if (!res.error) {
    //for (let [question, input] of Object.entries(questionInputPairs)) {
    //  if (res.answers[question]) {
    //    input.value = res.answers[question];
    //  }
    //}
    console.log(res.answers);
  }
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
