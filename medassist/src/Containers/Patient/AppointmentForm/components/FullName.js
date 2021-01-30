import React from "react";
import TextField from "@material-ui/core/TextField";

export default function FullName(props) {
  return (
    <>
      <TextField
        id="fullName"
        name="fullName"
        label="Full Name"
        onChange={props.getValue}
        fullWidth
        color="secondary"
        value={props.value.name}
        error={props.value.isError.name}
        helperText={props.value.isError.name && "Name cannot be empty.!"}
      />
    </>
  );
}
