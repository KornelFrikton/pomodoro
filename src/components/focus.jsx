import React, { useState } from "react";

import { TextField, Button, FormGroup } from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

import styles from "./css/focus.module.css";

export default function Focus(props) {
  const [formInput, setFormInput] = useState(true);
  const [editButton, setEditButton] = useState(true);
  const [alert, setAlert] = useState(false);

  const handleAddFocus = (e) => {
    e.preventDefault();
    props.handleFocusClick(e.target.value);
  };

  const handleSetFocus = (e) => {
    e.preventDefault();

    if (props.input.trim() === "") {
      setAlert(true);
    } else {
      setFormInput(false);
      setEditButton(false);
      setAlert(false);
      props.setAlertStart(false);
    }
  };

  const handleModify = (e) => {
    setFormInput(true);
    setEditButton(true);
  };

  const formField = formInput ? styles.showForm : styles.hideForm;

  return (
    <div className={styles.focus}>
      <h1>Set your focus question</h1>
      <form
        action="#"
        className={formField}
        method="GET"
        onSubmit={handleSetFocus}
        required
      >
        <FormGroup className={styles.groupField} row>
          <TextField
            id={styles.focusText}
            type="text"
            variant="standard"
            size="medium"
            value={props.input}
            onChange={handleAddFocus}
          />
          <Button variant="contained" startIcon={<AddBoxIcon />} type="submit">
            Set
          </Button>
        </FormGroup>
      </form>
      <Collapse in={alert}>
        <Alert severity="info" variant="filled">
          The focus question field is empty, please add your own question!
        </Alert>
      </Collapse>
      <Button
        disabled={editButton}
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handleModify}
      >
        Edit
      </Button>
    </div>
  );
}
