import React from "react"
const Home = ({ ChangeState }) => {
  return (
    <div>
      <div className="home">
        <h1 className="title"> MyType </h1>
        <button onClick={()=>ChangeState('login')}>Login/Register</button>
      </div>
      <div>
        <button className="btnPlay" onClick={() => ChangeState("playGame")}>
          Play Game
        </button>
      </div>
    </div>
  );
};
export default Home;
