import React, { useState, useEffect } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import Introduction from "./components/introduction";
import HowToUse from "./components/howtouse";
import ColorSettings from "./components/colorsettings";
import Focus from "./components/focus";
import Timer from "./components/timer";

import styles from "./components/css/app.module.css";
import "react-circular-progressbar/dist/styles.css";
import pomodoro from "./image/pomodoro.jpg";
import uplifting from "./mp3/uplifting-bells.mp3";
import happy from "./mp3/happy-bells.mp3";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

function App() {
  const theme = createTheme({
    palette: {
      primary: yellow,
      secondary: {
        main: "#000000",
      },
    },
    components: {
      // Name of the component
      MuiTabs: {
        styleOverrides: {
          // Name of the slot
          flexContainer: {
            // Some CSS
            flexWrap: "wrap",
          },
        },
      },
    },
  });

  const [alertStart, setAlertStart] = useState(false);

  //Focus
  const [focusField, setFocusField] = useState("");

  //Timer
  const [pomodoroTime, setPomodoroTime] = useState("00:25:00");
  const [shortBreak, setShortBreak] = useState("00:05:00");
  const [longBreak, setLongBreak] = useState("00:10:00");

  const [PT, setPT] = useState(1500000);
  const [ST, setST] = useState(300000);
  const [LT, setLT] = useState(600000);

  const [totalPT, setTotalPT] = useState(PT);
  const [totalST, setTotalST] = useState(ST);
  const [totalLT, setTotalLT] = useState(LT);

  //Rounds
  const [count, setCount] = useState(false);
  const [round, setRound] = useState(1);

  //Color & font
  const [background, setBackground] = useState("#F5B82E");
  const [font, setFont] = useState("#000000");
  const [bar, setBar] = useState({ r: 120, g: 188, b: 97 });

  //Timer show/hide
  const [pomodoClass, setPomodoClass] = useState(true);
  const [shortClass, setShortClass] = useState(false);
  const [longClass, setLongClass] = useState(false);

  //Start button
  const handleStart = (e) => {
    if (focusField === "") {
      setAlertStart(true);
    } else {
      setCount(true);
      new Audio(uplifting).play();
    }
  };

  //Stop button
  const handlePause = (e) => {
    setCount(false);
  };

  //Reset button
  const handleReset = (e) => {
    setCount(false);
    setPT(totalPT);
    setST(totalST);
    setLT(totalLT);
    setPomodoClass(true);
    setLongClass(false);
    setShortClass(false);
    setRound(1);

    const timePT = new Date(totalPT).toUTCString();
    const newtimePT = timePT.substring(17, 25);
    setPomodoroTime(newtimePT);

    const timeST = new Date(totalST).toUTCString();
    const newtimeST = timeST.substring(17, 25);
    setShortBreak(newtimeST);

    const timeLT = new Date(totalLT).toUTCString();
    const newtimeLT = timeLT.substring(17, 25);
    setLongBreak(newtimeLT);
  };

  //Pomodoro timer
  useEffect(() => {
    if (count && round < 6 && round % 2 === 1) {
      const timerPT = setTimeout(() => {
        const timePT = new Date(PT).toUTCString();
        const newtimePT = timePT.substring(17, 25);
        setPomodoroTime(newtimePT);
        setPT((PT) => PT - 1000);

        if (PT === 0) {
          new Audio(happy).play();
          setPT(totalPT);
          const timePT = new Date(totalPT).toUTCString();
          const newtimePT = timePT.substring(17, 25);
          setPomodoroTime(newtimePT);

          if (round < 5) {
            alert("Time to have a rest!");
            setRound(round + 1);
            setPomodoClass(false);
            setShortClass(true);
          } else {
            alert("Time to think about your focus, then take a long break!");
            setRound(round + 1);
            setPomodoClass(false);
            setLongClass(true);
          }
        }
      }, 1000);
      return () => clearTimeout(timerPT);
    }
  });

  //Short break timer
  useEffect(() => {
    if (count && round < 6 && round % 2 === 0) {
      const timerST = setTimeout(() => {
        setST((ST) => ST - 1000);
        const timeST = new Date(ST).toUTCString();
        const newtimeST = timeST.substring(17, 25);
        setShortBreak(newtimeST);

        if (ST === 0) {
          new Audio(uplifting).play();
          setST(totalST);
          const timeST = new Date(totalST).toUTCString();
          const newtimeST = timeST.substring(17, 25);
          setShortBreak(newtimeST);

          alert("Time to continue your work!");
          setRound(round + 1);
          setPomodoClass(true);
          setShortClass(false);
        }
      }, 1000);
      return () => clearTimeout(timerST);
    }
  });

  //Long break timer
  useEffect(() => {
    if (count && round === 6) {
      const timerLT = setTimeout(() => {
        const timeLT = new Date(LT).toUTCString();
        const newtimeLT = timeLT.substring(17, 25);
        setLongBreak(newtimeLT);
        setLT((LT) => LT - 1000);

        if (LT === 0) {
          new Audio(happy).play();
          handleReset();
          alert("Great job, you finished your focus session!");
        }
      }, 1000);
      return () => clearTimeout(timerLT);
    }
  });

  //Color change
  const handleColorBackground = (color) => {
    setBackground(color.rgb);
  };

  const handleColorFont = (color) => {
    setFont(color.rgb);
  };

  const handleColorBar = (color) => {
    setBar(color.rgb);
  };

  //Timer show/hide
  const pomodoroField = pomodoClass ? styles.showTimer : styles.hideTimer;
  const shortField = shortClass ? styles.showTimer : styles.hideTimer;
  const longField = longClass ? styles.showTimer : styles.hideTimer;

  const [valueTab, setValueTab] = useState(5);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleCloseTab = () => {
    setValueTab(5);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1 className={styles.title}>The One Thing</h1>
          <div className={styles.logo}>
            <img src={pomodoro} alt="Pomodoro" />
          </div>
          <div className={styles.menu}>
            <HashRouter>
              <AppBar
                className={styles.tabs}
                position="static"
                color="secondary"
              >
                <Tabs
                  value={valueTab}
                  onChange={handleTabChange}
                  textColor="primary"
                  centered
                  TabIndicatorProps={{ sx: { display: "none" } }}
                >
                  <Tab
                    component={Link}
                    to="/introduction"
                    label="Introduction"
                  />
                  <Tab component={Link} to="/howtouse" label="How to use" />
                  <Tab component={Link} to="/focus" label="Focus" />
                  <Tab component={Link} to="/timer" label="Timer" />
                  <Tab
                    component={Link}
                    to="/colorsettings"
                    label="Color settings"
                  />
                  <Tab
                    icon={<CancelPresentationIcon fontSize="large" />}
                    component={Link}
                    to="/"
                    onClick={handleCloseTab}
                  />
                </Tabs>
              </AppBar>
              <Routes>
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/howtouse" element={<HowToUse />} />
                <Route
                  path="/focus"
                  element={
                    <Focus
                      input={focusField}
                      handleFocusClick={setFocusField}
                      setAlertStart={setAlertStart}
                    />
                  }
                />
                <Route
                  path="/timer"
                  element={
                    <Timer
                      pomodoroTime={pomodoroTime}
                      inputPTime={pomodoroTime}
                      handlePTimeClick={setPomodoroTime}
                      inputSTime={shortBreak}
                      handleSTimeClick={setShortBreak}
                      inputLTime={longBreak}
                      handleLTimeClick={setLongBreak}
                      handlePT={setPT}
                      handleST={setST}
                      handleLT={setLT}
                      handlePTotal={setTotalPT}
                      handleSTotal={setTotalST}
                      handleLTotal={setTotalLT}
                    />
                  }
                />
                <Route
                  path="/colorsettings"
                  element={
                    <ColorSettings
                      onColorSelectBackground={handleColorBackground}
                      onColorSelectFont={handleColorFont}
                      onColorSelectBar={handleColorBar}
                    />
                  }
                />
                <Route path="/" />
              </Routes>
            </HashRouter>
          </div>
        </header>

        <div>
          <div
            className={styles.focusQuestion}
            style={{
              backgroundColor: `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`,
              color: `rgba(${font.r}, ${font.g}, ${font.b}, ${font.a})`,
            }}
          >
            {focusField}
          </div>

          <div className={pomodoroField} style={{ width: "50%" }}>
            <h1> {round}. Pomodoro time</h1>
            <CircularProgressbar
              value={PT}
              maxValue={totalPT}
              text={pomodoroTime}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Text size
                textSize: "16px",
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 1,
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                pathColor: `rgba(${bar.r}, ${bar.g}, ${bar.b}, ${PT / 100})`,
                textColor: "#000000",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>

          <div className={shortField} style={{ width: "50%" }}>
            <h1> {round}. Short break</h1>
            <CircularProgressbar
              value={ST}
              maxValue={totalST}
              text={shortBreak}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 1,
                pathColor: `rgba(${bar.r}, ${bar.g}, ${bar.b}, ${ST / 100})`,
                textColor: "#000000",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div className={longField} style={{ width: "50%" }}>
            <h1> {round}. Long break</h1>
            <CircularProgressbar
              value={LT}
              maxValue={totalLT}
              text={longBreak}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 1,
                pathColor: `rgba(${bar.r}, ${bar.g}, ${bar.b}, ${LT / 100})`,
                textColor: "#000000",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div className={styles.alertField}>
            <Collapse in={alertStart}>
              <Alert severity="info" variant="filled">
                The focus question field is empty, please add your own question!
              </Alert>
            </Collapse>
          </div>
          <div className={styles.buttonGroup}>
            <ButtonGroup
              variant="contained"
              size="large"
              aria-label="button group"
            >
              <Button type="button" onClick={handleStart}>
                Start
              </Button>
              <Button type="button" onClick={handlePause}>
                Pause
              </Button>
              <Button type="reset" onClick={handleReset}>
                Reset
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
