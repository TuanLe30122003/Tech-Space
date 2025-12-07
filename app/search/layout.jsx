import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WishlistLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 w-full lg:px-32 md:px-16 px-4 flex flex-col gap-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default WishlistLayout;
