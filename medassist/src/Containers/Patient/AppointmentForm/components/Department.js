import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Department(props) {
  return (
    <>
      <TextField
        id="department"
        name="department"
        label="Department"
        onChange={props.getValue}
        fullWidth
        color="secondary"
        value={props.value.department}
      />
    </>
  );
}
