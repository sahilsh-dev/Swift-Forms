let questions = document.querySelectorAll('[role="listitem"] [role="heading"] span:first-child');
questions = Array.from(questions).map((question) => question.innerText);
let answerInputs = document.querySelectorAll('[role="listitem"] input');

console.log(questions);
console.log(answerInputs);
