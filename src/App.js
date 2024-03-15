import logo from "./logo.svg";
import React from "react"
import "./App.css";
import Home from "./components/Home";
import PlayGame from "./components/PlayGame";
import EndGame from "./components/EndGame";

import { useEffect, useState } from "react";

function App() {
  const [statusGame, setStatusGame] = useState("Home");
  const [score, setScore] = useState(null);
  const time = 15;
  const [timer, setTimer] = useState(time);
  const resetTimer = () => {
    setTimer(time)
  }
  useEffect(() => {
    if(statusGame === "playGame"){
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId);
            setStatusGame("endGame");
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  },[statusGame]);
  useEffect(() => {
    if (statusGame === "playGame") {
      setScore({
        right: 0,
        wrong: 0,
      });
    }
  }, [statusGame]);
  const handleChangeStatusGame = (status) => {
    setStatusGame(status);
  };
  const handleChangeScore = (type) => {
    if (type === "right") {
      setScore({
        ...score,
        right: score.right + 1,
      });
    } else {
      setScore({
        ...score,
        wrong: score.wrong + 1,
      });
    }
  };
  let layout;
  switch (statusGame) {
    case "playGame":
      layout = <PlayGame onChangeScore={handleChangeScore} />;
      break;
    case "endGame":
      layout = <EndGame score={score} onGame={handleChangeStatusGame} resetTimer={resetTimer} time = {time}/>;
      break;
    default:
      layout = <Home onGame={handleChangeStatusGame} />;
      break;
  }
  return (
    <div className="App">
      {layout}
      {statusGame === "playGame" && <div className="timer-txt">{timer}</div>}
    </div>
  );
}

export default App;
