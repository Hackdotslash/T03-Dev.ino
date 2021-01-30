import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { PayPalButton } from "react-paypal-button-v2";
import { addPatientData } from "../functions";
import { makeStyles } from "@material-ui/core/styles";
import * as emailjs from "emailjs-com";

// ------ EmailJS keys ----
const SERVICE_ID = "default_service";
const TEMPLATE_ID = "appointmentlink32";
const DOC_TEMPLATE_ID = "doctor_appointment_alert";
const USER_ID = "user_hFx7373RzIbFIpZiRFLxC";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "red",
  },
}));

export default function Payment(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const details = props.values;
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    }
  }, []);
  return (
    <div>
      <Container maxWidth="xs">
        {loading ? (
          <Backdrop className={classes.backdrop} open={true}>
            <Typography variant="h6" color="primary">
              Wait while we are processing your payment.!
            </Typography>{" "}
            &nbsp; &nbsp;
            <CircularProgress color="primary" size={24} />
          </Backdrop>
        ) : (
          <>
            <Grid container spacing={2} justify="center">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Typography gutterBottom variant="h5">
                  Booking Details
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  justifyContent: mobile ? "flex-start" : "center",
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={details.name}
                      secondary="Patient's Name"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={details.age} secondary="Age" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={details.gender} secondary="Gender" />
                  </ListItem>
                </List>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  justifyContent: mobile ? "flex-end" : "center",
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={details.doctor}
                      secondary="Doctor's Name"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={details.department}
                      secondary="Department"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={details.date + " - " + details.patSlot}
                      secondary="Slot"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </>
        )}
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} style={{ display: loading && "none" }}>
            <PayPalButton
              amount={props.amount}
              currency="USD"
              onSuccess={(details, data) => {
                console.log("payment successfull");
                props.setValues({
                  ...props.values,
                  transactionId: details.id,
                });
                addPatientData(props.values, props.id, details.id);

                setLoading(false);
                // ------- sending mail to patients
                var email_data = {
                  name: props.values.name,
                  to_email: props.values.email,
                  time: props.values.date + " - " + props.values.patSlot,

                  /*========== PRODUCTION ==========*/
                  link:
                    "https://devino-consultus.herokuapp.com/patient/meeting/" +
                    props.id +
                    "/" +
                    props.values.docId,

                  /*========== TESTING ==========*/
                  // link:
                  //   "localhost:3000/patient/meeting/" +
                  //   props.id +
                  //   "/" +
                  //   props.values.docId,
                };
                console.log(email_data)
                emailjs.send(SERVICE_ID, TEMPLATE_ID, email_data, USER_ID).then(
                  function (response) {
                    console.log(response.status, response.text);
                  },
                  function (err) {
                    console.log(err);
                  }
                );

                // Sending mail to doctor
                const doc_email_data = {
                  docName: props.values.doctor,
                  docMail: props.docData.Email,
                  patName: props.values.name,
                  time: props.values.date + " - " + props.values.docSlot,
                };

                emailjs
                  .send(SERVICE_ID, DOC_TEMPLATE_ID, doc_email_data, USER_ID)
                  .then(
                    function (response) {
                      console.log(response.status, response.text);
                    },
                    function (err) {
                      console.log(err);
                    }
                  );

                props.setActiveStep(props.activeStep + 1);
              }}
              onError={(err) => {
                props.setError(true);
                console.log("Error", err);
              }}
              onClick={(data, actions) => {
                setLoading(true);
              }}
              onCancel={() => {
                setLoading(false);
                props.setError(true);
                props.setActiveStep(props.activeStep + 1);
              }}
              style={{ color: "blue" }}
              options={{
                clientId:
                  "AWChTAgzHNpEJmmRujlBRhOVTagS2-kHdSqpHGtB4iGPdoo3pWkjQtvvpWmg85RHGTZCNk9Z25XB2Z3V",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
