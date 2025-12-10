"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import toast from "react-hot-toast";
import useWishlistStore from "@/store/wishlist";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const envCurrency = process.env.NEXT_PUBLIC_CURRENCY;
  const currency =
    !envCurrency || envCurrency.trim().toLowerCase() === "usd"
      ? "đ"
      : envCurrency;
  const router = useRouter();

  const { user } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const prevUserRef = useRef(null);

  const CART_STORAGE_KEY = "techspace_cart_items";

  const saveCartToLocalStorage = (cartData) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      }
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
    return {};
  };

  const clearCartFromLocalStorage = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  };

  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter((category) => category != null && category !== "")
      ),
    ];
    return uniqueCategories.sort();
  }, [products]);

  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,
    clearWishlist,
    initializeFromSession,
    syncWithSession,
  } = useWishlistStore();

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      if (user.publicMetadata.role === "seller") {
        setIsSeller(true);
      }

      const token = await getToken();

      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);

        // Merge localStorage cart with server cart when user logs in
        const localCart = loadCartFromLocalStorage();
        const serverCart = data.user.cartItems || {};

        // Merge carts: combine quantities for same items
        const mergedCart = { ...serverCart };
        for (const itemId in localCart) {
          if (mergedCart[itemId]) {
            mergedCart[itemId] += localCart[itemId];
          } else {
            mergedCart[itemId] = localCart[itemId];
          }
        }

        setCartItems(mergedCart);

        // Sync merged cart to server
        try {
          await axios.post(
            "/api/cart/update",
            { cartData: mergedCart },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Error syncing merged cart:", error);
        }

        // Clear localStorage cart after merging
        clearCartFromLocalStorage();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    if (user) {
      // User is logged in - sync to server
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item added to cart");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // User is not logged in - save to localStorage
      saveCartToLocalStorage(cartData);
      toast.success("Item added to cart");
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    if (user) {
      // User is logged in - sync to server
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Cart Updated");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // User is not logged in - save to localStorage
      saveCartToLocalStorage(cartData);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo?.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
    initializeFromSession();

    // Load cart from localStorage if user is not logged in
    if (!user) {
      const localCart = loadCartFromLocalStorage();
      if (Object.keys(localCart).length > 0) {
        setCartItems(localCart);
      }
    }
  }, []);

  useEffect(() => {
    // Chỉ xóa wishlist khi user chuyển từ đã đăng nhập sang đăng xuất
    // Không xóa khi component mount lần đầu (prevUserRef.current === null)
    if (prevUserRef.current !== null && prevUserRef.current && !user) {
      // User đã đăng xuất
      clearWishlist();
      // Load cart from localStorage when user logs out
      const localCart = loadCartFromLocalStorage();
      if (Object.keys(localCart).length > 0) {
        setCartItems(localCart);
      } else {
        setCartItems({});
      }
    }

    // Cập nhật ref với user hiện tại
    prevUserRef.current = user;

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    syncWithSession();
  }, [wishlistItems]);

  // Save cart to localStorage when cartItems change and user is not logged in
  useEffect(() => {
    if (!user && cartItems) {
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems, user]);

  const value = {
    user,
    getToken,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    isLoading,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    categories,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,
    clearWishlist,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
