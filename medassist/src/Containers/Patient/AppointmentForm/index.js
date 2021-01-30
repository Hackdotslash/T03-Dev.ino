import React from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import customTheme from "../../../Components/Theme";
import { Link } from "react-router-dom";

import useStyles from "./styles";

// custom imports
import DetailsForm from "./DetailsForm";
import SlotForm from "./SlotForm";
import Payment from "./components/Payment";
import { fetchPatId, fetchDocData } from "./functions";
import { detailsSubmit, scheduleSubmit } from "./Validation";

const steps = ["Patient Details", "Book Slot", "Payment"];
export default function RegisterForm(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [patientId, setPatientId] = React.useState("");
  const [docData, setDocData] = React.useState({});
  const [values, setValues] = React.useState({
    doctor: props.docName,
    docId: props.docId,
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    day: "",
    docSlot: "",
    issue: "",
    patSlot: "",
    imageFiles: [],
    PatUrls: {},
    urlCount: 0,
    date: new Date(),
    transactionId: 0,
    department: props.department,
    isError: {
      name: false,
      email: 0,
      phone: false,
      gender: false,
      age: false,
      patSlot: false,
      issue: false,
    },
    click: 0,
  });

  const [error, setError] = React.useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangePhone = (prop) => (event) => {
    setValues({ ...values, [prop]: event });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <DetailsForm
            changeHandler={handleChange}
            handleChangePhone={handleChangePhone}
            values={values}
            setValues={setValues}
            id={patientId}
          />
        );
      case 1:
        return (
          <SlotForm
            docId={values.docId}
            values={values}
            setValues={setValues}
          />
        );
      case 2:
        return (
          <Payment
            values={values}
            setValues={setValues}
            id={patientId}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            amount={docData.TotalFees}
            setError={setError}
            docData={docData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    fetchPatId(setPatientId);
    fetchDocData(setDocData, props.docId);
  }, [props.docId]);

  return (
    <React.Fragment>
      <div style={{ height: "7.5vh" }}></div>
      <main className={classes.layout}>
        <ThemeProvider theme={customTheme}>
          <Paper className={classes.paper} variant="outlined">
            <Typography component="h1" variant="h4" align="center">
              Patient Appointment Form
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  {error !== "" ? (
                    <>
                      <Typography variant="h5" gutterBottom color="error">
                        Appointment Booking Failed.!
                      </Typography>
                      <Typography variant="subtitle1">
                        There was some issue in booking your appointment. Please
                        try refreshing the page.
                        <br />
                        If you still face any issue in booking, you can mail us
                        at query.consultus@gmail.com
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" gutterBottom>
                        Thank You. Your slot has been booked.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your consultUS booking ID is <b>{patientId}</b>. We have
                        emailed your booking confirmation and appointment link.
                        This link will be active only during the time of the
                        appointment i.e on{" "}
                        <b>
                          {values.date} at {values.patSlot}
                        </b>
                        <br />
                        Your PayPal transaction ID is:{" "}
                        <b>{values.transactionId}</b>
                      </Typography>

                      <Link
                        to={`/home`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Button variant="contained" color="primary">
                          Go to Home
                        </Button>
                      </Link>
                    </>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (activeStep === steps.length - 2)
                            scheduleSubmit(
                              values,
                              activeStep,
                              setActiveStep,
                              setValues
                            );
                          else if (activeStep === steps.length - 3)
                            // handleNext();
                            detailsSubmit(
                              values,
                              setValues,
                              activeStep,
                              setActiveStep
                            );
                        }}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </ThemeProvider>
      </main>
    </React.Fragment>
  );
}
