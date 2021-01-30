// ---------------- Routes section ---------------------- //
// no props passed

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import customTheme from "./Components/Theme";
import DoctorRegistrationPage from "./Pages/DoctorRegistrationPage";

// importing custom components
import LandingPage from "./Pages/LadingPage";

export default function Routes() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <Router>
        <Switch>
          {/* =========================== TEST ========================  */}

          {/* Krishna's Testing page */}
          <Route exact path="/krishna/test">
            <div style={{ height: "80vh", margin: "10%" }}>Test Krishna</div>
          </Route>

          {/* Ekta's Testing page */}
          <Route exact path="/ekta/test">
            Test Ekta
          </Route>

          {/* ========================== PRODUCTION =====================  */}
          {/* Doctor's Registration form */}
          <Route
            exact
            path="/doctor/register"
            component={DoctorRegistrationPage}
          />

          {/* Landing page  */}
          <Route exact path="/home" component={LandingPage} />

          {/* Page not found */}
          <Route path="/">
            <div>Error 404: Page not found</div>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
