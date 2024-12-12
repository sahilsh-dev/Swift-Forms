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
      if (answer.type === "text" || answer.type === "textarea") {
        questionInputPairs[question.innerText] = answer;
      }
    }
  }
  console.log("Question Input Pairs", questionInputPairs);
  return questionInputPairs;
}

function fillMCQ() {
  const mcqItems = document.querySelectorAll("[role='presentation']");
  for (let item of mcqItems) {
    const options = item.querySelectorAll("label");
    console.log("Options", options, options.length);
    if (options.length === 1) {
      options[0].click();
    }
  }
}

async function fillGoogleForm() {
  const questionInputPairs = extractQuestions();
  const questions = Object.keys(questionInputPairs);
  const res = await chrome.runtime.sendMessage({
    action: "getAnswers",
    questions: questions,
  });
  if (!res.error) {
    const answers = res.answers;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const inputElement = questionInputPairs[question];
      inputElement.value = answers[i];
      const event = new Event("input", { bubbles: true }); // Create a synthetic input event
      inputElement.dispatchEvent(event); // Dispatch the input event
    }
  } else {
    window.alert("Error getting answers from server!");
    throw new Error(res.error);
  }
  fillMCQ();
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
