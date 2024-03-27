import React from "react";
const EndGame = (props) => {
  console.log(props);
  const score = props.props.score;
  const time = props.props.time;
  const resetTimer = props.props.resetTimer;
  const ChangeState = props.props.ChangeState;
  const handlePlayAgain = () => {
    ChangeState("playGame");
    resetTimer();
  };

  const rightScore = score.right;
  const wrongScore = score.wrong;
  let accuracy = ((rightScore / (rightScore + wrongScore)) * 100).toFixed(0);
  let speed = (rightScore + wrongScore) / (time / 60);

  return (
    <div className="endgame">
      <div className="stats">
        <div className="stats-txt">Accuracy - {accuracy + "%"}</div>
        <div className="stats-txt">Speed - {speed + "WPM"}</div>
        <div className="stats-txt">
          Effectiveness - {rightScore / (time / 60) + "WPM"}
        </div>
      </div>
      <div>
      <button className="btnEnd" onClick={handlePlayAgain}>
        Play Again
      </button>
      <button className="btnEnd" onClick={()=>ChangeState("home")}>
        Home
      </button>
      </div>
    </div>
  );
};
export default EndGame;
