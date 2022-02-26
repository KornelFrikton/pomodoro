import React from "react";
import "./css/timer.css";

export default function Timer(props) {
  //Pomodoro Time settings
  const handleAddPTime = (e) => {
    e.preventDefault();

    if (e.target.valueAsNumber === 0) {
      alert("Please set higher value, than 0 sec!");
    } else {
      props.handlePTimeClick(e.target.value);
      props.handlePT(e.target.valueAsNumber);
      props.handlePTotal(e.target.valueAsNumber);
    }
  };

  //Short Break settings
  const handleAddSTime = (e) => {
    e.preventDefault();

    if (e.target.valueAsNumber === 0) {
      alert("Please set higher value, than 0 sec!");
    } else {
      props.handleSTimeClick(e.target.value);
      props.handleST(e.target.valueAsNumber);
      props.handleSTotal(e.target.valueAsNumber);
    }
  };

  //Long Break settings
  const handleAddLTime = (e) => {
    e.preventDefault();

    if (e.target.valueAsNumber === 0) {
      alert("Please set higher value, than 0 sec!");
    } else {
      props.handleLTimeClick(e.target.value);
      props.handleLT(e.target.valueAsNumber);
      props.handleLTotal(e.target.valueAsNumber);
    }
  };

  const handleSetTime = (e) => {
    e.preventDefault();
  };

  return (
    <div className="timer">
      <h1>Set the timers</h1>
      <form action="#" className="form" method="GET" onSubmit={handleSetTime}>
        <h3>Pomodoro time set</h3>
        <div>/HH : MM : SS/</div>
        <div>
          <input
            type="time"
            className="timeInput"
            value={props.inputPTime}
            step="1"
            onChange={handleAddPTime}
          />
        </div>
        <h3>Short break time set</h3>
        <div>/HH : MM : SS/</div>
        <div>
          <input
            type="time"
            className="timeInput"
            value={props.inputSTime}
            step="1"
            onChange={handleAddSTime}
          />
        </div>
        <h3>Long break time set</h3>
        <div>/HH : MM : SS/</div>
        <div>
          <input
            type="time"
            className="timeInput"
            value={props.inputLTime}
            step="1"
            onChange={handleAddLTime}
          />
        </div>
        <input type="submit" className="timeButton" value="Set time" />
      </form>
    </div>
  );
}
