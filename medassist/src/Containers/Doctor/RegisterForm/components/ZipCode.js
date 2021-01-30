import React from "react";
import { TextField } from "@material-ui/core";

export default function ZipCode(props) {
  return (
    <div>
      <TextField
        id="zipcode"
        value={props.value.zipcode}
        label="Zip-code"
        fullWidth
        onChange={props.getValue}
        color="secondary"
        error={props.value.isError.zipcode}
        helperText={props.value.isError.zipcode && "Zipcode cannot be empty.!"}
      />
    </div>
  );
}
