import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SCORE_DISPLAY_ID, // added in 4th commit
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
    
    answerElement.addEventListener('click', () => {
      handleAnswerSelection(key);
    });
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const handleAnswerSelection = (selectedKey) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected = selectedKey;

  if (selectedKey === currentQuestion.correct) {
    quizData.score += 10;
  }

  const scoreElement = document.getElementById(SCORE_DISPLAY_ID); 
  scoreElement.textContent = `Your score : ${quizData.score}`; // shows and update the score in each question- 4th commit.

}

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex < quizData.questions.length) {
    initQuestionPage();
  } else {
    displayQuizEnd();
  }
};

const displayQuizEnd = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);

  let resultMessage;
  if (quizData.score >= 50) {
    resultMessage = `<h2>Congratulations! You win the quiz!</h2>`
  } else {
    resultMessage = `<h2>Sorry, you lose the quiz. Better luck next time!`
  }

  userInterface.innerHTML = `
  <h1>Quiz Complete! Thank you for playing!</h1>
  <h2>Your Final Score is: ${quizData.score}</h2>
  ${resultMessage}
  `;

}
