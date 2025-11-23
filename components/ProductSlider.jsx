"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductSlider = ({ products, animationDelay = 0 }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [products]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full group">
      {/* Left Arrow Button */}
      {canScrollLeft && (
        <motion.button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all md:opacity-0 md:group-hover:opacity-100"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: canScrollLeft ? 1 : 0, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </motion.button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={`${product._id}-${index}`}
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: animationDelay + index * 0.08,
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Right Arrow Button */}
      {canScrollRight && (
        <motion.button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all md:opacity-0 md:group-hover:opacity-100"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: canScrollRight ? 1 : 0, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </motion.button>
      )}
    </div>
  );
};

export default ProductSlider;
