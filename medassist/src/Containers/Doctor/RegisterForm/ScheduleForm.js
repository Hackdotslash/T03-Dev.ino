import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// custom imports
import Scheduler from "./components/Scheduler";
import { FormHelperText } from "@material-ui/core";

export default function ScheduleForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Consultation Schedule
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              Day
            </Grid>
            <Grid item xs={4}>
              Start Time
            </Grid>
            <Grid item xs={4}>
              End Time
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Scheduler
            array={props.array}
            disable={props.disable}
            setDisable={props.setDisable}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="schedulerChecked"
                checked={props.scheduleCheck}
                onChange={(e) => {
                  props.setScheduleCheck(e.target.checked);
                }}
              />
            }
            label="I'll be available on consultUS on the provided days and times"
          />
          <FormHelperText style={{ color: "red" }}>
            {" "}
            {props.scheduleError}
          </FormHelperText>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
