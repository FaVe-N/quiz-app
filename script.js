const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital of United States of America?",
    answers: [
      { text: "Georgia", correct: false },
      { text: "Indiana", correct: false },
      { text: "Washington D.C", correct: true },
      { text: "Massachusetts", correct: false },
    ],
  },
  {
    question: "How many colors does the rainbow have?",
    answers: [
      { text: "12", correct: false },
      { text: "7", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "What colors make up the primary colors?",
    answers: [
        {text: "Red, White, Blue", correct: false},
        {text: "Blue, Green, Red", correct: false},
        {text: "Red, Yellow, Blue", correct: true},
        {text: "Grey, White, Black", correct: false}
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  })

}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
 }


function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  } else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else{
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuiz();
  }
})
startQuiz()