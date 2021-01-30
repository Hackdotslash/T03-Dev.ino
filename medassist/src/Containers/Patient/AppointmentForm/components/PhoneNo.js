import React from "react";
import MuiPhoneNumber from "material-ui-phone-number";

export default function PhoneNo(props) {
  return (
    <>
      <MuiPhoneNumber
        id="phone"
        name="phone"
        label="Phone Number"
        color="secondary"
        defaultCountry={"us"}
        onChange={props.getValue}
        fullWidth
        value={props.value.phone}
        error={props.value.isError.phone}
        helperText={
          props.value.isError.phone && "Please Enter your phone number"
        }
      />
    </>
  );
}
