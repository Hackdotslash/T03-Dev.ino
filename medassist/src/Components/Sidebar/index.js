import React from "react";
import { Drawer, Hidden } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import sidebarStyles from "./styles";

// custom imports
import SidebarItems from "./components/SidebarItems";

export default function Sidenav(props) {
  const { window } = props;
  const classes = sidebarStyles();
  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.state}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <SidebarItems
              history={props.history}
              handleViewChange={props.handleViewChange}
              view={props.view}
            />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <SidebarItems
              handleViewChange={props.handleViewChange}
              view={props.view}
            />
            {/* {drawer} */}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
