import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AllProductsLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <main className="flex-1 py-8 w-full px-32 flex flex-col gap-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AllProductsLayout;
