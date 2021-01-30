import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

export default function Gender(props) {
  return (
    <div>
      <>
        <FormControl
          style={{ width: "100%" }}
          error={props.value.isError.gender}
        >
          <InputLabel htmlFor="GenderLabel">Gender </InputLabel>
          <Select
            labelId="GenderLabel"
            id="gender"
            value={props.value.gender}
            onChange={props.getValue}
          >
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
          <FormHelperText>
            {props.value.isError.gender && "Gender cannot be empty.!"}
          </FormHelperText>
        </FormControl>
      </>
    </div>
  );
}
