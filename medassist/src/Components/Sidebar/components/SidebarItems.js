import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Dashboard,
  WatchLater,
  Book,
  ExitToApp,
  Update,
  ChatBubbleOutline,
  AccountBalanceWallet,
} from "@material-ui/icons";

import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import firebase from "firebase";

import sidebarStyles from "../styles";

export default function SidebarItems(props) {
  function handleClick() {
    firebase
      .auth()
      .signOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  const classes = sidebarStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button="true"
          selected={props.view === 0}
          onClick={(event) => {
            props.handleViewChange(event, 0);
          }}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>

        <ListItem
          button="true"
          selected={props.view === 1}
          onClick={(event) => {
            props.handleViewChange(event, 1);
          }}
        >
          <ListItemIcon>
            <WatchLater />
          </ListItemIcon>
          <ListItemText primary={"Appointments"} />
        </ListItem>

        <ListItem
          button="true"
          selected={props.view === 2}
          onClick={(event) => {
            props.handleViewChange(event, 2);
          }}
        >
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <ListItemText primary={"Patients Log"} />
        </ListItem>

        <ListItem
          button="true"
          selected={props.view === 3}
          onClick={(event) => {
            props.handleViewChange(event, 3);
          }}
        >
          <ListItemIcon>
            <AccountBalanceWallet />
          </ListItemIcon>
          <ListItemText primary={"Transaction Log"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button="true"
          selected={props.view === 4}
          onClick={(event) => {
            props.handleViewChange(event, 4);
          }}
        >
          <ListItemIcon>
            <Update />
          </ListItemIcon>
          <ListItemText primary={"Update Info"} />
        </ListItem>

        <ListItem
          button="true"
          selected={props.view === 5}
          onClick={(event) => {
            props.handleViewChange(event, 5);
          }}
        >
          <ListItemIcon>
            <CloudUploadOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Upload Documents"} />
        </ListItem>

        <ListItem
          button="true"
          selected={props.view === 6}
          onClick={(event) => {
            props.handleViewChange(event, 6);
          }}
        >
          <ListItemIcon>
            <ChatBubbleOutline />
          </ListItemIcon>
          <ListItemText primary={"Query"} />
        </ListItem>

        <ListItem button="true" onClick={handleClick}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );
}
