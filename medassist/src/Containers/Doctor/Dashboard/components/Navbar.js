import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Avatar,
} from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
// custom imports

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Kaushan Script",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#BBE1FA",
    color: "#1b262c",
  },
  icon: {
    color: "#1b262c",
    fontSize: 40,
  },
  span:{
      padding:theme.spacing(2),
  }
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={3} position="fixed" className={classes.appBar}>
        <Toolbar>
          {/*========== Left Side Content ==========*/}

          {/* <Link to={`/`} style={{ color: "inherit", textDecoration: "none" }}> */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawerToggle}
          >
            <LocalHospitalIcon fontSize="large" className={classes.icon} />
          </IconButton>
          {/* </Link> */}
          <Typography variant="h6" className={classes.title}>
            consultUS
          </Typography>
          {/* </Link> */}

          {/*========== Right Side Content ==========*/}
          <span className={classes.span}> {props.name} </span>
          <Avatar
            src={
              props.gender === "Female"
                ? require("../../../../Assets/Avatars/DoctorAvatar-Female.jpg")
                : require("../../../../Assets/Avatars/DoctorAvatar-Male.jpg")
            }
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
