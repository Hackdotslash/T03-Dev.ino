import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SideNavList from "./components/SideNavList";
import { Backdrop, CircularProgress } from "@material-ui/core";

import dashboardStyles from "./styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://thekaspertech.com/">
        medassist
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Dashboard(props) {
  const classes = dashboardStyles();
  const [open, setOpen] = React.useState(true);

  const [loading, setLoading] = React.useState(true);
  // consultUS charges

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /*
  Views: 
  0 - Dashboard
  1 - Verification
  2 - Doctors
  3 - Feedbacks
  4 - Logs
  8 - DoctorLogs
  9 - DoctorProfile
  */

  const [view, setView] = React.useState(0);

  const handleViewChange = (event, index) => {
    setView(index);
  };

  const changeView = (event) => {
    console.log(view);
    if (view === 9) {
      setView(2);
    } else if (view === 10 || view === 11) {
      setView(9);
    } else if (view === 8) {
      setView(4);
    }
  };
  const renderView = (currentView) => {
    switch (currentView) {
      case 0:
        return "view"
      case 1:
        return "View";

      default:
        throw new Error("Unknown View");
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="secondary" size={80} />
          </Backdrop>
        </div>
      ) : (
        <div className={classes.root}>
          <CssBaseline />

          {/*========== Navbar ==========*/}
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>

              {view >= 8 && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={changeView}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>

          {/*========== Sidebar ==========*/}
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <List>
              <SideNavList handleViewChange={handleViewChange} view={view} />
            </List>
          </Drawer>

          {/*========== Main Body ==========*/}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {/*========== Content Area ==========*/}

              <div>{renderView(view)}</div>

              {/*========== ./Content Area ==========*/}
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </div>
      )}
    </>
  );
}
