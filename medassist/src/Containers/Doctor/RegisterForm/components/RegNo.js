import React from "react";
import { TextField } from "@material-ui/core";

export default function RegNo(props) {
  // check if value is null

  return (
    <>
      <TextField
        id="reg-no"
        name="reg-no"
        label="Registration Number"
        fullWidth
        required
        value={props.value.reg}
        onChange={props.getValue}
        color="secondary"
        autoComplete="reg-no"
        error={props.value.isError.reg}
        helperText={
          props.value.isError.reg && "Please Enter your registration No."
        }
      />
    </>
  );
}
