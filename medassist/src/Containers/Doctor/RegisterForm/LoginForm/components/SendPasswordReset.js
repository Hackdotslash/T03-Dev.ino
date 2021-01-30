//---------------------------  Doctor Password Reset component ---------------- //

import React from "react";
import LoginStyles from "../styles";
import { Paper, Typography, Button, Snackbar } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Alert from "@material-ui/lab/Alert";

// custome imports
import { passwordReset } from "../functions";

export default function SendPasswordReset(props) {
  const classes = LoginStyles();

  const [Email, setEmail] = React.useState("");
  const [loading, isLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setEmail(value);
  };

  const handleSubmit = () => {
    passwordReset(Email, isLoading, setErr);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={loading}
        autoHideDuration={5000}
        onClose={() => {
          isLoading(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {!err ? (
          <Alert severity="info">Password Reset Mail sent</Alert>
        ) : (
          <Alert severity="error">User not registered</Alert>
        )}
      </Snackbar>
      <main className={classes.layout}>
        <div style={{ height: "10vh" }}></div>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Password Reset Form
          </Typography>
          <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
            <TextValidator
              id="Email"
              name="Email"
              label="Enter your registered Email"
              color="secondary"
              fullWidth
              value={Email}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["Please enter Email!", "Email is not valid"]}
            />

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </ValidatorForm>
        </Paper>
      </main>
    </React.Fragment>
  );
}
