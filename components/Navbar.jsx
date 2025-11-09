"use client";
import React, { useState, useRef, useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { ArrowDown, ChevronDown, Heart } from "lucide-react";

const Navbar = () => {
  const { isSeller, router, user, getWishlistCount, products, categories } =
    useAppContext();
  const { openSignIn } = useClerk();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  console.log(products);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsMobileCollectionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCollectionsOpen(false);
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    setIsMobileCollectionsOpen(false);
    router.push(path);
  };

  return (
    <nav className="relative flex w-full items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-6 max-lg:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:text-gray-900 transition flex flex-row items-center gap-1"
          >
            <span>Collections</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && categories && categories.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="py-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          {isDropdownOpen && (!categories || categories.length === 0) && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2 px-4 text-sm text-gray-500">
                No categories available
              </div>
            </div>
          )}
        </div>
        <div className="relative group">
          <Link
            href="/compare"
            className="hover:text-gray-900 text-[#F59E0B] font-semibold transition"
          >
            Compare
          </Link>
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden w-max -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:block group-hover:opacity-100">
            Compare our products
          </span>
        </div>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden lg:flex items-center gap-4 cursor-pointer">
        <div className="relative" onClick={() => router.push("/wishlist")}>
          <Heart className="w-4 h-4 cursor-pointer hover:text-red-500 transition" />
          {getWishlistCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {getWishlistCount()}
            </span>
          )}
        </div>

        <Image
          className="w-4 h-4 cursor-pointer"
          src={assets.search_icon}
          alt="search icon"
          onClick={() => router.push("/search")}
        />
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div
        className="relative flex items-center lg:hidden gap-3 z-50"
        ref={mobileMenuRef}
      >
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="rounded-full border p-2"
        >
          <Image src={assets.menu_icon} alt="menu icon" className="w-4 h-4" />
        </button>
        {isMobileMenuOpen && (
          <div className="absolute right-0 top-full mt-3 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <button
                onClick={() => handleNavigation("/")}
                className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-100 transition"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/all-products")}
                className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-100 transition"
              >
                Shop
              </button>
              <div className="rounded-md border border-gray-100">
                <button
                  onClick={() => setIsMobileCollectionsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-3 py-2 hover:bg-gray-100 transition"
                >
                  <span>Collections</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isMobileCollectionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileCollectionsOpen && (
                  <div className="flex max-h-48 flex-col gap-1 overflow-y-auto border-t border-gray-100 p-2">
                    {categories && categories.length > 0 ? (
                      categories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => handleCategoryClick(category)}
                          className="w-full rounded-md px-2 py-1 text-left text-xs hover:bg-gray-100 transition"
                        >
                          {category}
                        </button>
                      ))
                    ) : (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        No categories available
                      </span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleNavigation("/compare")}
                className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-100 transition"
                title="Compare our products"
              >
                Compare
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-100 transition"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-100 transition"
              >
                Contact
              </button>
              {!user && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSignIn();
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 transition"
                >
                  <Image
                    src={assets.user_icon}
                    alt="user icon"
                    className="w-4 h-4"
                  />
                  Account
                </button>
              )}
              {user && (
                <div className="flex flex-col gap-2 text-xs">
                  <button
                    onClick={() => handleNavigation("/cart")}
                    className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 transition"
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-orders")}
                    className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 transition"
                  >
                    My Orders
                  </button>
                </div>
              )}
              <button
                onClick={() => handleNavigation("/wishlist")}
                className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 transition"
              >
                Wishlist
              </button>
              <button
                onClick={() => handleNavigation("/search")}
                className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 transition"
              >
                Search
              </button>
            </div>
          </div>
        )}
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
