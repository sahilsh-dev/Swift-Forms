function extractQuestions() {
  const questionInputPairs = {};
  const questionsItems = document.querySelectorAll("[role='listitem']");
  for (let item of questionsItems) {
    let question = item.querySelector("[role='heading'] span:first-child");
    let answer = item.querySelector("input");
    if (!answer) {
      answer = item.querySelector("textarea");
    } else if (answer.type != "text") {
      // TODO: Add support for other input types
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
  const questions = Object.keys(questionInputPairs);
  const res = await chrome.runtime.sendMessage({
    action: "getAnswers",
    questions: questions,
  });
  console.log("Response from service worker: ", res);
  if (!res.error) {
    const answers = res.answers;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const inputElement = questionInputPairs[question];
      const placeholderText = inputElement.nextElementSibling;
      if (placeholderText) {
        placeholderText.remove();
      }
      inputElement.value = answers[i];
    }
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
