"use client";
import React, { useEffect, useMemo, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { formatPrice } from "@/components/ProductCard";
import { AnimatePresence, motion } from "framer-motion";

const MyOrders = () => {
  const { currency, getToken, user, products } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState({});
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const ordersData = data.orders.reverse();
        setOrders(ordersData);

        const productsMap = {};
        ordersData.forEach((order) => {
          order.items?.forEach((item) => {
            if (item?.product?._id) {
              const product = products.find((p) => p._id === item.product._id);
              if (product) {
                productsMap[item.product._id] = product;
              }
            }
          });
        });

        setProductsData(productsMap);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && products.length > 0) {
      fetchOrders();
    }
  }, [user, products]);

  const orderStats = useMemo(() => {
    if (!orders.length) {
      return { totalOrders: 0, totalItems: 0 };
    }
    const totalItems = orders.reduce((total, order) => {
      return (
        total +
        (order.items || []).reduce(
          (count, item) => count + (item?.quantity || 0),
          0
        )
      );
    }, 0);
    return { totalOrders: orders.length, totalItems };
  }, [orders]);

  const formatStatus = (status) => {
    if (!status) return "Order Placed";
    // Capitalize first letter of each word
    return status
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";
    switch (normalizedStatus) {
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      case "delivered":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "arrived":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "order placed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const canCancelOrder = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";
    return normalizedStatus !== "delivered" && normalizedStatus !== "cancelled";
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrder(orderId);
      const token = await getToken();

      const { data } = await axios.patch(
        "/api/order/cancel",
        { orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
        toast.success("Order cancelled successfully");
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to cancel order");
    } finally {
      setCancellingOrder(null);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-12 pb-20 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              My orders
            </h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Track the status of your purchases and view order details all in
              one place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {orderStats.totalOrders}{" "}
              {orderStats.totalOrders === 1 ? "order" : "orders"}
            </div>
            <div className="rounded-2xl bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              {orderStats.totalItems} items
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-slate-300 bg-white px-10 py-20 text-center shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-inner">
                <Image
                  src={assets.box_icon}
                  alt="empty orders"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-900">
                  No orders yet
                </h2>
                <p className="text-sm text-slate-500 md:text-base">
                  When you place your first order, it will appear here with all
                  the details.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {orders.map((order, index) => {
                const firstProduct =
                  order.items?.length > 0 && order.items[0]?.product?._id
                    ? productsData[order.items[0].product._id]
                    : null;
                const orderDate = order.date
                  ? new Date(order.date).toLocaleDateString()
                  : "N/A";
                const totalItemCount = (order.items || []).reduce(
                  (count, item) => count + (item?.quantity || 0),
                  0
                );
                return (
                  <motion.article
                    key={order._id ?? index}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: index * 0.05,
                    }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-1 gap-4 md:gap-6">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-4 shadow-inner">
                          {firstProduct?.image?.[0] ? (
                            <Image
                              src={firstProduct.image[0]}
                              alt={firstProduct?.name || "Product"}
                              width={80}
                              height={80}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <Image
                              src={assets.box_icon}
                              alt="box icon"
                              width={48}
                              height={48}
                              className="h-12 w-12 object-contain"
                            />
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                              {order.items
                                ?.map((item) => {
                                  const product = item?.product?._id
                                    ? productsData[item.product._id]
                                    : null;
                                  const name = product
                                    ? product.name
                                    : item?.product?.name || `Product`;
                                  return `${name} x ${item?.quantity || 0}`;
                                })
                                .join(", ") || "No items"}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                              {totalItemCount}{" "}
                              {totalItemCount === 1 ? "item" : "items"}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>
                              Order ID: {order._id?.slice(-8) || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3 md:gap-6">
                        <div className="space-y-1 flex flex-col justify-between items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Shipping to
                          </p>
                          <p className="font-semibold text-slate-800">
                            {order.address?.fullName || "N/A"}
                          </p>
                          <p>{order.address?.area || "N/A"}</p>
                          <p>{`${order.address?.city || "N/A"}, ${
                            order.address?.state || "N/A"
                          }`}</p>
                          <p className="text-xs text-slate-400">
                            {order.address?.phoneNumber || "N/A"}
                          </p>
                        </div>
                        <div className="space-y-1 flex flex-col justify-between items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Payment summary
                          </p>
                          <p className="text-lg font-semibold text-slate-900">
                            {formatPrice(order.amount || 0, currency)}
                          </p>
                          <p className="text-xs text-slate-500">
                            Method:{" "}
                            <span className="font-medium">
                              Cash on delivery
                            </span>
                          </p>
                        </div>
                        <div className="space-y-2 flex flex-col justify-between items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Status
                          </p>
                          <p className={`rounded-full px-4 py-1.5 text-xs font-semibold border w-fit ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status || "Order Placed")}
                          </p>
                          {canCancelOrder(order.status) && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              disabled={cancellingOrder === order._id}
                              className="mt-1 px-4 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                            >
                              {cancellingOrder === order._id ? (
                                <>
                                  <svg
                                    className="animate-spin h-3 w-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  <span>Cancelling...</span>
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                  <span>Cancel Order</span>
                                </>
                              )}
                            </button>
                          )}
                          <p className="text-xs text-slate-500">
                            Placed on{" "}
                            <span className="font-medium">{orderDate}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyOrders;
