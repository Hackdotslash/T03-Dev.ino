import React from "react";
import { TextField } from "@material-ui/core";

export default function City(props) {
  return (
    <div>
      <TextField
        id="city"
        value={props.value.city}
        label="City,State"
        fullWidth
        onChange={props.getValue}
        color="secondary"
        error={props.value.isError.city}
        helperText={props.value.isError.city && "Please Enter your city.!"}
      />
    </div>
  );
}
