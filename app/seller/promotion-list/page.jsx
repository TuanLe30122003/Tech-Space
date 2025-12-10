"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { formatPrice } from "@/components/ProductCard";
import { motion } from "framer-motion";

const PromotionList = () => {
  const { router, getToken, user, currency } = useAppContext();

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPromotions = async () => {
    try {
      const { data } = await axios.get("/api/promotion/list");

      if (data.success) {
        setPromotions(data.promotions || []);
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPromotions();
    }
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPromotionStatus = (promotion) => {
    const now = Date.now();

    if (!promotion.isActive) {
      return {
        text: "Inactive",
        color: "bg-gray-100 text-gray-600 border-gray-200",
      };
    }

    if (now < promotion.startDate) {
      return {
        text: "Upcoming",
        color: "bg-blue-50 text-blue-600 border-blue-200",
      };
    }

    if (now > promotion.endDate) {
      return {
        text: "Expired",
        color: "bg-red-50 text-red-600 border-red-200",
      };
    }

    if (promotion.usageLimit && promotion.usedCount >= promotion.usageLimit) {
      return {
        text: "Limit Reached",
        color: "bg-orange-50 text-orange-600 border-orange-200",
      };
    }

    return {
      text: "Active",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    };
  };

  const formatDiscount = (promotion) => {
    if (promotion.discountType === "percentage") {
      return `${promotion.discountValue}%`;
    }
    return formatPrice(promotion.discountValue, currency);
  };

  const promotionStats = useMemo(() => {
    const now = Date.now();
    const active = promotions.filter(
      (p) =>
        p.isActive &&
        now >= p.startDate &&
        now <= p.endDate &&
        (!p.usageLimit || p.usedCount < p.usageLimit)
    ).length;
    const expired = promotions.filter(
      (p) => !p.isActive || now > p.endDate
    ).length;
    const upcoming = promotions.filter(
      (p) => p.isActive && now < p.startDate
    ).length;

    return { total: promotions.length, active, expired, upcoming };
  }, [promotions]);

  if (loading) {
    return (
      <div className=" flex flex-col justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4 pb-20 md:pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Promotion <span className="text-orange-600">List</span>
          </h2>
          <button
            onClick={() => router.push("/seller/promotions")}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm md:text-base"
          >
            + Create New Promotion
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-semibold text-gray-800">
              {promotionStats.total}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-emerald-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Active</p>
            <p className="text-2xl font-semibold text-emerald-600">
              {promotionStats.active}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-red-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Expired</p>
            <p className="text-2xl font-semibold text-red-600">
              {promotionStats.expired}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">Upcoming</p>
            <p className="text-2xl font-semibold text-blue-600">
              {promotionStats.upcoming}
            </p>
          </motion.div>
        </div>

        {promotions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 rounded-lg border border-dashed border-gray-300 bg-white"
          >
            <p className="text-gray-500 text-lg mb-2">No promotions found</p>
            <p className="text-gray-400 text-sm mb-4">
              Create your first promotion to get started
            </p>
            <button
              onClick={() => router.push("/seller/promotions")}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Create Promotion
            </button>
          </motion.div>
        ) : (
          <div className="w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead className="text-gray-900 text-sm text-left bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">Code</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Discount</th>
                    <th className="px-4 py-3 font-medium max-md:hidden">
                      Start Date
                    </th>
                    <th className="px-4 py-3 font-medium max-md:hidden">
                      End Date
                    </th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium max-sm:hidden">
                      Usage
                    </th>
                    <th className="px-4 py-3 font-medium max-md:hidden">
                      Min Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-500">
                  {promotions.map((promotion, index) => {
                    const status = getPromotionStatus(promotion);
                    return (
                      <motion.tr
                        key={promotion._id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-gray-500/20 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-800 font-mono">
                            {promotion.code}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 truncate">
                              {promotion.name}
                            </span>
                            {promotion.description && (
                              <span className="text-xs text-gray-400 truncate max-w-[200px]">
                                {promotion.description}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-orange-600">
                            {formatDiscount(promotion)}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-md:hidden">
                          <span className="text-xs">
                            {formatDateTime(promotion.startDate)}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-md:hidden">
                          <span className="text-xs">
                            {formatDateTime(promotion.endDate)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}
                          >
                            {status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-sm:hidden">
                          <span className="text-xs">
                            {promotion.usedCount || 0}
                            {promotion.usageLimit
                              ? ` / ${promotion.usageLimit}`
                              : " / ∞"}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-md:hidden">
                          <span className="text-xs">
                            {promotion.minPurchaseAmount > 0
                              ? formatPrice(
                                  promotion.minPurchaseAmount,
                                  currency
                                )
                              : "No limit"}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden w-full p-4 space-y-4">
              {promotions.map((promotion, index) => {
                const status = getPromotionStatus(promotion);
                return (
                  <motion.div
                    key={promotion._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 font-mono text-sm">
                            {promotion.code}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${status.color}`}
                          >
                            {status.text}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-800 mb-1">
                          {promotion.name}
                        </h3>
                        {promotion.description && (
                          <p className="text-xs text-gray-400 mb-2">
                            {promotion.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-500 mb-1">Discount</p>
                        <p className="font-semibold text-orange-600">
                          {formatDiscount(promotion)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Usage</p>
                        <p className="font-medium text-gray-800">
                          {promotion.usedCount || 0}
                          {promotion.usageLimit
                            ? ` / ${promotion.usageLimit}`
                            : " / ∞"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Start Date</p>
                        <p className="font-medium text-gray-800">
                          {formatDate(promotion.startDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">End Date</p>
                        <p className="font-medium text-gray-800">
                          {formatDate(promotion.endDate)}
                        </p>
                      </div>
                      {promotion.minPurchaseAmount > 0 && (
                        <div className="col-span-2">
                          <p className="text-gray-500 mb-1">Min Purchase</p>
                          <p className="font-medium text-gray-800">
                            {formatPrice(promotion.minPurchaseAmount, currency)}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PromotionList;
