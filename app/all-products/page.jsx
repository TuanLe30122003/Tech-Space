"use client";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products, categories, isLoading } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory === "All") return true;
        return product.category === selectedCategory;
      })
      .filter((product) => {
        if (!searchTerm.trim()) return true;
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter((product) => {
        const price = product.offerPrice ?? product.price ?? 0;
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        if (!Number.isNaN(min) && price < min) {
          return false;
        }
        if (!Number.isNaN(max) && price > max) {
          return false;
        }
        return true;
      });
  }, [selectedCategory, searchTerm, minPrice, maxPrice, products]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-col items-end pt-12">
        <p className="text-2xl font-medium">All products</p>
        <div className="h-0.5 w-16 rounded-full bg-orange-600"></div>
      </div>

      <div className="mt-12 flex w-full flex-col gap-10 lg:flex-row">
        <aside className="w-full rounded-lg border border-gray-200 p-6 lg:w-64 h-fit">
          <p className="text-lg font-semibold text-gray-800">Categories</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>
              <button
                className={`w-full rounded-md px-3 py-2 text-left transition ${
                  selectedCategory === "All"
                    ? "bg-orange-50 text-orange-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`w-full rounded-md px-3 py-2 text-left transition ${
                    selectedCategory === category
                      ? "bg-orange-50 text-orange-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1">
          <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 text-sm text-gray-700 md:flex-row md:items-end md:justify-between">
            <div className="flex w-full flex-col gap-2 md:w-1/3">
              <label htmlFor="search">Search by name</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="rounded border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-1/3">
              <label htmlFor="minPrice">Min price</label>
              <input
                id="minPrice"
                type="number"
                min={0}
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="0"
                className="rounded border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-1/3">
              <label htmlFor="maxPrice">Max price</label>
              <input
                id="maxPrice"
                type="number"
                min={0}
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="1000"
                className="rounded border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mt-10 grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500">
                No products match your filters.
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={`${product._id}-${index}`}
                  product={product}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllProducts;
