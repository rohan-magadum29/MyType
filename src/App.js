import logo from "./logo.svg";
import React from "react"
import "./App.css";
import Home from "./components/Home";
import PlayGame from "./components/PlayGame";
import EndGame from "./components/EndGame";
import Login from "./components/Login.js";
import Register from "./components/Register.js"
import { useEffect, useState } from "react";

function App() {
  const [user,setLoginUser] = useState({})
  const [statusGame, setStatusGame] = useState("home");
  const [props, setProps] = useState({})
  const handleChangeStatusGame = (status,props) => {
    setStatusGame(status);
    setProps(props);
  };
  
  let layout;
  switch (statusGame) {
    case "playGame":
      layout = <PlayGame status ={statusGame} ChangeState={handleChangeStatusGame} props= {props}/>;
      break;
    case "endGame":
      layout = <EndGame  ChangeState={handleChangeStatusGame} props= {props}/>;
      break;
    case "login":
      layout = <Login ChangeState={handleChangeStatusGame} setLoginUser = {setLoginUser} props= {props}/>
      break;
    case "register":
      layout = <Register ChangeState={handleChangeStatusGame} props= {props}/>
      break;
    case "home":
      if(user && user._id) {
        layout = <Home ChangeState={handleChangeStatusGame} user = {user} props= {props}/>
      }
      else {
        layout = <Login ChangeState={handleChangeStatusGame} setLoginUser = {setLoginUser} props= {props}/>
      }
      break;
  }
  return (
    <div className="App">
      {layout}
    </div>
  );
}

export default App;
