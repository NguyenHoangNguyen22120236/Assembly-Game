import './App.css';
import { languages } from "./languages"
import { words } from './word'
import { useState, useEffect, useMemo } from 'react';
import GameResult from './GameResult';
import LanguageList from './LanguageList'
import {getFarewellText} from './utils'

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const alphabet = "abcdefghijklmnopqrstuvwxy";
  const [lettersFound, setlettersFound] = useState([]);
  const [lettersFoundInCorrect, setlettersFoundInCorrect] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const won = word.split("").every(letter => lettersFound.includes(letter));
    setGameWon(won);
    setGameOver(attempts >= languages.length || won);

    return () => {
      setGameWon(false);
      setGameOver(false);
    }
  }, [lettersFound, lettersFoundInCorrect]);

  const letterElements = word.split("").map((letter, index) =>{
    if (!gameOver) {
      return(
        <div key={index} className='letter'>
            {lettersFound.includes(letter) ? letter.toUpperCase() : null}
        </div>
      )
    }

    return(
      <div key={index} className='letter' 
        style={lettersFound.includes(letter) ? null : {color: '#EC5D49'}}>
          {letter.toUpperCase()}
      </div>
    )
  })

  const keyboardElements = alphabet.split("").map((letter, index) =>{
    const styleKeyboard = {
      backgroundColor: (lettersFoundInCorrect.includes(letter) && '#EC5D49') || 
                       (lettersFound.includes(letter) && '#10A95B') || 
                        '#FCBA29',
    }
    return(
      <button key={index} onClick={() => chooseLetter(letter)} 
          className='keyboard-button d-flex justify-content-center align-items-center rounded'
          style={styleKeyboard}
          disabled={gameOver}>
        {letter.toUpperCase()}
      </button>
    )
  })

  function chooseLetter(letter) {
      const isLetterInWord = word.includes(letter);
      if (lettersFoundInCorrect.includes(letter) || lettersFound.includes(letter)) {
        return;
      }
      if (isLetterInWord) {
        setlettersFound(prevLetters => [...prevLetters, letter]);
      } else {
        setlettersFoundInCorrect(prevLetters => [...prevLetters, letter]);
        setAttempts(prevAttempts => prevAttempts + 1);
      }
  }

  // Function to reset the game
  function resetGame() {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setlettersFound([]);
    setlettersFoundInCorrect([]);
    setAttempts(0);
    setGameOver(false);
    setGameWon(false);
  }

  const farewellText = useMemo(() => {
    return attempts > 0 && attempts < languages.length ? getFarewellText(languages[attempts - 1].name) : null;
  }, [attempts]);


  return (
    <>
    <main className='container text-center'>
      <header>
        <h1 className='d-flex justify-content-center flex-wrap'>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      {gameOver ? <GameResult gameWon={gameWon}/> : (
          <div className='farewell-text d-flex justify-content-center flex-wrap align-items-center'>
            {farewellText}
          </div>
        )}
      <div className='d-flex justify-content-center flex-wrap'>
            <LanguageList languages={languages} attempts={attempts}/>
      </div>
      <div className='d-flex justify-content-center flex-wrap gap-4 mt-4'>
        {letterElements}
      </div>
      <div className='d-flex justify-content-center flex-wrap gap-4 mt-4'>
        {keyboardElements}
      </div>
      {gameOver && <button className='btn btn-primary p-2 mt-5 w-50' onClick={resetGame}>New Game</button>}
    </main>
    </>
  );
}

export default App;
