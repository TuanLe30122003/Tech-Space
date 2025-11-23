"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import ProductSlider from "./ProductSlider";
import Loading from "./Loading";

const HomeProducts = () => {
  const { products, router, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <motion.section
        className="flex flex-col items-center pt-14"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-3xl font-medium">Popular products</p>
          <motion.div
            className="mt-2 h-0.5 w-28 bg-orange-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
        <div className="mt-12 pb-14 w-full flex justify-center">
          <Loading />
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="flex flex-col items-center pt-14"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-3xl font-medium">Popular products</p>
        <motion.div
          className="mt-2 h-0.5 w-28 bg-orange-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        ></motion.div>
      </motion.div>
      <div className="mt-12 pb-14 w-full">
        <ProductSlider products={products} animationDelay={0.2} />
      </div>
      <motion.button
        onClick={() => {
          router.push("/all-products");
        }}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        See more
      </motion.button>
    </motion.section>
  );
};

export default HomeProducts;
