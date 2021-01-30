import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import countryList from "react-select-country-list";

export default function Country(props) {
  return (
    <div>
      <FormControl
        style={{ width: "100%" }}
        error={props.value.isError.country}
      >
        <InputLabel htmlFor="CountryLabel">Country </InputLabel>
        <Select
          labelId="CountryLabel"
          id="country"
          value={props.value.country}
          onChange={props.getValue}
        >
          {countryList()
            .getData()
            .map((key) => (
              <MenuItem value={key.label}>{key.label}</MenuItem>
            ))}
        </Select>
        <FormHelperText>
          {props.value.isError.country && "Select your country"}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
