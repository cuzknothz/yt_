import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

import { NextPage } from "next";
import React from "react";
import { HomeScreen } from "./homeScreen/HomeScreen";

const HomePage: NextPage = () => {
  return (
    <>
      {/* <Header />
      <div className="mt-[50px]">
        <SideBar />
        <Videos />
      </div> */}
      <HomeScreen />
    </>
  );
};

export default HomePage;
