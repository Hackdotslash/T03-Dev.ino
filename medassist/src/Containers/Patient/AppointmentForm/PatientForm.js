import React from "react";

import Navbar from "../Components/Navbar";
import AppointmentForm from "../Containers/Patient/AppointmentForm";
import Footer from "../Components/MinimalFooter";

export default function DoctorRegistrationPage(props) {
  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <Navbar />
        <AppointmentForm
          department={props.match.params.department}
          docId={props.match.params.docId}
          docName={props.match.params.docName}
        />
      </div>
      <Footer height={"20vh"} />
    </>
  );
}
