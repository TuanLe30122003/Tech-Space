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
          order.items.forEach((item) => {
            const product = products.find((p) => p._id === item.product._id);
            if (product) {
              productsMap[item.product._id] = product;
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
        total + order.items.reduce((count, item) => count + item.quantity, 0)
      );
    }, 0);
    return { totalOrders: orders.length, totalItems };
  }, [orders]);

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
                  order.items.length > 0
                    ? productsData[order.items[0].product._id]
                    : null;
                const orderDate = new Date(order.date).toLocaleDateString();
                const totalItemCount = order.items.reduce(
                  (count, item) => count + item.quantity,
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
                          {firstProduct ? (
                            <Image
                              src={firstProduct.image[0]}
                              alt={firstProduct.name}
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
                                .map((item) => {
                                  const product =
                                    productsData[item.product._id];
                                  const name = product
                                    ? product.name
                                    : `Product`;
                                  return `${name} x ${item.quantity}`;
                                })
                                .join(", ")}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                              {totalItemCount}{" "}
                              {totalItemCount === 1 ? "item" : "items"}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>Order ID: {order._id.slice(-8)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3 md:gap-6">
                        <div className="space-y-1 flex flex-col justify-between items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Shipping to
                          </p>
                          <p className="font-semibold text-slate-800">
                            {order.address.fullName}
                          </p>
                          <p>{order.address.area}</p>
                          <p>{`${order.address.city}, ${order.address.state}`}</p>
                          <p className="text-xs text-slate-400">
                            {order.address.phoneNumber}
                          </p>
                        </div>
                        <div className="space-y-1 flex flex-col justify-between items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Payment summary
                          </p>
                          <p className="text-lg font-semibold text-slate-900">
                            {formatPrice(order.amount, currency)}
                          </p>
                          <p className="text-xs text-slate-500">
                            Method:{" "}
                            <span className="font-medium">
                              Cash on delivery
                            </span>
                          </p>
                        </div>
                        <div className="space-y-1 flex flex-col justify-between items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Status
                          </p>
                          <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 w-fit">
                            Pending confirmation
                          </p>
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
