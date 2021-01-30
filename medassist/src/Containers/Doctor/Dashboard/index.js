// ------------------ Doctor Dashboard Component --------------- //
// props passed as doctor id docId

import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import dashboardStyles from "./styles";
import Sidebar from "../../../Components/Sidebar";
import Footer from "../../../Components/MinimalFooter";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Appointments from "./components/Appointments";
import Update from "./components/Update";
import PatientLog from "./components/PatientLog";

import { fetchDoctorData } from "./functions";

export default function DoctorDashboard(props) {
  const classes = dashboardStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [view, setView] = React.useState(0);
  const [docData, setDocData] = React.useState({});

  /*
  Views: 
  0 - Dashboard
  1 - Appointments
  2 - Patients Log
  3 - Transaction Log
  4 - Update info
  5 - Upload Docs
  6 - Query
  */

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleViewChange = (event, index) => {
    setView(index);
  };

  React.useEffect(() => {
    fetchDoctorData(
      props.props.match.params.docId,
      props.props.history,
      setDocData,
      setLoading
    );
  }, [props.props.history, props.props.match.params.docId, view]);

  const renderView = (currentView) => {
    switch (currentView) {
      case 0:
        return (
          <Profile
            loading={loading}
            docData={docData}
            ID={props.props.match.params.docId}
          />
        );
      case 1:
        return (
          <Appointments
            appData={docData.Schedule}
            docData={docData}
            setDocData={setDocData}
            docId={props.props.match.params.docId}
            setView={setView}
          />
        );
      case 2:
        return (
          <PatientLog
            appData={docData.PatientLog}
            docId={props.props.match.params.docId}
          />
        );
      case 3:
        return <div>this is profile section</div>;
      case 4:
        return (
          <Update
            docData={docData}
            id={props.props.match.params.docId}
            setDocData={setDocData}
          />
        );

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
          <Navbar
            handleDrawerToggle={handleDrawerToggle}
            state={mobileOpen}
            gender={docData.Gender}
            name={docData.Name}
          />

          <Sidebar
            handleDrawerToggle={handleDrawerToggle}
            state={mobileOpen}
            handleViewChange={handleViewChange}
            view={view}
            history={props.props.history}
          />
          <main className={classes.main}>
            <div className={classes.content}>
              <div className={classes.toolbar} />
              {/*========== Content Area ==========*/}

              <div style={{ marginBottom: 80 }}>{renderView(view)}</div>

              {/*========== ./Content Area ==========*/}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                marginTop: 32,
              }}
            >
              <Footer />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
