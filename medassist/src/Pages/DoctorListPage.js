import React from "react";

// importing custom components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import List from "../Containers/Doctor/List";

export default function DoctorListPage(props) {
  return (
    <>
      <div style={{ minHeight: "70vh" }}>
        <Navbar />
        <List department={props.match.params.deptName} />
      </div>
      <Footer height={"30vh"} />
    </>
  );
}
