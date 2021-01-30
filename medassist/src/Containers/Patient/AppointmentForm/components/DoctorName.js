import React from "react";
import TextField from "@material-ui/core/TextField";

export default function DoctorName(props) {
  return (
    <>
      <TextField
        id="docName"
        name="docName"
        label="Doctor's Name"
        onChange={props.getValue}
        fullWidth
        color="secondary"
        value={props.value.doctor}
      />
    </>
  );
}
