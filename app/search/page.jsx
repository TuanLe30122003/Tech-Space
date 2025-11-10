"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Search, X } from "lucide-react";
import { formatPrice } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SearchContent = () => {
  const { products, router, currency } = useAppContext();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");

  const relatedKeywords = ["laptop", "earphone", "headphone"];

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      const filteredByCategory = products.filter(
        (product) => product.category && product.category === categoryParam
      );
      setSearchResults(filteredByCategory);
      return;
    }

    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery, products, categoryParam]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSearchResults([]);
    router.push("/search");
  };

  const handleRelatedKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    setSelectedCategory("");
  };

  const displayedResults = searchResults.slice(0, 8); // Show max 8 products

  return (
    <motion.div
      className=" px-6 md:px-16 lg:px-32 pt-10 pb-20"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl font-medium mb-8 text-center w-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        What products are you looking for?
      </motion.h1>

      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <motion.div
          className="relative w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-2 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key="category"
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Category:{" "}
                  <span className="text-orange-600">{selectedCategory}</span>
                </h3>
                <button
                  onClick={handleClearSearch}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {searchQuery !== "" && !selectedCategory && (
              <motion.h3
                key="result-heading"
                className="text-lg font-semibold text-gray-800"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                Results for "{searchQuery}"
              </motion.h3>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {searchQuery === "" && !selectedCategory ? (
              <motion.div
                key="empty-state"
                className="text-center py-12 text-gray-500"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                Enter a keyword to search for products
              </motion.div>
            ) : searchResults.length === 0 ? (
              <motion.div
                key="no-results"
                className="text-center py-12 text-gray-500"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                {selectedCategory
                  ? `No products found in category "${selectedCategory}"`
                  : `No products found for "${searchQuery}"`}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                    },
                  }}
                >
                  {displayedResults.map((product, index) => (
                    <motion.div
                      key={product._id}
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="cursor-pointer group"
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            ease: "easeOut",
                            delay: Math.min(index, 6) * 0.05,
                          },
                        },
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-2 aspect-square">
                        {product.image && product.image[0] ? (
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <div className="w-12 h-12 text-gray-400">📦</div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate mb-1">
                        {product.name}
                      </p>
                      <p className="text-sm font-semibold text-orange-600">
                        {formatPrice(product.offerPrice || 0, currency)}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <AnimatePresence>
                  {searchResults.length > 8 && (
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <button className="text-orange-600 hover:text-orange-700 font-medium transition">
                        View all {searchResults.length} results
                        {selectedCategory
                          ? ` in category "${selectedCategory}"`
                          : ` for "${searchQuery}"`}
                        {" →"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const SearchPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="px-6 md:px-16 lg:px-32 pt-10 pb-20 text-center">
            Loading...
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </>
  );
};

export default SearchPage;
