import React from "react";
import { TextField } from "@material-ui/core";

export default function Email(props) {
  // adding custom validation for required field

  return (
    <>
      <TextField
        id="email"
        name="email"
        label="E-Mail"
        color="secondary"
        onChange={props.getValue}
        fullWidth
        value={props.value.email}
        error={
          (props.value.isError.email === 1 ||
            props.value.isError.email === 2) &&
          true
        }
        helperText={
          (props.value.isError.email === 1 && "Please Enter your Email") ||
          (props.value.isError.email === 2 && "Invalid Email Address")
        }
      />
    </>
  );
}
