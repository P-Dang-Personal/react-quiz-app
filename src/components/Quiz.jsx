import React from 'react'
import { shuffleArray } from './utils';
import { decode } from 'html-entities';
export default function Quiz() {
    const [questions, setQuestions] = React.useState([])
    const [gameActive,setGameActive] = React.useState(true)
    const [correctAnswers,setCorrectAnswers] = React.useState([])
    const [chosenAnswers,setChosenAnswers] = React.useState([])
    function addAnswers(questionId,answer){
        //Use question ID to check if answer has already been given, then replace it
        // Add using setChosenAnswer but use questions array to compare
        //Need another function after to handle the submission
        setChosenAnswers(prev=>[...prev,answer])
    }
    function checkAnswers(){
        console.log(chosenAnswers)
    }
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
          answers: answers
        };
      });
      setQuestions(processedQuestions)
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  React.useEffect(function(){fetchQuestions()},[questions])
  const questionsEl = questions.map((question)=>{
    const questionFormatted = decode(question.question)
    setCorrectAnswers(prev=>[...prev,question.correctAnswer])
    const answersEl = question.answers.map((answer)=>{
        const answerFormatted = decode(answer)
        return (<><input className='answer' onClick={()=>addAnswers(question.id,answerFormatted)} value={answerFormatted} type="radio" name={questionFormatted} id={answerFormatted}/><label htmlFor={answerFormatted}>{answerFormatted}</label></>)
    })
    return <>
    <div>
    <h2 className=''>{questionFormatted}</h2>
    <div className='answers'>{answersEl}</div>
    <hr className="seperator"/>
    </div>
    </>
  })
  return (<section className="question-container">
    {questionsEl}
    <div className="check-container"><button onClick={checkAnswers} className="check-btn">Check Answers</button></div>
    </section>);
}
