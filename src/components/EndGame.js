const EndGame = ({score,onGame,resetTimer,time}) => {
    const handlePlayAgain = () => {
        onGame('playGame');
        resetTimer();
    }
    let accuracy = (score.right/(score.right + score.wrong) * 100).toFixed(0);
    let speed = ((score.right+score.wrong)/(time/60));

    return (
        <div className="endGame">
            <div className="stats-txt">
                Accuracy - { accuracy + "%"} 
            </div>
            <div className="stats-txt">
                Speed - { speed + "WPM"} 
            </div>
            <div className="stats-txt">
                Effectiveness - {score.right / (time/60) + "WPM"}
            </div> 
            <button className="btnPlayAgain" onClick={handlePlayAgain} >Play Game Again</button>
        </div>
    )
}
export default EndGame;