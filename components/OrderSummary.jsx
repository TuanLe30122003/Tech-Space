import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/components/ProductCard";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPromoDropdownOpen, setIsPromoDropdownOpen] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPromotions = async () => {
    try {
      const { data } = await axios.get("/api/promotion/list?activeOnly=true");
      if (data.success) {
        setPromotions(data.promotions || []);
      }
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const validateAndApplyPromotion = async (code) => {
    try {
      const cartAmount = getCartAmount();
      const { data } = await axios.post("/api/promotion/validate", {
        code,
        orderAmount: cartAmount + Math.floor(cartAmount * 0.02),
      });

      if (data.success) {
        setSelectedPromotion(data.promotion);
        setDiscountAmount(data.promotion.discountAmount);
        setPromoCodeInput(code);
        toast.success("Promotion applied successfully!");
      } else {
        toast.error(data.message);
        setSelectedPromotion(null);
        setDiscountAmount(0);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setSelectedPromotion(null);
      setDiscountAmount(0);
    }
  };

  const handlePromoCodeSubmit = () => {
    if (!promoCodeInput.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    validateAndApplyPromotion(promoCodeInput.trim().toUpperCase());
  };

  const handlePromotionSelect = (promotion) => {
    validateAndApplyPromotion(promotion.code);
    setIsPromoDropdownOpen(false);
  };

  const removePromotion = () => {
    setSelectedPromotion(null);
    setDiscountAmount(0);
    setPromoCodeInput("");
    toast.success("Promotion removed");
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!user) {
        return toast("Please login to place order", {
          icon: "⚠️",
        });
      }

      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      let cartItemsArray = Object.keys(cartItems).map((key) => ({
        product: key,
        quantity: cartItems[key],
      }));
      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty");
      }

      const token = await getToken();
      const cartAmount = getCartAmount();
      const tax = Math.floor(cartAmount * 0.02);
      const subtotal = cartAmount + tax;
      const finalAmount = Math.max(0, subtotal - discountAmount);

      const { data } = await axios.post(
        "/api/order/create",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
          promotionCode: selectedPromotion?.code || null,
          discountAmount: discountAmount,
          finalAmount: finalAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push("/order-placed");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
    fetchPromotions();
  }, [user]);

  // Re-validate promotion when cart amount changes
  useEffect(() => {
    if (selectedPromotion) {
      const cartAmount = getCartAmount();
      const orderAmount = cartAmount + Math.floor(cartAmount * 0.02);

      axios
        .post("/api/promotion/validate", {
          code: selectedPromotion.code,
          orderAmount,
        })
        .then(({ data }) => {
          if (data.success) {
            setDiscountAmount(data.promotion.discountAmount);
          } else {
            // Promotion no longer valid, remove it
            setSelectedPromotion(null);
            setDiscountAmount(0);
            setPromoCodeInput("");
            toast.error(data.message);
          }
        })
        .catch(() => {
          // Silently fail on re-validation
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, selectedPromotion]);

  return (
    <div className="lg:w-[360px] w-full bg-gray-500/5 p-5 rounded-3xl">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 flex flex-row items-center justify-between pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          {selectedPromotion ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800">
                    {selectedPromotion.code} - {selectedPromotion.name}
                  </p>
                  <p className="text-xs text-green-600">
                    {selectedPromotion.discountType === "percentage"
                      ? `${selectedPromotion.discountValue}% off`
                      : `${formatPrice(
                          selectedPromotion.discountValue,
                          currency
                        )} off`}
                  </p>
                </div>
                <button
                  onClick={removePromotion}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-col items-start gap-2">
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCodeInput}
                    onChange={(e) =>
                      setPromoCodeInput(e.target.value.toUpperCase())
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && handlePromoCodeSubmit()
                    }
                    className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
                  />
                  <button
                    onClick={handlePromoCodeSubmit}
                    className="bg-orange-600 text-white px-4 py-2 hover:bg-orange-700 whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>
              {promotions.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setIsPromoDropdownOpen(!isPromoDropdownOpen)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>Or select from available promotions</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isPromoDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isPromoDropdownOpen && (
                    <ul className="absolute w-full bg-white border border-gray-300 shadow-md mt-1 z-20 max-h-60 overflow-y-auto">
                      {promotions.map((promo, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => handlePromotionSelect(promo)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800">
                                {promo.code}
                              </p>
                              <p className="text-xs text-gray-600">
                                {promo.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {promo.discountType === "percentage"
                                  ? `${promo.discountValue}% off`
                                  : `${formatPrice(
                                      promo.discountValue,
                                      currency
                                    )} off`}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {formatPrice(getCartAmount(), currency)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {formatPrice(Math.floor(getCartAmount() * 0.02), currency)}
            </p>
          </div>
          {selectedPromotion && discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>Discount ({selectedPromotion.code})</p>
              <p className="font-medium">
                -{formatPrice(discountAmount, currency)}
              </p>
            </div>
          )}
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {formatPrice(
                Math.max(
                  0,
                  getCartAmount() +
                    Math.floor(getCartAmount() * 0.02) -
                    discountAmount
                ),
                currency
              )}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
