// ---------------- Routes section ---------------------- //
// no props passed

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import customTheme from "./Components/Theme";
import DoctorRegistrationPage from "./Pages/DoctorRegistrationPage";
import DoctorLoginPage from "./Pages/DoctorLoginPage";
import DoctorDashboardPage from "./Pages/DoctorDashboardPage";
import DoctorListPage from "./Pages/DoctorListPage";
import AdminLogin from "./Pages/AdminLoginPage";
import PatientForm from "./Pages/PatientForm";
import AdminDashboard from "./Pages/AdminDashboardPage";
import PatientMeetingPage from "./Pages/PatientMeetingPage";


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

          {/* Patient Appointment Form */}
          <Route
            exact
            path="/patient/form/:department/:docId/:docName"
            component={PatientForm}
          />

          {/* Doctors list of particular department */}
          <Route
            exact
            path="/department/doctors/:deptName"
            component={DoctorListPage}
          />
          {/* Doctor's Registration form */}
          <Route
            exact
            path="/doctor/register"
            component={DoctorRegistrationPage}
          />

          {/* Doctor's Login Page */}
          <Route exact path="/doctor/login" component={DoctorLoginPage} />

          {/* Doctor's Dashboard */}
          <Route
            exact
            path="/doctor/dashboard/:docId"
            component={DoctorDashboardPage}
          />

          {/* Admin Login */}
          <Route exact path="/admin/login" component={AdminLogin} />

          {/* Admin Dashboard */}
          <Route exact path="/admin/dashboard" component={AdminDashboard} />

          {/* Landing page  */}
          <Route exact path="/home" component={LandingPage} />

          {/* Patient's Meeting page */}
          <Route
            exact
            path="/patient/meeting/:patId/:docId"
            component={PatientMeetingPage}
          />

          {/* Page not found */}
          <Route path="/">
            <div>Error 404: Page not found</div>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
