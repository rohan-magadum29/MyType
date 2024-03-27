import React from "react";
import Navbar from "./NavBar";
import { useState } from "react";
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
        
      </div>
    </div>
  );
};
export default Home;
