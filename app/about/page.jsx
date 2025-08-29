import Navbar from "@/components/Navbar";
import React from "react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="w-full px-32 py-8 flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">About Us</h1>
        <p>
          Welcome to our e-commerce platform. We specialize in selling the
          latest technology products.
        </p>
      </div>
    </>
  );
};

export default About;
