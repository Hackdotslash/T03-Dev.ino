import React from "react";
import SelectTimezoneMaterialUi from "select-timezone-material-ui";

export default function Timezone(props) {
  return (
    <SelectTimezoneMaterialUi
      label="Timezone"
      onChange={props.getValue}
      value = {props.value.timezone}
      color="secondary"
      error={props.value.isError.timezone}
      helperText={props.value.isError.timezone && "timezone cannot be empty.!"}
      fullWidth
    />
  );
}
