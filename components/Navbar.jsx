"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { ArrowDown, ChevronDown, Heart } from "lucide-react";

const Navbar = () => {
  const {
    isSeller,
    router,
    user,
    getWishlistCount,
    products,
    categories,
    cartItems,
    getCartCount,
    getCartAmount,
    currency,
  } = useAppContext();
  const { openSignIn } = useClerk();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const cartDrawerRef = useRef(null);

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
      if (
        cartDrawerRef.current &&
        !cartDrawerRef.current.contains(event.target)
      ) {
        setIsCartDrawerOpen(false);
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
    setIsCartDrawerOpen(false);
    router.push(path);
  };

  const cartSummary = useMemo(() => {
    if (!cartItems || !products) return [];

    return Object.entries(cartItems)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = products.find((item) => item._id === productId);
        if (!product) {
          return null;
        }
        return {
          id: productId,
          name: product.name,
          image: product.image?.[0] ?? assets.product_list_icon,
          price: product.offerPrice ?? product.price ?? 0,
          quantity,
          total: (product.offerPrice ?? product.price ?? 0) * quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems, products]);

  const cartItemCount = typeof getCartCount === "function" ? getCartCount() : 0;
  const cartTotalAmount =
    typeof getCartAmount === "function" ? getCartAmount() : 0;
  const resolvedCurrency = useMemo(() => {
    if (!currency) return "USD";
    if (currency === "đ") return "VND";
    return currency.toUpperCase();
  }, [currency]);

  const formatPrice = useCallback(
    (value) => {
      const numericValue = Number(value);
      if (Number.isNaN(numericValue)) return "";
      try {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: resolvedCurrency,
          currencyDisplay: "symbol",
        }).format(numericValue);
      } catch (error) {
        return `${currency || ""}${numericValue.toFixed(2)}`;
      }
    },
    [currency, resolvedCurrency]
  );

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
          {user && getWishlistCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {getWishlistCount()}
            </span>
          )}
        </div>
        <div className="relative" ref={cartDrawerRef}>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-full p-2 hover:border-gray-300 transition"
            aria-label="Open cart drawer"
          >
            <CartIcon className="w-4 h-4 cursor-pointer hover:text-red-500 transition" />
            {cartItemCount > 0 && (
              <span className="absolute top-[1px] right-[-2px] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          {isCartDrawerOpen && (
            <div className="absolute right-0 top-12 z-50 w-[26rem] max-w-[90vw] rounded-xl border border-gray-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-gray-800">
                  Your Cart ({cartItemCount})
                </p>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-3">
                {cartSummary.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-sm text-gray-500">
                    <Image
                      src={assets.cart_icon}
                      alt="Empty cart"
                      className="h-8 w-8 opacity-60"
                    />
                    <span>Your cart is empty.</span>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        router.push("/all-products");
                      }}
                      className="rounded-full border border-orange-500 px-4 py-1 text-xs font-medium text-orange-500 transition hover:bg-orange-50"
                    >
                      Start shopping
                    </button>
                  </div>
                ) : (
                  cartSummary.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 rounded-lg border border-gray-100 p-3"
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Quantity: {item.quantity}</span>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                          <span>Total</span>
                          <span>{formatPrice(item.total)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartSummary.length > 0 && (
                <div className="border-t border-gray-100 px-4 py-3">
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      router.push("/cart");
                    }}
                    className="mt-3 w-full rounded-full bg-orange-600 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
                  >
                    View cart & checkout
                  </button>
                </div>
              )}
            </div>
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
