import React, { useEffect } from "react";
import axios from "axios";
import TimerSelector from "./TimerSelector";
import { useGameCount } from "../contexts/GameCountContext";
const EndGame = (props) => {
  const score = props.props.score;
  const time = props.props.time;
  const resetTimer = props.props.resetTimer;
  const ChangeState = props.props.ChangeState;
  const user = props.props.user;
  const {incrementGameCount} = useGameCount()
  const handlePlayAgain = () => {
    resetTimer();
    ChangeState("playGame");
    storeGameData();
  };
  
  const rightScore = score.right;
  const wrongScore = score.wrong;
  let accuracy = ((rightScore / (rightScore + wrongScore)) * 100).toFixed(0);
  if(accuracy === "NaN"){
    accuracy = 0;
  }
  let speed = (rightScore + wrongScore) / (time / 60);
  let effectiveSpeed = rightScore / (time / 60);
  const storeGameData = async () => {
    const gameData = {
      username:user.username,
      email: user.email,
      accuracy,
      speed: effectiveSpeed,
    };
    try {
      const response = axios.post("http://localhost:9002/game", gameData);
      console.log("Game Data Stored ", response.data);
    } catch (error) {
      console.log("Error Storing Game Data", error);
    }
  };
  useEffect(()=>{
    incrementGameCount();
  },[])
  return (
    <div className="endgame">
      <div className="stats">
        <div className="stats-txt">Accuracy - {accuracy + "%"}</div>
        <div className="stats-txt">Raw - {speed + "WPM"}</div>
        <div className="stats-txt">
          Speed - {effectiveSpeed + "WPM"}
        </div>
      </div>
      <div>
        <button className="btnEnd" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="btnEnd" onClick={() => {ChangeState("home");storeGameData();}
        }>
          Home
        </button>
      </div>
      <TimerSelector />
    </div>
  );
};
export default EndGame;
