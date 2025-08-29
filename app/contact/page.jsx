import Navbar from "@/components/Navbar";
import React from "react";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="py-8 w-full px-32 flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p>
          If you have any questions or inquiries, feel free to reach out to us.
        </p>
      </div>
    </>
  );
};

export default Contact;
