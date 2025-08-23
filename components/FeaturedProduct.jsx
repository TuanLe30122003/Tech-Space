import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.feature_product_4,
    title: "Vivid Display",
    description:
      "Enjoy stunning visuals and true-to-life colors with a modern tablet.",
  },
  {
    id: 2,
    image: assets.feature_product_2,
    title: "Smart Accessories",
    description:
      "Stay connected with seamless earphones, stylus, and keyboard for work or study.",
  },
  {
    id: 3,
    image: assets.feature_product_5,
    title: "Powerful Performance",
    description:
      "Experience a premium smartphone with sleek design and impressive camera.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-[-8px] transition duration-300 absolute top-8 left-8 text-black space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button
                className="flex items-center gap-1.5 bg-orange-600 text-white px-4 py-2 rounded"
                onClick={() => (window.location.href = "/all-products")}
              >
                Buy now{" "}
                <Image
                  className="h-3 w-3"
                  src={assets.redirect_icon}
                  alt="Redirect Icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
