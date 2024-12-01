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
