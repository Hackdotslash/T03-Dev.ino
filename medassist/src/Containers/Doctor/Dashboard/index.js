// ------------------ Doctor Dashboard Component --------------- //
// props passed as doctor id docId

import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import dashboardStyles from "./styles";
import Sidebar from "../../../Components/Sidebar";
import Footer from "../../../Components/MinimalFooter";

export default function DoctorDashboard(props) {
  const classes = dashboardStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState(0);

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

  const renderView = (currentView) => {
    switch (currentView) {
      case 0:
        return <div>this is profile section</div>;
      case 1:
        return <div>this is profile section</div>;
      case 2:
        return <div>this is profile section</div>;

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
