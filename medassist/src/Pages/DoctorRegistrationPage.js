import React from "react";

import Navbar from "../Components/Navbar";
import RegisterForm from "../Containers/Doctor/RegisterForm";
import Footer from "../Components/MinimalFooter";

export default function DoctorRegistrationPage() {
  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <Navbar />
        <RegisterForm />
      </div>
      <Footer height={"20vh"} />
    </>
  );
}
