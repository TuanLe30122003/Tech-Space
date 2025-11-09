"use client";
import React, { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

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
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Collections</p>
        <div className="mt-2 h-0.5 w-28 bg-orange-600"></div>
      </div>

      <div className="mt-12 space-y-14 px-4 md:px-10">
        {collections.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500">
            No collections available right now.
          </div>
        ) : (
          collections.map(({ category, items }) => (
            <section key={category} className="space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Explore our curated selection for the{" "}
                    {category.toLowerCase()} collection.
                  </p>
                </div>
                <button
                  className="rounded border px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                  onClick={() => handleCollectionClick(category)}
                >
                  View all
                </button>
              </div>
              <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((product, index) => (
                  <ProductCard
                    key={`${category}-${product._id}-${index}`}
                    product={product}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
