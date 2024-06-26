import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Home from "./components/Home";
import PlayGame from "./components/PlayGame";
import EndGame from "./components/EndGame";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import { useEffect, useState } from "react";
import Navbar from "./components/NavBar.js";
import WPMDisplay from "./components/WPMDisplay.js";
import TimerContext from "./contexts/TimerContext.js";
import TimerContextProvider from "./contexts/TimerContextProvider.jsx";
import LeaderBoard from "./components/LeaderBoard.js";
import { DeathModeProvider } from "./contexts/DeathModeContext.js";
import { SoundProvider } from "./contexts/SoundPlayerContext.js";
import { GameCountProvider } from "./contexts/GameCountContext.js";
function App() {
  const [user, setLoginUser] = useState(null);
  const [statusGame, setStatusGame] = useState("home");
  const [props, setProps] = useState({});
  const handleChangeStatusGame = (status, props) => {
    setStatusGame(status);
    setProps(props);
  };

  let layout;
  switch (statusGame) {
    case "playGame":
      layout = (
        <PlayGame
          status={statusGame}
          ChangeState={handleChangeStatusGame}
          user={user}
        />
      );
      break;
    case "endGame":
      layout = <EndGame ChangeState={handleChangeStatusGame} props={props} />;
      break;
    case "login":
      layout = (
        <Login
          ChangeState={handleChangeStatusGame}
          setLoginUser={setLoginUser}
          props={props}
        />
      );
      break;
    case "register":
      layout = <Register ChangeState={handleChangeStatusGame} props={props} />;
      break;
    case "leaderboard":
      layout = <LeaderBoard username={user.username} />;
      break;
    case "home":
      if (user && user._id) {
        layout = (
          <Home
            ChangeState={handleChangeStatusGame}
            user={user}
            props={props}
          />
        );
      } else {
        layout = (
          <Login
            ChangeState={handleChangeStatusGame}
            setLoginUser={setLoginUser}
            props={props}
          />
        );
      }
      break;
  }
  return (
    <TimerContextProvider>
      <DeathModeProvider>
        <SoundProvider>
          <GameCountProvider>
          <div className="App">
          {user ? (
            <Navbar
              ChangeState={handleChangeStatusGame}
              currentState={statusGame}
              user={user}
              setLoginUser={setLoginUser}
            />
          ) : (
            <div></div>
          )}
          {layout}
        </div>
          </GameCountProvider>
        </SoundProvider>
      </DeathModeProvider>
    </TimerContextProvider>
  );
}

export default App;
