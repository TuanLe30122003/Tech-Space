"use client";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex flex-col items-start"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex w-full flex-col items-start md:items-end pt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-2xl font-medium">All products</p>
        <motion.div
          className="h-0.5 w-16 rounded-full bg-orange-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        ></motion.div>
      </motion.div>

      <div className="mt-12 flex w-full flex-col gap-10 lg:flex-row">
        <motion.aside
          className="w-full rounded-lg border border-gray-200 p-6 lg:w-64 h-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-lg font-semibold text-gray-800">Categories</p>
          <motion.ul
            className="mt-4 space-y-2 text-sm text-gray-600"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
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
            </motion.li>
            {categories.map((category) => (
              <motion.li
                key={category}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
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
              </motion.li>
            ))}
          </motion.ul>
        </motion.aside>

        <motion.section
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 text-sm text-gray-700 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.div
              className="flex w-full flex-col gap-2 md:w-1/3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <label htmlFor="search">Search by name</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="rounded border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </motion.div>
            <motion.div
              className="flex w-full flex-col gap-2 md:w-1/3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
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
            </motion.div>
            <motion.div
              className="flex w-full flex-col gap-2 md:w-1/3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.45 }}
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            {filteredProducts.length === 0 ? (
              <motion.div
                className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                No products match your filters.
              </motion.div>
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={`${product._id}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12 * (index + 1),
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AllProducts;
