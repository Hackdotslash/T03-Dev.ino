import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
} from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Link } from "react-router-dom";

import useStyles from "./styles";

// custom imports
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={3} position="fixed" className={classes.appBar}>
        <Toolbar>
          {/*========== Left Side Content ==========*/}

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawerToggle}
          >
            <LocalHospitalIcon fontSize="large" className={classes.icon} />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link
              to={`/home`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              medassist
            </Link>
          </Typography>

          {/*========== Right Side Content ==========*/}

          <Link
            to={`/doctor/register`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <RegisterButton />
          </Link>
          <Link
            to={`/doctor/login`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <LoginButton />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
