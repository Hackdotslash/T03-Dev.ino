import { TextField } from "@material-ui/core";
import React from "react";

export default function ConvertedFees(props) {
 
  return (
    <div>
      <div>
        <TextField
          id="fees"
          name="fees"
          label="Consultation Fees in USD"
          value={props.value.amountUSD}
          color="secondary"
          fullWidth
          autoComplete="Doc Links"
          
          // error={props.value.isError.imgURL}
          // helperText={props.value.isError.imgURL && "Select your profile picture"}
        />
      </div>
    </div>
  );
}
