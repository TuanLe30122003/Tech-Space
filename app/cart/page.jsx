"use client";
import React, { useMemo } from "react";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { formatPrice } from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    currency,
  } = useAppContext();

  const cartEntries = useMemo(() => {
    if (!cartItems) return [];
    return Object.entries(cartItems)
      .map(([itemId, quantity]) => {
        const product = products.find((product) => product._id === itemId);
        if (!product || quantity <= 0) return null;
        return { product, quantity };
      })
      .filter(Boolean);
  }, [cartItems, products]);

  const totalItems = getCartCount();
  const hasItems = cartEntries.length > 0;

  const handleDecrease = (productId, quantity) => {
    const nextQuantity = quantity - 1;
    updateCartQuantity(productId, Math.max(nextQuantity, 0));
  };

  const handleIncrease = (productId) => {
    addToCart(productId);
  };

  const handleManualQuantity = (productId, value) => {
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    if (parsed <= 0) {
      updateCartQuantity(productId, 0);
    } else {
      updateCartQuantity(productId, parsed);
    }
  };

  return (
    <div className="bg-gradient-to-b mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full flex-col gap-12 pb-20 pt-16"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Review your order
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Your cart
            </h1>
            <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <p className="text-sm text-slate-500 md:text-base">
            Secure checkout, curated gadgets, and quick delivery—finish your
            purchase in a few clicks.
          </p>
        </div>

        {hasItems ? (
          <div className="flex lg:flex-row flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="space-y-6"
            >
              {cartEntries.map(({ product, quantity }, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm md:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                    <div className="flex items-center justify-center">
                      <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-slate-100 p-3 shadow-inner sm:h-32 sm:w-32 sm:p-4">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="h-full w-full object-contain"
                          width={256}
                          height={256}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            {product.category}
                          </p>
                          <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-base font-semibold text-slate-900 md:text-lg">
                            {formatPrice(product.offerPrice, currency)}
                          </p>
                          {product.offerPrice < product.price && (
                            <p className="text-xs text-slate-400 line-through">
                              {formatPrice(product.price, currency)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-end">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                            <button
                              onClick={() =>
                                handleDecrease(product._id, quantity)
                              }
                              className="rounded-full bg-slate-50 p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              min={0}
                              value={quantity}
                              onChange={(event) =>
                                handleManualQuantity(
                                  product._id,
                                  event.target.value
                                )
                              }
                              className="w-14 border-0 bg-transparent text-center text-sm font-semibold text-slate-700 focus:outline-none focus:ring-0"
                            />
                            <button
                              onClick={() => handleIncrease(product._id)}
                              className="rounded-full bg-orange-500 p-1.5 text-white transition hover:bg-orange-600"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-slate-600">
                            Subtotal{" : "}
                            <span className="text-slate-900">
                              {formatPrice(
                                product.offerPrice * quantity,
                                currency
                              )}
                            </span>
                          </p>
                        </div>

                        <button
                          onClick={() => updateCartQuantity(product._id, 0)}
                          className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ x: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/all-products")}
                className="flex w-fit items-center gap-2 text-sm font-semibold text-orange-600 transition hover:text-orange-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue shopping
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-3xl"
            >
              <OrderSummary />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-8 py-16 text-center shadow-sm backdrop-blur"
          >
            <div className="rounded-full bg-orange-100 p-4 text-orange-500">
              <ShoppingCartIcon />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your cart is empty
              </h2>
              <p className="text-sm text-slate-500 md:text-base">
                Add some of our best-selling gadgets to your cart and continue
                shopping.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/all-products")}
              className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-500 hover:to-orange-500"
            >
              Start shopping
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 12.75m-1.644-7.478h12.26c.86 0 1.52.802 1.32 1.64l-1.35 5.4a1.35 1.35 0 01-1.32 1.033H6.908m0 0L5.7 6.272m1.208 6.478l-.455 1.82a1.35 1.35 0 001.32 1.678H17.25"
    />
    <path d="M8.25 19.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18 19.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export default Cart;
