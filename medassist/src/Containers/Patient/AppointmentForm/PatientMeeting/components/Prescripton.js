/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  TextareaAutosize,
  InputBase,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import canvas2image from "canvas2image-2";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

import firebaseinit from "../../../../Components/Firebase/firebaseAuth";

const PatientDb = firebaseinit.database().ref("Patients");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    margin: "1%",
    padding: "20px",
    width: "600px",
    border: "2px solid #888888",
    alignContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textArea: {
    margin: "1ch",
    border: "none",
    width: "100%",
    height: "100%",
    fontSize: 20,
    fontFamily: "Satisfy",
    resize: "none",
    "&:focus": {
      outline: "none",
    },
    doctorInfoDiv: {
      width: "100%",
      display: "flex",
      backgroundColor: "#888888",
    },
    doctorInfo: {
      flexDirection: "row-reverse",
    },
    title: {
      flexGrow: 1,
      fontFamily: "Kaushan Script",
    },
  },
}));

function Prescription(props) {
  const classes = useStyles();
  const componentRef = useRef();

  return (
    <div className={classes.root} id="divToPrint" ref={componentRef}>
      <Paper variant="outlined" square className={classes.paper}>
        <div>
          {/*========== Patient Information ==========*/}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/*========== Patient Information ==========*/}
              <TextField
                fullWidth
                style={{ margin: 8 }}
                id="standard-size-small"
                size="small"
                label="Patient Name"
                defaultValue={props.patData.Name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.textField}
                id="standard-size-small"
                size="small"
                label="Age"
                defaultValue={props.patData.Age}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.textField}
                id="standard-size-small"
                size="small"
                label="Gender"
                defaultValue={props.patData.Gender}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                fullWidth
                aria-label="minimum height"
                rows={13}
                rowsMax={13}
                value={props.patData.Prescription}
                className={classes.textArea}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              {/*========== Doctor Information ==========*/}

              <InputBase
                className={classes.doctorInfo}
                readOnly="true"
                size="small"
                defaultValue={props.Name}
                InputProps={{
                  "aria-label": "naked",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                background: "#1b262c",
                color: "#BBE1FA",
                textAlign: "right",
                alignItem: "center",
              }}
            >
              <LocalHospitalIcon style={{ fontSize: 36 }} />
              <Typography variant="h6" style={{ fontFamily: "Kaushan Script" }}>
                consultUS
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default Prescription;
