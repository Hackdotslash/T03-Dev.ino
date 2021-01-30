import React from "react";
import {
  Typography,
  Button,
  Snackbar,
  CircularProgress,
  Avatar,
  CssBaseline,
  Grid,
  Container,
} from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Alert from "@material-ui/lab/Alert";

import loginAdmin from "./functions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminLogin(props) {
  const classes = useStyles();

  const [loginData, setLoginData] = React.useState({
    Email: "",
    Password: "",
  });

  const [open, setOpen] = React.useState(false);
  const [loading, isLoading] = React.useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setLoginData({
      ...loginData,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = () => {
    isLoading(true);
    loginAdmin(
      loginData.Email,
      loginData.Password,
      isLoading,
      setOpen,
      props.history
    );
  };

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">Invalid Email or Password</Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <div style={{ height: "10vh" }}></div>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ background: "#BBE1FA", color: "#0f4c75" }}
          >
            <PeopleAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
            <TextValidator
              id="Email"
              variant="outlined"
              name="Email"
              label="E-Mail"
              color="primary"
              fullWidth
              value={loginData.Email}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["Please enter Email!", "Email is not valid"]}
              style={{ marginTop: 16 }}
            />
            <TextValidator
              id="Password"
              variant="outlined"
              name="Password"
              label="Password"
              color="primary"
              fullWidth
              type="password"
              value={loginData.Password}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Please enter Password!"]}
              style={{ marginTop: 16 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? (
                <div>
                  Verifying... <CircularProgress size={22} color="secondary" />
                </div>
              ) : (
                <div>Submit</div>
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to={{
                    pathname: "/password/reset",
                  }}
                  style={{ textDecoration: "none", color: "#0f4c75" }}
                >
                  Forgot Password
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to={{
                    pathname: "/home",
                  }}
                  style={{ textDecoration: "none", color: "#0f4c75" }}
                >
                  Homepage
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Container>
    </React.Fragment>
  );
}
