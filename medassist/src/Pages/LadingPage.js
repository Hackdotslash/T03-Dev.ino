import React from "react";

// importing custom components
import LandingPageNavbar from "../Components/LandingPageNavbar";
import Footer from "../Components/Footer";
import Home from "../Containers/Home";
import Header from "../Components/Header";

export default function LandingPage() {
  return (
    <>
      <LandingPageNavbar />
      <Header />
      <Home />
      <Footer height={"0vh"} />
    </>
  );
}
