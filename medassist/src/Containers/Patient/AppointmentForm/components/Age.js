import React from "react";
import { TextField } from "@material-ui/core";

export default function Age(props) {
  return (
    <>
      <TextField
        id="age"
        name="age"
        label="Age"
        color="secondary"
        onChange={props.getValue}
        fullWidth
        value={props.value.age}
        error={props.value.isError.age}
        helperText={props.value.isError.age && "Age cannot be empty"}
      />
    </>
  );
}
