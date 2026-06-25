import React from 'react'
import { shuffleArray } from './utils';
import { decode } from 'html-entities';
export default function Quiz() {
    const [questions, setQuestions] = React.useState([])
    
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
        return {
          id: index,
          question: question.question,
          correctAnswer: question.correct_answer,
          answers: answers,
        };
      });
      setQuestions(processedQuestions)
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  React.useEffect(function(){fetchQuestions()},[questions])
  const questionsEl = questions.map((question)=>{
    const answersEl = question.answers.map((answer)=>{
        return <button>{answer}</button>
    })
    return <>
    <div>
    <h2 className=''>{decode(question.question)}</h2>
    {answersEl}
    <hr/>
    </div>
    </>
  })
  ;
  return (<section className="question-container">
    {questionsEl}
    <div className="check-container"><button className="check-btn">Check Answers</button></div>
    </section>);
}
