import React from "react";
import Navbar from "../Components/Navbar";
import LoginForm from "../Containers/Doctor/LoginForm";
import MinimalFooter from "../Components/MinimalFooter";

export default function DoctorLoginPage(props) {
  return (
    <>
      <div style={{ height: "80vh" }}>
        <Navbar />
        <LoginForm props={props} />
      </div>
      <MinimalFooter height={"20vh"} />
    </>
  );
}
