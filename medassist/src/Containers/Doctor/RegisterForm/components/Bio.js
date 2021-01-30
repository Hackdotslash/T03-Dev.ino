import React from "react";
import { TextField } from "@material-ui/core";

export default function Bio(props) {
  return (
    <>
      <TextField
        id="bio"
        value={props.value.bio}
        label="Bio and Experience"
        fullWidth
        multiline
        rows={5}
        onChange={props.getValue}
        color="secondary"
        error={props.value.isError.bio}
        helperText={props.value.isError.bio && "Please Enter a bio"}
      />
    </>
  );
}
