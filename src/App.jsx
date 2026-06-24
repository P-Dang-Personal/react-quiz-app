import { useState } from 'react'
import './App.css'
import React from 'react'
import Splash from './components/Splash'
import Quiz from './components/Quiz'
function App() {

  return (
    <main className='quiz-container'>
      {/* <Splash/> */}
      <Quiz/>
    </main>
  )
}

export default App
