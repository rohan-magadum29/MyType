import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import TimerContext from "../contexts/TimerContext";
import axios from "axios";
import { useDeathMode } from "../contexts/DeathModeContext";
import { useSound } from "../contexts/SoundPlayerContext";

const PlayGame = ({ ChangeState, user }) => {
  const [para, setParagraph] = useState("");
  useEffect(() => {
    const fetchPara = async () => {
      try {
        const response = await axios.get("http://localhost:9002/paragraph");
        console.log(response.data);
        setParagraph(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPara();
  }, []);
  // const [defaultData] = useState(
  //   "As I sit in my room late at night, staring at the computer screen, I decide it would be a good idea to create this text. There isn't much meaning to it, other than to get some simple practice. A lot of the texts that have been created are rather short, and don't give a good representation of actual typing speed and accuracy. They lack the length to gauge where your strengths and weaknesses are when typing."
  // );
  const {playWrongSound} = useSound()
  const {isDeathMode} = useDeathMode();
  const [TypingData, setTypingData] = useState([]);
  const [UserTyping, setUserTyping] = useState({
    value: "",
    position: 0,
  });
  const inputBox = useRef(null);
  const [score, setScore] = useState({
    right: 0,
    wrong: 0,
  });
  const { selectedTime } = useContext(TimerContext);
  const time = selectedTime;
  const [timer, setTimer] = useState(time);
  const resetTimer = () => {
    setTimer(time);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          ChangeState("endGame", {
            score,
            ChangeState,
            resetTimer,
            time,
            user,
          });
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);
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
      playWrongSound()
    }
  };
  useEffect(() => {
    inputBox.current.focus();
    const addWord = (startIndex) => {
      if (para !== "") {
        const arrayDefaultDB = para.split(" ");
        const TypingDataPara = [];
        const quantity = arrayDefaultDB.length/2;
        for (let index = startIndex; index < quantity; index++) {
          // const position = Math.floor(Math.random() * arrayDefaultDB.length);
          TypingDataPara.push({
            value: arrayDefaultDB[index],
            status: null,
          });
        }
        setTypingData(TypingDataPara);
      }
    };
    if (TypingData.length === 0 || UserTyping.position >= TypingData.length) {
      addWord(UserTyping.position);
      setUserTyping({ ...UserTyping, position: 0 });
    }
  }, [UserTyping.position, para]);
  const handleChangeTyping = (e) => {
    const valueInput = e.target.value;
    if (!valueInput.includes(" ")) {
      setUserTyping({
        ...UserTyping,
        value: valueInput,
      });
    } else if (UserTyping.value !== "") {
      checkResult();
    }
  };
  const checkResult = () => {
    const dataCheck = TypingData;
    const wordCheck = dataCheck[UserTyping.position].value;
    if (UserTyping.value === wordCheck) {
      dataCheck[UserTyping.position].status = true;
      handleChangeScore("right");
    } else {
      dataCheck[UserTyping.position].status = false;
      handleChangeScore("wrong");
    }
    setTypingData(dataCheck);
    setUserTyping({
      value: "",
      position: UserTyping.position + 1,
    });
  };
  useEffect(()=>{
    if(isDeathMode == true)
          {
            console.log("Is Death Mode")
            if(score.wrong > 0)
            {
            console.log("End Game")
              ChangeState("endGame", {
                score,
                ChangeState,
                resetTimer,
                time,
                user,
              });
            }
          }
  },[score])
  return (
    <div className="playing">
      <ul className="list">
        {TypingData.length > 0 &&
          TypingData.map((word, index) => (
            <li
              key={index}
              className={
                word.status === true
                  ? "true"
                  : word.status === false
                  ? "false"
                  : ""
              }
            >
              {word.value}
            </li>
          ))}
      </ul>
      <div timer>{timer}</div>
      <div className="inputForm">
        <input
          type="text"
          value={UserTyping.value}
          onChange={handleChangeTyping}
          ref={inputBox}
        />
      </div>
    </div>

  );
};
export default PlayGame;
