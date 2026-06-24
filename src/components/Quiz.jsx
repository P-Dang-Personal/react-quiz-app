import React from "react";
import { questions } from "./questions";
import { decode, decodeEntity } from "html-entities";
import { shuffleArray } from "./utils";
export default function Quiz(props) {
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const quizEl = questions.map(question => {
    setCorrectAnswers(prev=>[...prev,question.correct_answer])
    question.incorrect_answers.push(question.correct_answer)
    let arr = shuffleArray(question.incorrect_answers)
    const answers = arr.map((answer,index)=>{
        return <button className="answer-btn" key={answer}>{answer}</button>
    })
    return (
      <>
        <h2 key={question.question}>{decode(question.question)}</h2>
        <div className="btn-container">{answers}</div>
        <hr className="seperator"/>
      </>
    );
  });
  return <section className="question-container">
    {quizEl}
    <div className="check-container"><button className="check-btn">Check Answers</button></div>
    </section>;
}
