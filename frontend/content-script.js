let questionsItems = document.querySelectorAll("[role='listitem']");
let questionInputPairs = {};

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
chrome.runtime.sendMessage(
  { action: "getAnswers", questionInputPairs: questionInputPairs },
  function (response) {
    console.log("Response from service worker: ", response);
  },
);
