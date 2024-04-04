import React, { useContext } from "react";
import TimerContext from "../contexts/TimerContext";

const TimerSelector = () => {
  const { selectedTime, setSelectedTime } = useContext(TimerContext);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    console.log(selectedTime);
  };

  return (
    <div className="timer-selector">
      <button
        className={selectedTime === 15 ? "selected" : "unselected"}
        onClick={() => handleTimeSelection(15)}
      >
        15 sec
      </button>
      <button
        className={selectedTime === 30 ? "selected" : "unselected"}
        onClick={() => handleTimeSelection(30)}
      >
        30 sec
      </button>
      <button
        className={selectedTime === 60 ? "selected" : "unselected"}
        onClick={() => handleTimeSelection(60)}
      >
        60 sec
      </button>
    </div>
  );
};

export default TimerSelector;
