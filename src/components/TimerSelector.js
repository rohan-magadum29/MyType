import React from "react";
const [selectedTime, setSelectedTime] = useState(15);
const handleTimeSelection = (event) => {
  setSelectedTime(parseInt(event.target.value));
};
const TimerSelector = () => {
    return (
        <div className="timer-radio">
  <input
    type="radio"
    value={15}
    checked={selectedTime === 15}
    onChange={handleTimeSelection}
  />
  15 sec
  <input
    type="radio"
    value={30}
    checked={selectedTime === 30}
    onChange={handleTimeSelection}
  />
  30 sec
  <input
    type="radio"
    value={60}
    checked={selectedTime === 60}
    onChange={handleTimeSelection}
  />
  60 sec
</div>
    )
}

export default TimerSelector;
