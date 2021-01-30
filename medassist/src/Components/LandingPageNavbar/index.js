import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link } from "react-router-dom";

import useStyles from "./styles";

// custom imports
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";

export default function Navbar(props) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <div className={classes.root}>
      <AppBar
        elevation={trigger ? 3 : 0}
        position="fixed"
        className={trigger ? classes.navbarScroll : classes.navbar}
      >
        <Toolbar>
          {/*========== Left Side Content ==========*/}

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LocalHospitalIcon
              fontSize="large"
              className={trigger ? classes.iconScroll : classes.icon}
            />
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
