import React from "react";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { fetchSlots, fetchDays } from "./functions";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

const currentDate = new Date();

export default function SlotForm(props) {
  const [date, changeDate] = React.useState(currentDate);

  const [visibility, setVisibility] = React.useState(false);
  const [slots, setSlots] = React.useState({});
  const [days, setDays] = React.useState([]);
  const [loadingCalendar, setLoadingCalendar] = React.useState(true);
  const [loadingSlot, setLoadingSlot] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState();

  // use effect to fetch the days on which doctor is available
  React.useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      setMobile(true);
    }
    fetchDays(props.docId, setDays, setLoadingCalendar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableDays = (selectedDate) => {
    if (days === undefined) {
      return false;
    } else {
      return !days.includes(selectedDate.getDay());
    }
  };

  function callDate(selectedDate) {
    props.setValues({
      ...props.values,
      date:
        selectedDate.getDate() +
        "/" +
        (parseInt(selectedDate.getMonth()) + 1).toString() +
        "/" +
        selectedDate.getFullYear(),
      day: selectedDate.getDay(),
    });

    changeDate(selectedDate);
    setLoadingSlot(true);

    fetchSlots(
      props.docId,
      selectedDate.getDay(),
      setSlots,
      setVisibility,
      setLoadingSlot
    );
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          {loadingCalendar ? (
            <div style={{ marginTop: 16 }}>
              <LinearProgress color="primary" />
              <Typography>Fetching available days...</Typography>
            </div>
          ) : (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disablePast={true}
                shouldDisableDate={disableDays}
                fullWidth
                autoOk
                orientation={mobile ? "portrait" : "landscape"}
                variant={mobile ? "dialog" : "static"}
                openTo="date"
                value={date}
                onChange={callDate}
                maxDate={
                  new Date(
                    
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() + 6
                  )
                }
              />
            </MuiPickersUtilsProvider>
          )}
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography gutterBottom variant="h5" style={{ textAlign: "center" }}>
            Slots
          </Typography>
          {visibility ? (
            <Paper
              style={{
                height: "80%",
                paddingBottom:"16px",
              }}
            >
              <List style={{ maxHeight: "200px", overflow: "auto" }}>
                {loadingSlot ? (
                  <Typography variant="body1" color="secondary" align="center">
                    Fetching Slots
                  </Typography>
                ) : (
                  <>
                    {Object.keys(slots).length === 0 ? (
                      <Typography>No free slot available</Typography>
                    ) : (
                      <>
                        {Object.keys(slots).map((key, index) => (
                          <ListItem
                            button
                            selected={selectedIndex === index}
                            onClick={() => {
                              props.setValues({
                                ...props.values,
                                docSlot: key,
                                patSlot: slots[key],
                              });
                              setSelectedIndex(index);
                            }}
                          >
                            <ListItemIcon>
                              <WatchLaterIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={slots[key]}
                              color="secondary"
                            />
                          </ListItem>
                        ))}
                      </>
                    )}
                  </>
                )}
              </List>
            </Paper>
          ) : (
            <Paper
              style={{
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: 16,
              }}
            >
              Select a date to get available slots for that day
            </Paper>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="body1" color="error">
            {props.values.isError.patSlot && "*Please Select a slot to proceed"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
