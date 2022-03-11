import React from "react";
import "./css/howtouse.css";

export default function HowToUse() {
  return (
    <div className="howToUse">
      <h1>How to use this application?</h1>
      <ul>
        <li>
          Set the focus question in the <b>Focus</b> menu
        </li>
        <li>
          Set the Pomodoro timer, short and long break timers in the{" "}
          <b>Timer</b> menu
        </li>
        <li>
          Set the font and background color of your focus question in the{" "}
          <b>Color settings</b> menu
        </li>
        <li>
          Start the app's timer, when you decide to work on one of your daily
          tasks
        </li>
        <li>Work on the task until the pomodoro timer chimers</li>
        <li>Take a short break</li>
        <li>
          After 3 pomodoros, stop and think about your focus question, then take
          a long break
        </li>
      </ul>
    </div>
  );
}
