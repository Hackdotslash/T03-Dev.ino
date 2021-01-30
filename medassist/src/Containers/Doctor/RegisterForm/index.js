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

import useStyles from "./styles";

// custom imports
import DetailsForm from "./DetailsForm";
import ScheduleForm from "./ScheduleForm";
import Review from "./Review";
import { detailsSubmit, scheduleSubmit } from "./Validation";
import { updateId, createDoctor } from "./functions";

const steps = ["Basic Details", "Schedule", "Review Info"];

export default function RegisterForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [docId, setDocId] = React.useState("");
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    cpass: "",
    department: "",
    reg: "",
    bio: "",
    showPassword: false,
    croppedImg: {},
    imgURL: "",
    gender: "",
    country: "",
    city: "",
    zipcode: "",
    timezone: "",
    amount: 0,
    amountUSD: 0,
    currType: "USD",
    scheduleArray: [],
    isError: {
      name: false,
      amount: false,
      email: 0,
      password: false,
      cpass: false,
      department: false,
      reg: false,
      bio: false,
      imgURL: false,
      gender: false,
      country: false,
      city: false,
      zipcode: false,
      timezone: false,
    },

    click: 0,
  });

  const [scheduleCheck, setScheduleCheck] = React.useState(false);
  const [submitCheck, setSubmitCheck] = React.useState(false);
  const [scheduleError, setScheduleError] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");
  const [error, setError] = React.useState("");
  const [disable, setDisable] = React.useState(
    values.scheduleArray.length === 0
  );

  const [specs, setSpecs] = React.useState([{ spec: "" }]);
  React.useEffect(() => {
    updateId(setDocId);
  }, []);

  const handleChangeUpload = (value, croppedImg) => {
    setValues({ ...values, croppedImg: croppedImg, imgURL: value });
  };

  const handleChangeSpec = (index, event) => {
    const specValues = [...specs];
    specValues[index][event.target.name] = event.target.value;
    setSpecs(specValues);
  };

  const handleAddButton = () => {
    setSpecs([...specs, { spec: "" }]);
  };

  const handleChange = (prop) => (event) => {
    if (prop === "timezone") {
      console.log(event);
      setValues({ ...values, [prop]: event });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <DetailsForm
              changeHandler={handleChange}
              cspHandler={handleClickShowPassword}
              mdpHandler={handleMouseDownPassword}
              handleSpec={handleChangeSpec}
              add={handleAddButton}
              removeSpec={setSpecs}
              values={values}
              setValues={setValues}
              specs={specs}
              id={docId}
              upload={handleChangeUpload}
            />
          </>
        );
      case 1:
        return (
          <ScheduleForm
            array={values.scheduleArray}
            scheduleCheck={scheduleCheck}
            setScheduleCheck={setScheduleCheck}
            scheduleError={scheduleError}
            disable={disable}
            setDisable={setDisable}
          />
        );
      case 2:
        return (
          <Review
            values={values}
            specs={specs}
            submitCheck={submitCheck}
            setSubmitCheck={setSubmitCheck}
            submitError={submitError}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    createDoctor(values, specs, docId, setError);
    setActiveStep(activeStep + 1);
  };

  return (
    <React.Fragment>
      <div style={{ height: "7.5vh" }}></div>
      <main className={classes.layout}>
        <ThemeProvider theme={customTheme}>
          <Paper className={classes.paper} variant="outlined">
            <Typography component="h1" variant="h4" align="center">
              Doctor Registeration Form
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
                        Registration Failed
                      </Typography>
                      <Typography variant="subtitle1">
                        We could not register you as the account already exists
                        with the same email. If you have forgot your password,
                        please reset your password from here. If you stil face
                        problem, contact teamdevino@gmail.com.. Have a Good Day
                        !
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" gutterBottom>
                        Thank you for registering with us.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your consultUS registration ID is <b>{docId}</b>. You
                        can login to your dashboard and upload your Degrees and
                        Certificates, we'll send you an update when your
                        Registration is approved.
                      </Typography>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (activeStep === steps.length - 1) {
                          // check for submit form checkbox
                          if (submitCheck === false) {
                            setSubmitError(
                              "Please select the checkbox to proceed"
                            );
                          } else {
                            handleSubmit();
                          }
                        } else if (activeStep === steps.length - 2) {
                          scheduleSubmit(
                            scheduleCheck,
                            activeStep,
                            setActiveStep,
                            setScheduleError
                          );
                        } else if (activeStep === steps.length - 3)
                          // setActiveStep(activeStep + 1);
                          detailsSubmit(
                            values,
                            setValues,
                            activeStep,
                            setActiveStep
                          );
                      }}
                      className={classes.button}
                      disabled={
                        activeStep === steps.length - 2 ? disable : false
                      }
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
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
