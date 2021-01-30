// ---------------- Routes section ---------------------- //
// no props passed

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import customTheme from "./Components/Theme";


export default function Routes() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <Router>
        <Switch>
          {/* =========================== TEST ========================  */}

          {/* Krishna's Testing page */}
          <Route exact path="/krishna/test">
            <div style={{ height: "80vh", margin: "10%" }}>
              Test Krishna
            </div>
          </Route>

          {/* Ekta's Testing page */}
          <Route exact path="/ekta/test">
            Test Ekta
          </Route>

          {/* ========================== PRODUCTION =====================  */}

          {/* Page not found */}
          <Route path="/">
            <div>Error 404: Page not found</div>
          </Route>

        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
