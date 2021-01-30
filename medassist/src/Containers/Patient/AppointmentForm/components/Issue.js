import React from "react";
import { TextField } from "@material-ui/core";

export default function Issue(props) {
  return (
    <>
      <TextField
        id="issue"
        value={props.value.issue}
        label="Issue"
        fullWidth
        multiline
        rows={5}
        onChange={props.getValue}
        error={props.value.isError.issue}
        helperText={props.value.isError.issue && "Please describe your issue"}
        color="secondary"
      />
    </>
  );
}
