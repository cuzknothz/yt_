import { Header } from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Layout: React.FC = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  //   @ts-ignore
  const { accessToken, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  //   useEffect(() => {
  //     if (!loading && !accessToken) {
  //       router.push("/auth");
  //     }
  //   }, [accessToken, loading, router]);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      {/* @ts-ignore */}
      <Header />
      <div className="w-full h-[50px]"></div>
      <div className="">
        {/* <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} /> */}
        <div className="">{children}</div>
      </div>
    </>
  );
};
