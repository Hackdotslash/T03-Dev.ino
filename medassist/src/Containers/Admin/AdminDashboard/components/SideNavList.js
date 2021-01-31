// The code, idea and structure belongs to Team Dev.ino. No part of the code should be used
// without concern of the team. 
// Team Dev.ino reserves all rights over the code and idea and is bound to take actions in case 
// the code is used without their permission


import React from "react";
import { Divider } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";
import PeopleIcon from "@material-ui/icons/People";
import firebase from "firebase";

export default function SideNavList(props) {
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <ListItem
        button="true"
        selected={props.view === 0}
        onClick={(event) => {
          props.handleViewChange(event, 0);
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button="true"
        selected={props.view === 1}
        onClick={(event) => {
          props.handleViewChange(event, 1);
        }}
      >
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary="Verification" />
      </ListItem>

      <ListItem
        button="true"
        selected={props.view === 2}
        onClick={(event) => {
          props.handleViewChange(event, 2);
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItem>

      <ListItem
        button="true"
        selected={props.view === 3}
        onClick={(event) => {
          props.handleViewChange(event, 3);
        }}
      >
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Feedbacks" />
      </ListItem>

      <Divider />

      <ListItem
        button="true"
        selected={props.view === 4}
        onClick={(event) => {
          props.handleViewChange(event, 4);
        }}
      >
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItem>
      <ListItem button onClick={Logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  );
}
