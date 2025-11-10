"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <motion.section
      className="flex flex-col items-center pt-14"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.p
        className="text-2xl font-medium text-left w-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Popular products
      </motion.p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.slice(0, 5).map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.12 * (index + 1),
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
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
