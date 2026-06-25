import React from "react";
import { shuffleArray } from "./utils";
import { decode } from "html-entities";
import clsx from "clsx";
export default function Quiz() {
  const [questions, setQuestions] = React.useState([]);
  const [gameCompleted, setGameCompleted] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [chosenAnswers, setChosenAnswers] = React.useState([]);
  const [score, setScore] = React.useState(0);
  /**
   * Need CSS conditional for Correct Answer
   * Incorrect Answer
   * Conditional For Completing Game, Tally Score
   */
  async function fetchQuestions() {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=15&type=multiple",
      );
      const data = await response.json();
      const processedQuestions = data.results.map((question, index) => {
        const answers = shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]);
        setCorrectAnswers((prev) => [...prev, question.correct_answer]);
        return {
          id: index,
          question: question.question,
          correctAnswer: question.correct_answer,
          answers: answers,
        };
      });
      setQuestions(processedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  React.useEffect(
    function () {
      fetchQuestions();
    },
    [questions],
  );
  const questionsEl = questions.map((question, index) => {
    const questionFormatted = decode(question.question);

    const answersEl = question.answers.map((answer, index) => {
      const className = clsx("choice", {
        correct: gameCompleted && correctAnswers.includes(answer),
        wrong: gameCompleted && !correctAnswers.includes(answer),
      });
      const answerFormatted = decode(answer);
      return (
        <span key={answer}>
          <input
            className="answer"
            value={answerFormatted}
            type="radio"
            name={questionFormatted}
            id={answerFormatted}
          />
          <label className={className} htmlFor={answerFormatted}>
            {answerFormatted}
          </label>
        </span>
      );
    });

    return (
      <div key={questionFormatted}>
        <h2 className="">{questionFormatted}</h2>
        <div className="answers">{answersEl}</div>
        <hr className="seperator" />
      </div>
    );
  });
  function resetGame() {
    setScore((prev) => 0);
    setGameCompleted((prev) => !prev);
    fetchQuestions();
  }
  function validateAnswers(formData) {
    let answers = [];

    for (const [name, value] of formData.entries()) {
      answers.push(value);
    }
    answers.map((answer) => {
      if (correctAnswers.includes(answer)) {
        setScore((prevScore) => prevScore + 1);
      }
      //Complete Game with conditional rendering, then show
      setGameCompleted((prev) => !prev);
    });
  }
  return (
    <section className="question-container">
      {gameCompleted ? (
        <>
          {questionsEl}
          <div class="check-container">
            <p className="completed-msg">
              You scored {score}/{questions.length}
                         </p> 
              <button onClick={resetGame} className="check-btn">
                Play Again
              </button>

          </div>
        </>
      ) : (
        <form id="quiz-form" action={validateAnswers}>
          {questionsEl}
          <div className="check-container">
            <button className="check-btn">Check Answers</button>
          </div>
        </form>
      )}
    </section>
  );
}
