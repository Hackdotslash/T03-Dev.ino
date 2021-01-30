import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function Specialization(props) {
  const handleRemoveButton = (index) => {
    const values = [...props.specs];
    values.splice(index, 1);
    props.removeSpec(values);
  };

 

  return (
    <div>
      {props.specs.map((spec, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            name={"spec"}
            label="Specialization"
            value={spec.spec}
            onChange={(event) => props.handleSpec(index, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {index !== 0 && (
                    <IconButton
                      onClick={() => {
                        handleRemoveButton(index);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={props.addSpec}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}
