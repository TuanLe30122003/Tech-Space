"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

const HeaderSlider = () => {
  const { router } = useAppContext();

  const sliderData = [
    {
      id: 1,
      title: "MacBook Pro M5 - Superior Performance for Professional Work!",
      offer: "Special Offer - 35% Off",
      buttonText1: "Buy Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_slider_image1,
      category: "Laptop",
    },
    {
      id: 2,
      title: "Latest iPad - Unleash Your Creativity and Productivity!",
      offer: "Limited Time Offer - 30% Off",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_slider_image2,
      category: "Tablet",
    },
    {
      id: 3,
      title: "Apple Watch - Your Health and Fitness Companion!",
      offer: "Special Deal - 25% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_slider_image3,
      category: "Watch",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleButton1Click = (category) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  const handleButton2Click = (category) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <motion.div
      className="overflow-hidden relative w-full z-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex"
        animate={{ x: `-${currentSlide * 100}%` }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {sliderData.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0.7,
              scale: currentSlide === index ? 1 : 0.98,
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button
                  onClick={() => handleButton1Click(slide.category)}
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium hover:bg-orange-700 transition-colors cursor-pointer"
                >
                  {slide.buttonText1}
                </button>
                <button
                  onClick={() => handleButton2Click(slide.category)}
                  className="group flex items-center gap-2 px-6 py-2.5 font-medium hover:text-orange-600 transition-colors cursor-pointer"
                >
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center md:w-80 w-48 aspect-square">
              <Image
                className="object-cover"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex items-center justify-center gap-2 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      >
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeaderSlider;
