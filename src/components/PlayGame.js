import React from "react";
import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";

const PlayGame = ({ChangeState}) => {
  
  const [defaultData] = useState(
    "As I sit in my room late at night, staring at the computer screen, I decide it would be a good idea to create this text. There isn't much meaning to it, other than to get some simple practice. A lot of the texts that have been created are rather short, and don't give a good representation of actual typing speed and accuracy. They lack the length to gauge where your strengths and weaknesses are when typing."
  );
  const [TypingData, setTypingData] = useState([]);
  const [UserTyping, setUserTyping] = useState({
    value: "",
    position: 0,
  });
  const inputBox = useRef(null);
  const [score, setScore] = useState({
    right : 0,
    wrong : 0
  });
  const time = 15;
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
          ChangeState("endGame",{
            score,ChangeState,resetTimer,time
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
    }
  };
  useEffect(() => {
    inputBox.current.focus();
    const addWord = (quantity = 30) => {
      const arrayDefaultDB = defaultData.split(" ");
      const TypingDataPara = [];
      for (let index = 0; index < quantity; index++) {
        const position = Math.floor(Math.random() * arrayDefaultDB.length);
        TypingDataPara.push({
          value: arrayDefaultDB[position],
          status: null,
        });
      }
      setTypingData(TypingDataPara);
    };
    if (TypingData.length === 0 || UserTyping.position >= TypingData.length) {
      addWord();
      setUserTyping({ ...UserTyping, position: 0 });
    }
  }, [UserTyping.position]);
  const handleChangeTyping = (e) => {
    const valueInput = e.target.value;
    console.log(valueInput);
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
  return (
    <div className="playing">
      <ul className="list">
        {TypingData.map((word, index) => (
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
