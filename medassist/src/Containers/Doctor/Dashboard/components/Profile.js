import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  TextareaAutosize,
  Tooltip,
  Divider,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import DescriptionIcon from "@material-ui/icons/Description";

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
    marginBottom: 16,
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
  imgSelected: {
    height: "65vh",
    "@media (min-width: 300px)": {
      width: "300px",
    },

    "@media (min-width: 350px)": {
      width: "300px",
    },

    "@media (min-width: 768px)": {
      width: "auto",
    },
    "@media (min-width: 992px)": {
      width: "auto",
    },
  },
}));

export default function Profile(props) {
  const classes = profileStyles();

  const [currentImage, setCurrentImage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (url) => {
    console.log(url);
    setCurrentImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.docData);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          {/*==========  Basic Details =========*/}
          <Paper
            elevation={0}
            className={classes.paperProfile}
            variant="outlined"
          >
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <Avatar
                    alt={
                      props.docData.Gender === "Female"
                        ? require("../../../../Assets/Avatars/DoctorAvatar-Female.jpg")
                        : require("../../../../Assets/Avatars/DoctorAvatar-Male.jpg")
                    }
                    src={props.docData.imageURL}
                    className={classes.avatar}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Typography gutterBottom variant="h5">
                      <b>{props.docData.Name}</b>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {Object.keys(props.docData.Specialization).map(
                        (key, value) => (
                          <span>{props.docData.Specialization[key]}, </span>
                        )
                      )}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ID: {props.ID}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {props.docData.Verification_status === 0 ? (
                      <>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          {" "}
                          Not verified
                          <Typography
                            display="inline"
                            variant="subtitle1"
                            color="secondary"
                          >
                            <Tooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    What it means ?
                                  </Typography>
                                  <Typography variant="body2">
                                    {
                                      "You have not uploaded your documents on consultUS. That means you will "
                                    }
                                    <u>
                                      {
                                        "not appear on the doctor's page for appointment"
                                      }
                                    </u>
                                    . {"Please upload your documents."}
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <InfoOutlinedIcon />
                            </Tooltip>
                          </Typography>
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="body2"
                        style={{ cursor: "pointer", color: "green" }}
                      >
                        Verified
                      </Typography>
                    )}
                  </Grid>
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
                {props.docData.Department}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              <b>Medical Registration Number</b>
              <Typography gutterBottom variant="subtitle1">
                {props.docData.Registration_No}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              <b>Bio and Experience</b>
              <Typography gutterBottom variant="body1">
                <TextareaAutosize
                  rows={4}
                  rowsMax={4}
                  defaultValue={props.docData.Bio}
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
              Schedule in GMT
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ textAlign: "center" }}
            >
              <Grid container>
                <Grid item xs={6} sm={4}>
                  <Divider />
                  <b>Day</b>
                  <Divider />
                </Grid>
                <Grid item xs={3} sm={4}>
                  <Divider />
                  <b>Start</b>
                  <Divider />
                </Grid>

                <Grid item xs={3} sm={4}>
                  <Divider />
                  <b>End</b>
                  <Divider />
                </Grid>

                {Object.keys(props.docData.Schedule).map((key, value) => (
                  <>
                    <Grid item xs={6} sm={4}>
                      {indexToDay(key)}
                    </Grid>
                    <Grid item xs={3} sm={4}>
                      {props.docData.Schedule[key].start_time}
                    </Grid>
                    <Grid item xs={3} sm={4}>
                      {props.docData.Schedule[key].end_time}
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
              {props.docData.DocUrls === undefined ? (
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
                  {Object.keys(props.docData.DocUrls).map((key, index) => (
                    <Grid item>
                      <IconButton
                        onClick={() => handleOpen(props.docData.DocUrls[key])}
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
            className={classes.imgSelected}
          />
        </Fade>
      </Modal>
    </div>
  );
}
