"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Search, X } from "lucide-react";

const SearchPage = () => {
  const { products, router, currency } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const relatedKeywords = ["laptop", "earphone", "headphone"];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery, products]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRelatedKeywordClick = (keyword) => {
    setSearchQuery(keyword);
  };

  const formatPrice = (price) => {
    return price?.toLocaleString() || "N/A";
  };

  const displayedResults = searchResults.slice(0, 8); // Show max 8 products

  return (
    <>
      <div className=" px-6 md:px-16 lg:px-32 pt-10 pb-20">
        <h1 className="text-4xl font-medium mb-8 text-center w-full">
          What products are you looking for?
        </h1>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-2 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          {/* <div className="lg:col-span-1 flex flex-row justify-start gap-10 items-center">
            <h3 className="text-lg font-medium text-gray-800">
              Popular Keywords:
            </h3>
            <div className=" flex flex-row gap-2 items-start">
              {relatedKeywords.map((keyword, index) => (
                <p
                  key={index}
                  onClick={() => handleRelatedKeywordClick(keyword)}
                  className="text-sm flex items-start text-gray-600 hover:text-orange-600 transition w-full text-center cursor-pointer"
                >
                  <span>{keyword}</span>
                </p>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col gap-10 items-center justify-center">
            {searchQuery !== "" && (
              <h3 className="text-lg font-semibold text-gray-800">
                Results for "{searchQuery}"
              </h3>
            )}

            {searchQuery === "" ? (
              <div className="text-center py-12 text-gray-500">
                Enter a keyword to search for products
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No products found for "{searchQuery}"
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {displayedResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="cursor-pointer group"
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
                        {formatPrice(product.offerPrice || 0)} {currency}
                      </p>
                    </div>
                  ))}
                </div>

                {searchResults.length > 8 && (
                  <div className="text-center">
                    <button className="text-orange-600 hover:text-orange-700 font-medium transition">
                      View all {searchResults.length} results for "{searchQuery}
                      " →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
