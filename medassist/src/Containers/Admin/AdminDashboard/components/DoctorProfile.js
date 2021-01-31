import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  TextareaAutosize,
  Button,
  Divider,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import theme from "../../../../Components/Theme";

import {
  verifyDoctor,
  unVerifyDoctor,
  addTotalFees,
  consultUSCharges,
} from "../functions";

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

const profileStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperProfile: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
  },
  image: {
    width: 200,
    height: 200,
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  details: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  bio: {
    width: "100%",
    border: "none",
    "& focus": {
      border: "none",
    },
    ...theme.typography.body2,
    resize: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feesTitle: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function DoctorProfile(props) {
  const classes = profileStyles();
  const docData = props.doctor[props.doctorProfileId];

  const [currentImage, setCurrentImage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [transCharge, setTransCharge] = React.useState(docData.TransactionFees);
  const [comPercent, setcomPercent] = React.useState(0);

  // consultUS Comission in percentage
  // const comPercent = 10;
  const orgFees = (
    (parseFloat(docData.feesUSD) * comPercent) / 100 +
    parseFloat(docData.feesUSD)
  ).toFixed(2);

  React.useEffect(() => {
    consultUSCharges(setcomPercent);
  }, [comPercent]);

  const [totalFees, setTotalFees] = React.useState(
    docData.TotalFees === "" ? orgFees : docData.TotalFees
  );

  const handleOpen = (url) => {
    console.log(url);
    setCurrentImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verify = () => {
    verifyDoctor(props.doctorProfileId, docData.Department);
    delete props.doctor[props.doctorProfileId];
    props.setUnverfiedDoctors(props.doctor);
    props.setView(1);
  };

  const unVerify = () => {
    unVerifyDoctor(props.doctorProfileId, docData.Department);
    delete props.doctor[props.doctorProfileId];
    props.setVerifiedDoctors(props.doctor);
    props.setView(2);
  };

  const calculateFees = () => {
    let fees =
      parseFloat(docData.feesUSD) +
      (parseFloat(docData.feesUSD) * comPercent) / 100 +
      parseFloat(transCharge);
    fees = fees.toFixed(2);
    // console.log(fees);
    setTotalFees(fees);
    // sending data to firebase

    addTotalFees(props.doctorProfileId, transCharge, fees);
  };
  // console.log(props.doctorProfileId, props.doctor[props.doctorProfileId]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {/*==========  Basic Details =========*/}
        <Grid item sm={12} md={6}>
          <Paper
            elevation={0}
            className={classes.paperProfile}
            variant="outlined"
          >
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <Avatar src={docData.imageURL} className={classes.avatar} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Typography gutterBottom variant="h5">
                      <b>{docData.Name}</b>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {Object.keys(docData.Specialization).map((key, value) => (
                        <span>{docData.Specialization[key]}, </span>
                      ))}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ID: {props.doctorProfileId}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        docData.Verification_status === 0
                          ? verify()
                          : unVerify();
                      }}
                      variant="contained"
                      color={
                        docData.Verification_status === 0
                          ? "primary"
                          : theme.palette.success.main
                      }
                      size="small"
                    >
                      {docData.Verification_status === 0
                        ? "Verify"
                        : "Verified"}
                    </Button>
                  </Grid>
                  {docData.Verification_status !== 0 && (
                    <>
                      {/* Check doctor's transaction logs */}
                      {/* <Grid item>
                        <Button
                          variant="contained"
                          color={"primary"}
                          size="small"
                          onClick={() => props.setView(10)}
                        >
                          Check Transcation logs
                        </Button>
                      </Grid> */}
                      {/* Check doctor's patient logs */}
                      <Grid item>
                        <Button
                          variant="contained"
                          color={"primary"}
                          size="small"
                          onClick={() => props.setView(11)}
                        >
                          Check Patient logs
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/*==========  Info and Bio =========*/}
        <Grid item sm={12} md={6}>
          <Paper elevation={0} className={classes.paper} variant="outlined">
            <Typography gutterBottom variant="subtitle2">
              <b>Department </b>
              <Typography gutterBottom variant="subtitle1">
                {docData.Department}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              <b>Medical Registration Number</b>
              <Typography gutterBottom variant="subtitle1">
                {docData.Registration_No}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              <b>Bio and Experience</b>
              <Typography gutterBottom variant="body1">
                <TextareaAutosize
                  rows={4}
                  rowsMax={4}
                  defaultValue={docData.Bio}
                  className={classes.bio}
                  readOnly
                />
              </Typography>
            </Typography>
          </Paper>
        </Grid>

        {/*==========  Schedule =========*/}
        <Grid item sm={12} md={6}>
          <Paper elevation={0} className={classes.paper} variant="outlined">
            <Typography
              gutterBottom
              variant="h6"
              style={{ textAlign: "center" }}
            >
              Schedule (in GMT)
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ textAlign: "center" }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <Divider />
                  <b>Day</b>
                  <Divider />
                </Grid>
                <Grid item xs={4}>
                  <Divider />
                  <b>Start Time</b>
                  <Divider />
                </Grid>

                <Grid item xs={4}>
                  <Divider />
                  <b>End Time</b>
                  <Divider />
                </Grid>

                {Object.keys(docData.Schedule).map((key, value) => (
                  <>
                    <Grid item xs={4}>
                      {indexToDay(key)}
                    </Grid>
                    <Grid item xs={4}>
                      {docData.Schedule[key].start_time}
                    </Grid>
                    <Grid item xs={4}>
                      {docData.Schedule[key].end_time}
                    </Grid>
                  </>
                ))}
              </Grid>
            </Typography>
          </Paper>
        </Grid>

        {/*========== Documents =========*/}
        <Grid item sm={12} md={6}>
          <Paper elevation={0} className={classes.paper} variant="outlined">
            <Typography gutterBottom variant="h6">
              <b>Documents </b>
            </Typography>
            <Grid container>
              {docData.DocUrls === undefined ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" color="secondary">
                    You haven't uploaded any documents yet. <br />
                    Uploaded documents will be shown here
                  </Typography>
                </div>
              ) : (
                <>
                  {Object.keys(docData.DocUrls).map((key, index) => (
                    <Grid item>
                      <IconButton
                        onClick={() => handleOpen(docData.DocUrls[key])}
                      >
                        <DescriptionIcon
                          style={{
                            fontSize: "80px",
                          }}
                          color="secondary"
                        />
                      </IconButton>
                      <br />
                      <Typography variant="body1" align="center">
                        {"Doc-" + (index + 1).toString()}
                      </Typography>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/*========== Other Details =========*/}
        <Grid item sm={12} md={6}>
          <Paper elevation={0} className={classes.paper} variant="outlined">
            <Typography gutterBottom variant="subtitle2">
              <b>Date {"&"} Time of Registration: </b>
              <Typography gutterBottom variant="subtitle1">
                {docData.DOR}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              <b>Country, City, Zip-Code</b>
              <Typography gutterBottom variant="subtitle1">
                {docData.Country}, {docData.City}, {docData.ZipCode}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              <b>E-Mail</b>
              <Typography gutterBottom variant="subtitle1">
                {docData.Email}
              </Typography>
            </Typography>
          </Paper>
        </Grid>

        {/*========== Fees Section =========*/}
        <Grid item sm={12} md={6}>
          <Paper elevation={0} className={classes.paper} variant="outlined">
            <Grid container spacing={2}>
              {/* Quoted fees */}
              <Grid item xs={4} className={classes.feesTitle}>
                <Typography gutterBottom variant="body1">
                  <b>Quoted Fees:</b>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={docData.feesUSD}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* consultUS Charges */}
              <Grid item xs={4} className={classes.feesTitle}>
                <Typography gutterBottom variant="body1">
                  <b>consultUS Charges:</b>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  label={comPercent + "% of Quoted Price"}
                  value={Math.round(docData.feesUSD * comPercent) / 100}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Transaction Charges */}
              <Grid item xs={4} className={classes.feesTitle}>
                <Typography gutterBottom variant="body1">
                  <b>Transaction Charges:</b>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={transCharge}
                  onChange={(e) => {
                    setTransCharge(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Transaction Charges */}
              <Grid item xs={4} className={classes.feesTitle}>
                <Typography gutterBottom variant="body1">
                  <b>Total Fees:</b>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={totalFees}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={calculateFees}
                  variant="contained"
                  color="primary"
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* ============== Modal Part ================== */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <img
            src={currentImage}
            alt="docs"
            style={{ height: "65vh", width: "auto" }}
          />
        </Fade>
      </Modal>
    </div>
  );
}
