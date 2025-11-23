"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { formatPrice } from "@/components/ProductCard";
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  specificationSchema,
  formatSpecificationValue,
  compareSpecificationValues,
} from "@/config/specificationSchema";

const getProductKey = (product = {}) => {
  if (product && product._id) return String(product._id);
  if (product && product.id) return String(product.id);
  return "";
};

const getPrimaryImage = (product = {}) => {
  if (Array.isArray(product?.image) && product.image.length > 0) {
    return product.image[0];
  }
  if (typeof product?.image === "string" && product.image.trim().length > 0) {
    return product.image;
  }
  return null;
};

const getNumericPrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[^0-9.-]+/g, "")) || 0;
    return numeric;
  }
  return 0;
};

const resolveComparisonPrice = (product = {}) => {
  if (product?.offerPrice != null) return getNumericPrice(product.offerPrice);
  if (product?.price != null) return getNumericPrice(product.price);
  return 0;
};

const getSpecificationField = (category, key) => {
  const fields = specificationSchema[category] ?? [];
  return fields.find((field) => field.key === key) || null;
};

const ComparePage = () => {
  const {
    categories = [],
    products = [],
    isLoading,
    currency,
  } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [firstProductId, setFirstProductId] = useState("");
  const [secondProductId, setSecondProductId] = useState("");

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    setFirstProductId("");
    setSecondProductId("");
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((product) => {
      const productCategory = (product?.category ?? "").toLowerCase();
      return productCategory === selectedCategory.toLowerCase();
    });
  }, [products, selectedCategory]);

  useEffect(() => {
    if (
      firstProductId &&
      !filteredProducts.some(
        (product) => getProductKey(product) === firstProductId
      )
    ) {
      setFirstProductId("");
    }
    if (
      secondProductId &&
      !filteredProducts.some(
        (product) => getProductKey(product) === secondProductId
      )
    ) {
      setSecondProductId("");
    }
  }, [filteredProducts, firstProductId, secondProductId]);

  const firstProduct = useMemo(
    () =>
      filteredProducts.find(
        (product) => getProductKey(product) === firstProductId
      ),
    [filteredProducts, firstProductId]
  );

  const secondProduct = useMemo(
    () =>
      filteredProducts.find(
        (product) => getProductKey(product) === secondProductId
      ),
    [filteredProducts, secondProductId]
  );

  const priceComparison = useMemo(() => {
    if (!firstProduct || !secondProduct) return null;

    const firstPrice = resolveComparisonPrice(firstProduct);
    const secondPrice = resolveComparisonPrice(secondProduct);
    const difference = Math.abs(firstPrice - secondPrice);

    let verdict = "Both products have the same price.";
    if (firstPrice < secondPrice) {
      verdict = `${firstProduct.name} is cheaper by ${formatPrice(
        difference,
        currency
      )}.`;
    } else if (firstPrice > secondPrice) {
      verdict = `${secondProduct.name} is cheaper by ${formatPrice(
        difference,
        currency
      )}.`;
    }

    return {
      firstPrice,
      secondPrice,
      difference,
      verdict,
    };
  }, [currency, firstProduct, secondProduct]);

  const renderProductSlot = (product, label) => {
    if (!product) {
      return (
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 p-6 text-center text-slate-500">
          <p className="text-sm font-medium">Select a product for {label}</p>
          <p className="mt-2 text-xs">
            Pick a product from the list above to see its details here.
          </p>
        </div>
      );
    }

    const imageSrc = getPrimaryImage(product);

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={product.name}
                width={320}
                height={320}
                className="h-full w-full object-contain p-6"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                No image available
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {label}
            </p>
            <h3 className="text-xl font-semibold text-slate-900">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm text-slate-600">{product.description}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900">
              Current price:{" "}
              {formatPrice(resolveComparisonPrice(product), currency)}
            </p>
            {product.price != null && product.offerPrice != null && (
              <p className="text-sm text-slate-500 line-through">
                Original price: {formatPrice(product.price, currency)}
              </p>
            )}
          </div>
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  Specifications
                </p>
                <dl className="grid gap-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => {
                      const field = getSpecificationField(
                        product.category,
                        key
                      );
                      const displayValue = field
                        ? formatSpecificationValue(field, value)
                        : value || "—";
                      return (
                        <div
                          key={key}
                          className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2"
                        >
                          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            {field ? field.label : key}
                          </dt>
                          <dd className="text-sm font-medium text-slate-700">
                            {field?.type === "boolean" ? (
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                                  value === true || value === "Yes"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                {displayValue}
                              </span>
                            ) : (
                              displayValue
                            )}
                          </dd>
                        </div>
                      );
                    }
                  )}
                </dl>
              </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="w-full py-10 px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <header className="space-y-4">
            <p className="text-sm font-medium text-orange-600">
              Product comparison
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Compare products side by side by category
            </h1>
            <p className="text-sm text-slate-600 md:text-base">
              Pick the product category you want to compare, then select two
              items to see their price difference.
            </p>
          </header>

          <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Product category
                </span>
                <select
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  disabled={isLoading || categories.length === 0}
                >
                  {categories.length === 0 && (
                    <option>No categories available</option>
                  )}
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Products found
                </span>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 shadow-inner">
                  {selectedCategory ? (
                    filteredProducts.length > 0 ? (
                      <span>
                        Found {filteredProducts.length} product
                        {filteredProducts.length > 1 ? "s" : ""} in this
                        category.
                      </span>
                    ) : (
                      <span>No products available in this category.</span>
                    )
                  ) : (
                    <span>Select a category to see available products.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  First product
                </span>
                <select
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
                  value={firstProductId}
                  onChange={(event) => setFirstProductId(event.target.value)}
                  disabled={filteredProducts.length === 0}
                >
                  <option value="">Select a product</option>
                  {filteredProducts.map((product) => {
                    const productId = getProductKey(product);
                    return (
                      <option
                        key={productId}
                        value={productId}
                        disabled={productId === secondProductId}
                      >
                        {product.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Second product
                </span>
                <select
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
                  value={secondProductId}
                  onChange={(event) => setSecondProductId(event.target.value)}
                  disabled={filteredProducts.length === 0}
                >
                  <option value="">Select a product</option>
                  {filteredProducts.map((product) => {
                    const productId = getProductKey(product);
                    return (
                      <option
                        key={productId}
                        value={productId}
                        disabled={productId === firstProductId}
                      >
                        {product.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </section>

          {isLoading ? (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-12 shadow-sm">
              <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
            </div>
          ) : (
            <section className="grid gap-6 lg:grid-cols-2">
              {renderProductSlot(firstProduct, "Product A")}
              {renderProductSlot(secondProduct, "Product B")}
            </section>
          )}

          {priceComparison && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Price comparison
              </h2>
              <div className="mt-4 grid gap-4 px-0 md:grid-cols-3 md:px-4">
                <div className="rounded-xl bg-slate-900 p-4 text-white">
                  <p className="text-xs uppercase tracking-wide text-slate-200/80">
                    Product A price
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatPrice(priceComparison.firstPrice, currency)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900 p-4 text-white">
                  <p className="text-xs uppercase tracking-wide text-slate-200/80">
                    Product B price
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatPrice(priceComparison.secondPrice, currency)}
                  </p>
                </div>
                <div className="rounded-xl bg-orange-500 p-4 text-white">
                  <p className="text-xs uppercase tracking-wide text-orange-100/90">
                    Difference
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatPrice(priceComparison.difference, currency)}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm font-medium text-slate-700">
                {priceComparison.verdict}
              </p>
            </section>
          )}

          {firstProduct &&
            secondProduct &&
            specificationSchema[selectedCategory] &&
            specificationSchema[selectedCategory].length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                  Specification comparison
                </h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
                  <div className="grid grid-cols-1 divide-y divide-slate-100">
                    {specificationSchema[selectedCategory].map((field) => {
                      const firstRawValue =
                        firstProduct.specifications?.[field.key];
                      const secondRawValue =
                        secondProduct.specifications?.[field.key];
                      const firstValue = formatSpecificationValue(
                        field,
                        firstRawValue
                      );
                      const secondValue = formatSpecificationValue(
                        field,
                        secondRawValue
                      );

                      // So sánh nếu là số
                      const comparison =
                        field.type === "number"
                          ? compareSpecificationValues(
                              field,
                              firstRawValue,
                              secondRawValue
                            )
                          : null;

                      return (
                        <div
                          key={field.key}
                          className="grid gap-4 bg-white px-4 py-4 text-sm transition-colors hover:bg-slate-50/50 md:grid-cols-[200px,1fr,1fr] md:px-6"
                        >
                          <div className="flex flex-col">
                            <p className="font-semibold text-slate-600">
                              {field.label}
                            </p>
                            {field.unit && (
                              <p className="text-xs text-slate-400">
                                {field.unit}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <div
                              className={`rounded-lg px-3 py-2 font-medium text-slate-800 ${
                                comparison?.better === "first"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : comparison?.better === "second"
                                  ? "bg-slate-50"
                                  : "bg-slate-50"
                              }`}
                            >
                              {field.type === "boolean" ? (
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                                    firstRawValue === true ||
                                    firstRawValue === "Yes"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-slate-200 text-slate-600"
                                  }`}
                                >
                                  {firstValue}
                                </span>
                              ) : (
                                firstValue
                              )}
                            </div>
                            {comparison?.better === "first" && (
                              <TrendingUp className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
                            )}
                          </div>
                          <div className="relative">
                            <div
                              className={`rounded-lg px-3 py-2 font-medium text-slate-800 ${
                                comparison?.better === "second"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : comparison?.better === "first"
                                  ? "bg-slate-50"
                                  : "bg-slate-50"
                              }`}
                            >
                              {field.type === "boolean" ? (
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                                    secondRawValue === true ||
                                    secondRawValue === "Yes"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-slate-200 text-slate-600"
                                  }`}
                                >
                                  {secondValue}
                                </span>
                              ) : (
                                secondValue
                              )}
                            </div>
                            {comparison?.better === "second" && (
                              <TrendingUp className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
        </div>
      </main>
    </>
  );
};

export default ComparePage;
