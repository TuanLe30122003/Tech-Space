"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const Wishlist = () => {
  const {
    wishlistItems,
    products,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
  } = useAppContext();

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-semibold text-gray-900">My Wishlist</h1>
        </div>
        <span className="text-gray-600">
          {getWishlistCount()} {getWishlistCount() === 1 ? "item" : "items"}
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add items you love to your wishlist and they'll appear here
          </p>
          <button
            onClick={() => (window.location.href = "/all-products")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              //   showWishlistButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
