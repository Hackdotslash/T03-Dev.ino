import React from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";

import { createSlots } from "./functions";

const indexToDay = (dayIndex) => {
  return (
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayIndex] || ""
  );
};

export default function Review(props) {
  const schedule = createSlots(props.values.scheduleArray);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Information
      </Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText primary={props.values.name} secondary="Full Name" />
            </ListItem>
            <ListItem>
              <ListItemText primary={props.values.email} secondary="E-Mail" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={props.values.department}
                secondary="Department"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={props.values.reg}
                secondary="Registration Number"
              />
            </ListItem>
            <div>
              {props.specs.map((item, index) => (
                <ListItem>
                  <ListItemText
                    primary={item.spec}
                    secondary={"Specialization-" + (index + 1).toString()}
                  />
                </ListItem>
              ))}
            </div>

            <ListItem>
              <ListItemText
                primary={props.values.bio}
                secondary="Bio and Experience"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={props.values.imgURL}
            alt={props.values.name}
            style={{ margin: 32, height: 200, width: "auto" }}
          />

          <div>
            <List dense>
              Time in GMT
              {Object.keys(schedule).map((key) => (
                <ListItem>
                  <ListItemText
                    primary={
                      schedule[key].start_time + " to " + schedule[key].end_time
                    }
                    secondary={indexToDay(key)}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>

      <FormControlLabel
        control={
          <Checkbox
            color="secondary"
            name="correct"
            checked={props.submitCheck}
            onChange={(e) => {
              props.setSubmitCheck(e.target.checked);
            }}
          />
        }
        label="All the information entered by me is correct."
      />
      <FormHelperText style={{ color: "red" }}>
        {" "}
        {props.submitError}
      </FormHelperText>
    </React.Fragment>
  );
}
