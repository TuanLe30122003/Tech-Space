"use client";
import React, { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const FeaturedProduct = () => {
  const { router, products, categories } = useAppContext();

  const collections = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    return categories
      .map((category) => ({
        category,
        items: products.filter((product) => product.category === category),
      }))
      .filter(({ items }) => items.length > 0);
  }, [categories, products]);

  const handleCollectionClick = (category) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <motion.section
      className="mt-14"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-3xl font-medium">Featured Collections</p>
        <motion.div
          className="mt-2 h-0.5 w-28 bg-orange-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        ></motion.div>
      </motion.div>

      <div className="mt-12 space-y-14 px-4 md:px-10">
        {collections.length === 0 ? (
          <motion.div
            className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            No collections available right now.
          </motion.div>
        ) : (
          collections.map(({ category, items }, collectionIndex) => (
            <motion.section
              key={category}
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + collectionIndex * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <motion.p
                    className="text-2xl font-semibold text-gray-800"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    {category}
                  </motion.p>
                  <p className="text-sm text-gray-500">
                    Explore our curated selection for the{" "}
                    {category.toLowerCase()} collection.
                  </p>
                </div>
                <motion.button
                  className="rounded border px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                  onClick={() => handleCollectionClick(category)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View all
                </motion.button>
              </div>
              <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((product, index) => (
                  <motion.div
                    key={`${category}-${product._id}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))
        )}
      </div>
    </motion.section>
  );
};

export default FeaturedProduct;
