import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export function formatPrice(price, currency = "") {
  const numericValue =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^0-9.-]+/g, "")) || 0;
  const formattedPrice = numericValue.toLocaleString("vi-VN");
  const displayCurrency = currency || "đ";
  return `${formattedPrice}${displayCurrency}`.trim();
}

const ProductCard = ({ product, showWishlistButton = true }) => {
  const { currency, router, user, toggleWishlist, isInWishlist } =
    useAppContext();

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Ngăn chặn event bubbling đến parent div

    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }

    const isAdded = toggleWishlist(product._id);
    toast.success(isAdded ? "Added to wishlist" : "Removed from wishlist");
  };

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="relative flex flex-1 flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      <div className="cursor-pointer relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="hover:scale-105 transition-transform duration-300 object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        {showWishlistButton && (
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 z-20 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition hover:scale-110"
            title={
              isInWishlist(product._id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            <Heart
              className={`h-3 w-3 ${
                isInWishlist(product._id)
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400"
              }`}
            />
          </button>
        )}
      </div>

      <p className="md:text-base font-medium my-1 w-full truncate">
        {product.name}
      </p>
      <p className="w-full text-xs my-1 text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>
      <div className="flex items-center gap-2 my-1">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>
      <p className="text-base font-medium my-1">
        {formatPrice(product.offerPrice, currency)}
      </p>
      <button className=" max-sm:hidden px-4 mt-1 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
        Buy now
      </button>
    </div>
  );
};

export default ProductCard;
