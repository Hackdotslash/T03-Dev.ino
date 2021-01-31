/* eslint-disable no-unused-vars */
// -------------------- Patient Meeting link will be available here --------- //
// props passed -> patientid as PatId, doctorid as DoctId

import React from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  Backdrop,
  Icon,
  TextField,
  Snackbar,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { jsPDF } from "jspdf";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SendIcon from "@material-ui/icons/Send";

import PatientMeetingStyles from "./styles";
import CardPreloader from "./components/CardPreloader";
import VideoCall from "./components/VideoCall";
import symbol from "../../../Assets/symbol.png";
import footer from "../../../Assets/footer.jpg";
import rx from "../../../Assets/rx.png";
import { satisfy, charm, kaushanScript } from "./components/fonts";

import { fetchDoctorName, fetchPatientData, sendFeedBack } from "./functions";
import Alert from "@material-ui/lab/Alert";

export default function PatientMeeting(props) {
  const classes = PatientMeetingStyles();

  // props will pe passed here
  const PatId = props.props.match.params.patId;
  const DoctId = props.props.match.params.docId;

  const [loading, setLoading] = React.useState(true);
  const [doctorData, setDoctorData] = React.useState({});
  const [patData, setPatData] = React.useState({});
  const [disable, setDisable] = React.useState(true);
  const [roomName, setRoomName] = React.useState("");
  const [onCall, setCall] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [endMeeting, setEndMeeting] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetchDoctorName(DoctId, setDoctorData);
    fetchPatientData(PatId, setPatData, setLoading, setDisable);
  }, [DoctId, PatId, props.doctId]);

  function handleClick(e) {
    e.preventDefault();
    var room = PatId + "-" + DoctId;
    setRoomName(room);
    setCall(true);
  }

  // ------ function to add feedbacks 
  function Feedback() {
    const feedback = {
      Patient_Name: patData.Name,
      Doctor_ID: DoctId,
      Doctor_Name: doctorData.Name,
      Department: doctorData.Department,
      Message: message,
    };
    sendFeedBack(PatId, feedback);
    setOpen(false);
    setSnackOpen(true);
  }

  const generatePDF = () => {
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (parseInt(today.getMonth()) + 1).toString() +
      "-" +
      today.getFullYear();
    let doc = new jsPDF("p", "pt");

    doc.addFileToVFS("Charm-Regular.ttf", charm);
    doc.addFileToVFS("Satisfy-Regular.ttf", satisfy);
    doc.addFileToVFS("KaushanScript-Regular.ttf", kaushanScript);

    doc.addFont("KaushanScript-Regular.ttf", "KaushanScript", "normal");
    doc.addFont("Satisfy-Regular.ttf", "Satisfy", "normal");
    doc.addFont("Charm-Regular.ttf", "Charm", "normal");

    // Header
    doc.setFillColor("#BBE1FA");
    doc.rect(0, 20, 595, 120, "F");
    doc.setFont("Charm");
    doc.setFontSize(18);
    doc.text(40, 60, doctorData.Name);
    doc.setFontSize(10);
    doc.setFont("custom");

    // eslint-disable-next-line array-callback-return
    Object.keys(doctorData.Specialization).map((key, index) => {
      doc.text(40, 80 + index * 15, doctorData.Specialization[key]);
    });
    doc.addImage(symbol, "png", 460, 35, 90, 90);
    doc.setFillColor("#BBE1FA");
    doc.line(30, 0, 30, 842, "F");
    doc.line(0, 744, 595, 744, "F");

    doc.setFontSize(16);
    doc.text(40, 180, "Patient Name:");
    doc.text(150, 180, patData.Name);
    doc.text(40, 210, "Gender:");
    doc.text(150, 210, patData.Gender);
    doc.text(298, 180, "Patient Age:");
    doc.text(390, 180, patData.Age);

    doc.addImage(rx, "png", 40, 250, 40, 40);
    doc.setFont("Satisfy");
    doc.text(60, 320, patData.Prescription);

    // --------- Footer
    doc.setFillColor("#BBE1FA");
    doc.addImage(footer, "png", 0, 764, 595, 60);

    doc.save("consultUS_" + doctorData.Department + "_" + date + ".pdf");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Thank you for your valuable feedback</Alert>
      </Snackbar>
      {onCall ? (
        <>
          <VideoCall
            roomName={roomName}
            patId={PatId}
            patData={patData}
            doctorData={doctorData}
            setEndMeeting={setEndMeeting}
            setCall={setCall}
          />
        </>
      ) : (
        <>
          {loading ? (
            <>
              <CardPreloader />
            </>
          ) : (
            <Container maxWidth="md" className={classes.container}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Card className={classes.card} elevation={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography
                          align="center"
                          className={classes.heading}
                          variant="h5"
                        >
                          <Icon className={classes.icon}>
                            <AssignmentIcon />
                          </Icon>
                          Appointment details and link
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <CardContent className={classes.CardContent}>
                          <Typography gutterBottom variant="h6">
                            {" "}
                            Name of the patient :
                            <Typography
                              display="inline"
                              variant="h5"
                              className={classes.typography}
                            >
                              {patData.Name}
                            </Typography>
                          </Typography>
                          <Typography gutterBottom variant="h6">
                            {" "}
                            Email :
                            <Typography
                              display="inline"
                              variant="h5"
                              className={classes.typography}
                            >
                              {patData.Email}
                            </Typography>
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <CardContent className={classes.CardContent}>
                          <Typography gutterBottom variant="h6">
                            {" "}
                            Consulting Doctor :
                            <Typography display="inline" variant="h5">
                              {doctorData.Name}
                            </Typography>
                          </Typography>
                          <Typography gutterBottom variant="h6">
                            {" "}
                            Date and Time :
                            <Typography
                              display="inline"
                              variant="h5"
                              className={classes.typography}
                            >
                              {patData.Date} {patData.Time}
                            </Typography>
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography align="center" variant="subtitle1">
                          Link will be active only for 20 min from your booking
                          time.!
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        style={{
                          margin: "8px",
                          display: "flex",
                          justifyContent: "space-around",
                          paddingBottom: "10px",
                        }}
                      >
                        {disable ? (
                          <Button
                            disabled={true}
                            className={classes.disabled_button}
                          >
                            Not available
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClick}
                          >
                            Click to connect
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                {endMeeting && (
                  <>
                    <Grid
                      item
                      xs={12}
                      color="primary"
                      variant="contained"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        onClick={() => setOpen(true)}
                        variant="contained"
                        color="secondary"
                        style={{ margin: 8 }}
                      >
                        Add Feedback
                      </Button>
                      <Button
                        onClick={generatePDF}
                        variant="contained"
                        color="secondary"
                        style={{ margin: 8 }}
                      >
                        Download Prescription
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => props.props.history.push("/home")}
                        style={{ margin: 8 }}
                      >
                        Go to Home
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
              {/* end alert dialog box */}
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h4" color="secondary">
                        Feedback Form
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="doc_name"
                        label="Patient Name"
                        value={patData.Name}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="doc_mail"
                        label="Email ID"
                        value={patData.Email}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="doc_id"
                        label="consultUS ID"
                        value={PatId}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="msg"
                        multiline
                        rows={6}
                        label="Message"
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.buttonGrid}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={message === ""}
                        onClick={Feedback}
                        endIcon={<SendIcon />}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
            </Container>
          )}
        </>
      )}
    </React.Fragment>
  );
}
