import React from "react";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const dayToIndex = (day) => {
  if (day === "Sunday") return 0;
  else if (day === "Monday") return 1;
  else if (day === "Tuesday") return 2;
  else if (day === "Wednesday") return 3;
  else if (day === "Thursday") return 4;
  else if (day === "Friday") return 5;
  else if (day === "Saturday") return 6;
};

export default function SlotPicker(props) {
  const [slot, setSlot] = React.useState({
    day: dayToIndex(props.day),
    isChecked: false,
    startChecked: false,
    startTimeHour: "",
    startTimeMinute: "",
    endTimeHour: "",
    endTimeMinute: "",
    day_name: props.day,
  });

  const [errorSt, setErrorSt] = React.useState(false);
  const [errorEnd, setErrorEnd] = React.useState(false);

  const handleDisabledHours = () => {
    let arr = [];
    for (var i = 0; i < slot.startTimeHour; i++) {
      arr.push(i);
    }

    return arr;
  };

  const handleDisabledMinutes = () => {
    let arr = [];
    if (slot.endTimeHour === slot.startTimeHour) {
      for (var i = 0; i <= slot.startTimeMinute; i++) {
        arr.push(i);
      }
      return arr;
    }
  };

  React.useEffect(() => {
    props.array.forEach(function (item) {
      if (item.day_name === props.day) {
        setSlot({
          isChecked: true,
          startTimeHour: item.startTimeHour,
          startTimeMinute: item.startTimeMinute,
          endTimeHour: item.endTimeHour,
          endTimeMinute: item.endTimeMinute,
          startChecked: true,
        });
      }
    });
  }, [props.array, props.day]);

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={slot.isChecked}
                onChange={(e) => {
                  // If particular day is checked
                  if (e.target.checked) {
                    // Enable Start Time Picker for that day
                    setSlot({ ...slot, isChecked: true });
                    setErrorSt(true);
                    props.setDisable(true);

                    // Push that day to scheduleArray
                    props.array.push(slot);
                  } else {
                    // Empty slot details of that day
                    setSlot({
                      day: dayToIndex(props.day),
                      isChecked: false,
                      startChecked: false,
                      startTimeHour: "",
                      startTimeMinute: "",
                    });
                    setErrorSt(false);
                    setErrorEnd(false);

                    // Remove that day from scheduleArray
                    props.array.forEach(function (item, index) {
                      if (item.day === dayToIndex(props.day)) {
                        props.array.splice(index, 1);
                      }
                    });
                    if (props.array.length === 0) {
                      props.setDisable(true);
                    }
                  }
                }}
              />
            }
            label={props.day}
          />
        </Grid>

        {/*.......... Start Time ..........*/}
        <Grid item xs={4}>
          <TimePicker
            style={{ marginTop: "8px" }}
            showSecond={false}
            placeholder={
              slot.startTimeHour === ""
                ? "15:00"
                : slot.startTimeHour + ":" + slot.startTimeMinute
            }
            disabled={!slot.isChecked}
            minuteStep={20}
            onChange={(value) => {
              if (value) {
                // if time selected, update it in scheduleArray.day.startTime
                props.array.forEach(function (item, index) {
                  if (item.day === dayToIndex(props.day)) {
                    item.startTimeHour = value.format("HH");
                    item.startTimeMinute = value.format("mm");
                  }
                });
                setSlot({
                  ...slot,
                  startChecked: true,
                  startTimeHour: value.format("HH"),
                  startTimeMinute: value.format("mm"),
                });
                setErrorSt(false);
                setErrorEnd(true);
                props.setDisable(true);
              } else {
                setSlot({
                  ...slot,
                  startTimeHour: "",
                  startTimeMinute: "",
                });
                setErrorSt(true);
                props.setDisable(true);
              }
            }}
          />
          {errorSt && (
            <FormHelperText style={{ color: "red" }}>
              {" "}
              *Start Time
            </FormHelperText>
          )}
        </Grid>

        {/*.......... End Time ..........*/}
        <Grid item xs={4}>
          <TimePicker
            style={{ marginTop: "8px" }}
            showSecond={false}
            disabledHours={() => handleDisabledHours()}
            disabledMinutes={() => handleDisabledMinutes()}
            placeholder={
              slot.endTimeHour === "" || slot.endTimeHour === undefined
                ? "15:00"
                : slot.endTimeHour + ":" + slot.endTimeMinute
            }
            disabled={!slot.startChecked}
            minuteStep={20}
            onChange={(value) => {
              if (value) {
                // if time selected, update it in scheduleArray.day.endTime
                props.array.forEach(function (item, index) {
                  if (item.day === dayToIndex(props.day)) {
                    item.endTimeHour = value.format("HH");
                    item.endTimeMinute = value.format("mm");
                  }
                });
                setSlot({
                  ...slot,
                  endTimeHour: value.format("HH"),
                  endTimeMinute: value.format("mm"),
                });
                setErrorEnd(false);
                props.setDisable(false);
              } else {
                setSlot({
                  ...slot,
                  endTimeHour: "",
                  endTimeMinute: "",
                });
                setErrorEnd(true);
                props.setDisable(true);
              }
            }}
          />
          {errorEnd && (
            <FormHelperText style={{ color: "red" }}> *End Time</FormHelperText>
          )}
        </Grid>
      </Grid>
    </>
  );
}
