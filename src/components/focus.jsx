import React, { useState } from "react";
import "./css/focus.css";

export default function Focus(props) {
  const [formInput, setFormInput] = useState(true);
  const [modifyInput, setModifyInput] = useState(false);

  const handleAddFocus = (e) => {
    e.preventDefault();
    props.handleFocusClick(e.target.value);
  };

  const handleSetFocus = (e) => {
    e.preventDefault();

    if (props.input.trim() === "") {
      alert("The focus question field is empty, please add your own question!");
    } else {
      setFormInput(false);
      setModifyInput(true);
    }
  };

  const handleModify = (e) => {
    setFormInput(true);
    setModifyInput(false);
  };

  const formField = formInput ? "showForm" : "hideForm";
  const modifyButton = modifyInput ? "showButton" : "hideButton";

  return (
    <div className="focus">
      <h1>Set your focus question</h1>
      <form
        action="#"
        className={formField}
        method="GET"
        onSubmit={handleSetFocus}
        required
      >
        <input
          type="text"
          className="focusField"
          value={props.input}
          onChange={handleAddFocus}
        />
        <input type="submit" className="focusButton" value="Set" />
      </form>
      <button type="button" className={modifyButton} onClick={handleModify}>
        Modify your focus question
      </button>
    </div>
  );
}
