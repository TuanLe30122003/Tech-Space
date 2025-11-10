"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Banner = () => {
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Image
          className="max-w-56"
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
        />
      </motion.div>
      <motion.div
        className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">
          Still not know what to buy?
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          Take the quiz and find the perfect product for you.
        </p>
        <motion.button
          onClick={() => router.push("/quiz")}
          className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Take the quiz
          <Image
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </motion.button>
      </motion.div>
      <motion.div
        className="hidden md:block max-w-80"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          className="max-w-80"
          src={assets.md_controller_image}
          alt="md_controller_image"
        />
      </motion.div>
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          className="md:hidden"
          src={assets.sm_controller_image}
          alt="sm_controller_image"
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
