"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex w-full lg:px-32 px-0">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
