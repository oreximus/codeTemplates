import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <h1 className="text-2xl">This homepage stuff will run on everypage!</h1>
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
