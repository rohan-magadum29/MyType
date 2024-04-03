import React from "react";
import Navbar from "./NavBar";
import { useState } from "react";
import WPMDisplay from "./WPMDisplay";
import LeaderBoard from "./LeaderBoard";
import TimerSelector from "./TimerSelector";
import TimerContextProvider from "../contexts/TimerContextProvider";
import WpmChart from "./WpmChart";
import ToggleButton from "../utils/ToggleButton";
import { DeathModeProvider } from "../contexts/DeathModeContext";
const Home = ({ ChangeState,user}) => {
  
  return (
    <div>
      <div className="home">
        <h1 className="title"> MyType </h1>
      </div>
      <div>
        <button
          className="btnPlay"
          onClick={() => ChangeState("playGame",user)}
        >
          Play
        </button>
          <p>Death Mode</p>
          <ToggleButton />
      </div>
      <WPMDisplay userEmail={user.email}/>
      <TimerSelector />
      {/* <LeaderBoard username={user.username}/> */}
      <div className="WpmChart-container" >
        <WpmChart userEmail={user.email}/>
      </div>
    </div>
  );
};
export default Home;
