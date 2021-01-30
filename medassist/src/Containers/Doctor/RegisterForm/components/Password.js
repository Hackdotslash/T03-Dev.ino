import React from "react";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function Password(props) {
  // adding custom validation for required field

  return (
    <>
      <TextField
        required
        id="password"
        name="password"
        label="Password"
        color="secondary"
        value={props.value.password}
        type={props.value.showPassword ? "text" : "password"}
        fullWidth
        autoComplete="password"
        onChange={props.getValue}
        error={props.value.isError.password}
        helperText={props.value.isError.password && "Password cannot be empty.!"}
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
