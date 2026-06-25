import { useState } from "react";
import "./App.css";
import React from "react";
import Quiz from "./components/Quiz";
function App() {
  const [gameStart, setGameStart] = React.useState(false)
  function startGame(){
    console.log('Game starting...')
    setGameStart(prev=>!prev)
  }

  return (
    <main className="quiz-container">
      {!gameStart?    <section className="splash-container">
      <h1 className="heading">Quizzical</h1>
      <p className="description">Some description if needed</p>
      <button onClick={startGame} className="start-quiz-btn">Start quiz</button>
    </section>:<Quiz/>}
    </main>
  );
}

export default App;
