import React from "react";

// importing custom components
import LandingPageNavbar from "../Components/LandingPageNavbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function LandingPage() {
  return (
    <>
      <LandingPageNavbar />
      <Header />
      <Footer height={"0vh"} />
    </>
  );
}
