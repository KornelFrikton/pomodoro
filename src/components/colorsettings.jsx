import React, { useState } from "react";
import CirclePicker from "react-color";
import "./css/colorsettings.css";

export default function ColorSettings(props) {
  const [background, setBackground] = useState("#F5B82E");
  const [fontColor, setFontColor] = useState("#000000");
  const [barColor, setBarColor] = useState('#78BC61');

  //Bakground color
  const onChangeBackground = (color) => {
    setBackground(color);
    setTimeout(() => {
      props.onColorSelectBackground(color);
    });
  };

  //Font color
  const onChangeFont = (color) => {
    setFontColor(color);
    setTimeout(() => {
      props.onColorSelectFont(color);
    });
  };

  //Bar color
  const onChangeBar = (color) => {
    setBarColor(color);
    setTimeout(() => {
      props.onColorSelectBar(color);
    });
  };

  return (
    <div className="settings">
      <h1>Color settings</h1>
      <div className="colorSettings">
        <div className="colorField">
          <h3>Background color</h3>
          <CirclePicker color={background} onChange={onChangeBackground} />
        </div>
        <div className="colorField">
          <h3>Font color</h3>
          <CirclePicker color={fontColor} onChange={onChangeFont} />
        </div>
        <div className="colorField">
          <h3>Progress bar color</h3>
          <CirclePicker color={barColor} onChange={onChangeBar} />
        </div>
      </div>
    </div>
  );
}
