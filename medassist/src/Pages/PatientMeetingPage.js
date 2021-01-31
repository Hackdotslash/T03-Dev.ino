import React from "react";

// importing custom components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PatientMeeting from "../Containers/Patient/PatientMeeting";

export default function PatientMeetingPage(props) {
  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <Navbar />
        <PatientMeeting props={props} />
      </div>
      <Footer height={"20vh"} />
    </>
  );
}
