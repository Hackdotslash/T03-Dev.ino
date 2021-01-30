import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Grid,
} from "@material-ui/core";
import VideoCall from "./VideoCall";
import moment from "moment";
// import { checkAppDate } from "../functions";

const columns = [
  { id: "slot", label: "Slot", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "id", label: "Patient ID", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

function createData(slot, status, id, action) {
  return { slot, status, id, action };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  default: {
    display: "flex",
    width: "100%",
    height: 440,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Appointments(props) {
  const classes = useStyles();
  const [currentDay, setCurrentDay] = React.useState(new Date().getDay());
  const [schedule, setSchedule] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [roomName, setRoomName] = React.useState("");
  const [onCall, setOnCall] = React.useState(false);
  // ---------------- add the feature later
  // const [attended, setAttended] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState({
    time: "",
    patId: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick(event) {
    setCurrentDay(event.currentTarget.value);
  }

  function handleVideoCall(e) {
    e.preventDefault();
    var room = e.currentTarget.value + "-" + props.docId;
    console.log("curent slot going to video call ",e.currentTarget.name);
    setRoomName(room);
    setCurrentSlot({
      time: e.currentTarget.name,
      patId: e.currentTarget.value,
    });
    setOnCall(true);
  }

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

  // converting time zone from GMT to doctor's
  const convertToLocal = (slot, dtz) => {
    let time = slot.split(":");
    let td = new Date();
    let today = new Date(
      Date.UTC(
        td.getFullYear(),
        td.getMonth(),
        td.getDate(),
        parseInt(time[0]),
        parseInt(time[1]),
        0
      )
    );
    today = new Date(today.toLocaleString("en-US", { timeZone: dtz }));
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(today.getMinutes()))
      return today.getHours() + ":0" + today.getMinutes();
    else return today.getHours() + ":" + today.getMinutes();
  };

  const handleDisable = (slot, patId) => {
    let today = new Date();
    if (today.getDay() !== currentDay) {
      return true;
    }
    let time = convertToLocal(slot, props.docData.TimeZone).split(":");
    let current_moment = today.getHours() + ":" + today.getMinutes();
    // let doc_moment = today.setHours(parseInt(time[0]), parseInt(time[1]));
    today.setHours(parseInt(time[0]), parseInt(time[1]));
    let doc_moment = today.getHours() + ":" + today.getMinutes();
    // ------------------ current moment + 20 min for a particular slot
    today.setHours(parseInt(time[0]), parseInt(time[1]) + 20);
    let inc_moment = today.getHours() + ":" + today.getMinutes();

    console.log(today.getHours(), today.getMinutes());
    let bool = moment(current_moment.toString(), "hh:mm").isBetween(
      moment(doc_moment.toString(), "hh:mm"),
      moment(inc_moment.toString(), "hh:mm")
    );
    return !bool;
  };

  React.useEffect(() => {
    Object.keys(props.appData).map((key) => {
      if (key === currentDay.toString()) {
        let rows = [];
        let ref = props.appData[key].Slot;
        // eslint-disable-next-line array-callback-return
        Object.keys(ref).map((key) => {
          let slot, status, id, action;
          slot = key;
          let local_time = convertToLocal(slot, props.docData.TimeZone);
          if (ref[key] === -1) {
            status = <span style={{ color: "blue" }}>Free</span>;
            id = "-";
            action = (
              <Button color="primary" variant="contained" disabled={true}>
                Start
              </Button>
            );
          } else {
            status = <span style={{ color: "green" }}>Occupied</span>;
            // patient's id
            id = ref[key];
            action = (
              <Button
                color="primary"
                variant="contained"
                disabled={handleDisable(key, id)}
                onClick={handleVideoCall}
                value={id}
                name={slot}
              >
                Start
              </Button>
            );
          }
          rows.push(createData(local_time, status, id, action));
        });
        setSchedule(rows);
      }
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay, props.appData]);

  return (
    <>
      {onCall ? (
        <VideoCall
          roomName={roomName}
          docId={props.docId}
          slot={currentSlot.time}
          day={currentDay}
          patId={currentSlot.patId}
          docData={props.docData}
          setDocData={props.setDocData}
          setOnCall={setOnCall}
          setView = {props.setView}
        />
      ) : (
        <React.Fragment>
          <Typography
            component="h1"
            variant="h4"
            color="secondary"
            gutterBottom
          >
            Appointments
          </Typography>

          {Object.entries(schedule).length === 0 ? (
            <Paper className={classes.default}>
              <Typography
                variant="h4"
                color="secondary"
                style={{ textAlign: "center" }}
              >
                You don't see patients on {indexToDay(currentDay)}
              </Typography>
            </Paper>
          ) : (
            <>
              <Typography
                variant="h6"
                color="secondary"
                style={{ textAlign: "center" }}
              >
                {indexToDay(currentDay)}'s Schedule
              </Typography>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedule
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={schedule.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          )}

          <Grid container spacing={1} style={{ marginTop: 16 }}>
            {Object.keys(props.appData).map((key, value) => (
              <>
                <Grid item>
                  <Button
                    onClick={handleClick}
                    value={key}
                    variant="contained"
                    color="primary"
                    style={{ width: 100 }}
                  >
                    {indexToDay(key)}
                  </Button>
                </Grid>
              </>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </>
  );
}
