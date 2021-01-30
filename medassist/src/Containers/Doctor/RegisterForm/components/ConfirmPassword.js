import React from "react";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function ConfirmPassword(props) {
  // check if input is null

  return (
    <>
      <TextField
        required
        id="cPassword"
        name="cPassword"
        label="Confirm Password"
        color="secondary"
        value={props.value.cpass}
        type={props.value.showPassword ? "text" : "password"}
        fullWidth
        autoComplete="password"
        onChange={props.getValue}
        error={props.value.isError.cpass}
        helperText={props.value.isError.cpass && "Passwords do no match!"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.checkClick}
                onMouseDown={props.show}
              >
                {props.value.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
