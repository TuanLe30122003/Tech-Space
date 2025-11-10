"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const Wishlist = () => {
  const { wishlistItems, products, removeFromWishlist, getWishlistCount } =
    useAppContext();

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0 && wishlistItems.length > 0) {
      const filteredProducts = products.filter((product) =>
        wishlistItems.includes(product._id)
      );
      setWishlistProducts(filteredProducts);
    } else {
      setWishlistProducts([]);
    }
    setLoading(false);
  }, [products, wishlistItems]);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  const wishlistCountLabel = useMemo(() => {
    const total = getWishlistCount();
    return `${total} ${total === 1 ? "item" : "items"}`;
  }, [getWishlistCount]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-sm"
            >
              <Heart className="h-5 w-5" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Save your favourite gadgets and find them quickly when you
                return.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
            {wishlistCountLabel}
          </span>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-10 py-20 text-center shadow-sm backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1,
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-inner"
            >
              <Heart className="h-7 w-7" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-slate-500 md:text-base">
                Add items you love to your wishlist and they&apos;ll appear
                here.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => (window.location.href = "/all-products")}
              className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-500 hover:to-orange-500"
            >
              Start shopping
            </motion.button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.94 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: "easeOut" },
                    },
                  }}
                  layout
                  whileHover={{ y: -6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
