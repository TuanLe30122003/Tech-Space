"use client";
import { useEffect, useMemo, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard, { formatPrice } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  specificationSchema,
  formatSpecificationValue,
} from "@/config/specificationSchema";

const Product = () => {
  const { id } = useParams();

  const {
    products,
    router,
    addToCart,
    user,
    currency,
    toggleWishlist,
    isInWishlist,
  } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  const handleToggleWishlist = () => {
    const isAdded = toggleWishlist(productData._id);
    toast.success(isAdded ? "Added to wishlist" : "Removed from wishlist");
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  useEffect(() => {
    if (productData?.image?.length) {
      setMainImage(productData.image[0]);
    }
  }, [productData]);

  const galleryImages = useMemo(
    () => productData?.image ?? [],
    [productData?.image]
  );

  const specificationEntries = useMemo(() => {
    if (!productData) return [];
    const fields = specificationSchema[productData.category] ?? [];
    return fields.map((field) => {
      const rawValue = productData.specifications?.[field.key];
      return {
        ...field,
        rawValue,
        value: formatSpecificationValue(field, rawValue),
      };
    });
  }, [productData]);

  const highlightSpecifications = useMemo(() => {
    return specificationEntries
      .filter((entry) => entry.value && entry.value !== "—")
      .slice(0, 4);
  }, [specificationEntries]);

  const discountPercentage = useMemo(() => {
    if (!productData?.price || !productData?.offerPrice) return null;
    const difference = productData.price - productData.offerPrice;
    if (difference <= 0) return null;
    return Math.round((difference / productData.price) * 100);
  }, [productData?.price, productData?.offerPrice]);

  const scrollToAllProducts = () => {
    router.push("/all-products");
  };

  return productData ? (
    <div className="bg-gradient-to-b max-w-[1400px] mx-auto w-full">
      <div className="flex w-full flex-col gap-16 pb-20 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[520px,minmax(0,1fr)] lg:items-start"
        >
          <div className="flex w-full flex-col gap-6 lg:max-w-[520px]">
            <motion.div
              className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6 shadow-sm md:h-[480px] lg:h-[520px]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <Image
                src={mainImage || galleryImages[0]}
                alt={productData.name}
                className="h-full w-full object-contain"
                width={800}
                height={800}
                priority
              />
              {discountPercentage ? (
                <span className="absolute left-6 top-6 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                  Save {discountPercentage}%
                </span>
              ) : null}
            </motion.div>

            {galleryImages.length > 1 && (
              <motion.div
                className="grid grid-cols-3 gap-3 md:grid-cols-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {galleryImages.map((image, index) => {
                  const isActive = image === mainImage;
                  return (
                    <motion.button
                      key={image + index}
                      type="button"
                      onClick={() => setMainImage(image)}
                      className={`group relative overflow-hidden rounded-2xl border transition ${
                        isActive
                          ? "border-orange-500 shadow-sm"
                          : "border-transparent hover:border-slate-200"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Image
                        src={image}
                        alt={`${productData.name}-${index}`}
                        className="h-28 w-full object-cover mix-blend-multiply md:h-32"
                        width={320}
                        height={240}
                      />
                      {isActive && (
                        <span className="absolute inset-0 bg-orange-500/5" />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                  {productData.category}
                </span>
                <span className="text-slate-400">•</span>
                <span>SKU: {productData._id.slice(-6)}</span>
              </div>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                {productData.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Image
                      key={idx}
                      className="h-4 w-4 md:h-5 md:w-5"
                      src={idx < 4 ? assets.star_icon : assets.star_dull_icon}
                      alt="rating-star"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  (4.5) Trusted by buyers
                </p>
              </div>
              <p className="text-base leading-relaxed text-slate-600">
                {productData.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-end gap-4">
                <p className="text-4xl font-semibold text-slate-900">
                  {formatPrice(productData.offerPrice, currency)}
                </p>
                <div className="flex flex-col text-sm text-slate-500">
                  <span className="line-through">
                    {formatPrice(productData.price, currency)}
                  </span>
                  {discountPercentage ? (
                    <span className="font-medium text-emerald-600">
                      You save{" "}
                      {formatPrice(
                        productData.price - productData.offerPrice,
                        currency
                      )}
                    </span>
                  ) : null}
                </div>
              </div>
              {highlightSpecifications.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {highlightSpecifications.map(({ key, label, value }) => (
                    <div
                      key={key}
                      className="rounded-xl bg-slate-50 px-4 py-3 text-sm"
                    >
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 font-medium text-slate-700">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-col gap-4 md:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(productData._id)}
                className="flex-1 rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </span>
              </motion.button>
              <motion.button
                whileHover={user ? { scale: 1.01 } : {}}
                whileTap={user ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to proceed with checkout", {
                      icon: "⚠️",
                    });
                    return;
                  }
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                disabled={!user}
                className={`flex-1 rounded-xl px-6 py-4 text-sm font-semibold text-white shadow-lg transition ${
                  user
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-500/20 hover:from-orange-500 hover:to-orange-500 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed opacity-60"
                }`}
                title={!user ? "Please login to buy now" : ""}
              >
                <span className="flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" />
                  Buy now
                </span>
              </motion.button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleToggleWishlist}
              className={`flex items-center justify-center gap-2 rounded-xl border px-6 py-4 text-sm font-medium transition ${
                isInWishlist(productData._id)
                  ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist(productData._id)
                    ? "fill-red-500 text-red-500"
                    : "text-slate-500"
                }`}
              />
              {isInWishlist(productData._id)
                ? "Remove from wishlist"
                : "Add to wishlist"}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Product overview
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <div>
                  <span className="font-semibold text-slate-500">Category</span>
                  <p className="mt-1 text-slate-700">{productData.category}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">
                    Availability
                  </span>
                  <p className="mt-1 text-emerald-600">
                    In stock & shipping fast
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Warranty</span>
                  <p className="mt-1">12 months official warranty</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">
                    Return policy
                  </span>
                  <p className="mt-1">Free returns within 30 days</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl bg-white p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Detailed specifications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tailored for {productData.category.toLowerCase()} products
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Specs
            </span>
          </div>
          <div className="mt-6 divide-y divide-slate-100">
            {specificationEntries.length > 0 ? (
              specificationEntries.map(({ key, label, value, type, unit }) => (
                <div
                  key={key}
                  className="grid gap-4 py-4 text-sm md:grid-cols-[220px,1fr] hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center">
                    <p className="font-medium text-slate-600">{label}</p>
                    {unit && type === "number" && (
                      <span className="ml-2 text-xs text-slate-400">
                        ({unit})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {type === "boolean" ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          value === "Yes"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            value === "Yes" ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {value}
                      </span>
                    ) : (
                      <p className="text-slate-800 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-500">
                Specifications for this product will be updated soon.
              </p>
            )}
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-10"
        >
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
              You may also like
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-900">
              Featured products
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Discover best-selling gadgets curated for you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((product, index) => (
              <motion.div
                key={product._id ?? index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToAllProducts}
            className="mx-auto flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-500 shadow-sm transition hover:bg-orange-50"
          >
            Browse all products
          </motion.button>
        </motion.section>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Product;
