"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Show success message
    toast.success("We will contact you as soon as possible");
    setEmail("");
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="md:text-4xl text-2xl font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Contact us now to receive the best consultation
      </motion.h1>
      <motion.p
        className="md:text-base text-gray-500/80 pb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Get expert advice and personalized recommendations from our team. Share
        your email and we'll reach out to help you find the perfect solution for
        your needs.
      </motion.p>
      <motion.form
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none hover:bg-orange-700 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default NewsLetter;
