"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const CreatePromotion = () => {
  const { getToken } = useAppContext();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [applicableToAll, setApplicableToAll] = useState(true);
  const [usageLimit, setUsageLimit] = useState("");
  const [minPurchaseAmount, setMinPurchaseAmount] = useState("0");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert datetime-local to timestamp
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    const promotionData = {
      code,
      name,
      description,
      discountType,
      discountValue: Number(discountValue),
      startDate: startTimestamp,
      endDate: endTimestamp,
      isActive,
      applicableToAll,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      minPurchaseAmount: Number(minPurchaseAmount) || 0,
    };

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/promotion/create",
        promotionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setCode("");
        setName("");
        setDescription("");
        setDiscountType("percentage");
        setDiscountValue("");
        setStartDate("");
        setEndDate("");
        setIsActive(true);
        setApplicableToAll(true);
        setUsageLimit("");
        setMinPurchaseAmount("0");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create <span className="text-orange-600">Promotion</span>
        </h2>

        {/* Code */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="promotion-code">
            Promotion Code <span className="text-red-500">*</span>
          </label>
          <input
            id="promotion-code"
            type="text"
            placeholder="e.g., SUMMER2024"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 uppercase max-w-[450px]"
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            value={code}
            required
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="promotion-name">
            Promotion Name <span className="text-red-500">*</span>
          </label>
          <input
            id="promotion-name"
            type="text"
            placeholder="e.g., Summer Sale 2024"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium"
            htmlFor="promotion-description"
          >
            Description
          </label>
          <textarea
            id="promotion-description"
            rows={3}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none max-w-[450px]"
            placeholder="Enter promotion description (optional)"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        {/* Discount Type */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="discount-type">
            Discount Type <span className="text-red-500">*</span>
          </label>
          <select
            id="discount-type"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setDiscountType(e.target.value)}
            value={discountType}
            required
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        {/* Discount Value */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="discount-value">
            Discount Value <span className="text-red-500">*</span>
          </label>
          <input
            id="discount-value"
            type="number"
            placeholder={discountType === "percentage" ? "0-100" : "0"}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setDiscountValue(e.target.value)}
            value={discountValue}
            min="0"
            max={discountType === "percentage" ? "100" : undefined}
            required
          />
          {discountType === "percentage" && (
            <p className="text-xs text-gray-500">Enter value between 0-100</p>
          )}
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="start-date">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            id="start-date"
            type="datetime-local"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            required
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="end-date">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            id="end-date"
            type="datetime-local"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            required
          />
        </div>

        {/* Usage Limit */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="usage-limit">
            Usage Limit
          </label>
          <input
            id="usage-limit"
            type="number"
            placeholder="Leave empty for unlimited"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setUsageLimit(e.target.value)}
            value={usageLimit}
            min="0"
          />
          <p className="text-xs text-gray-500">Leave empty for unlimited</p>
        </div>

        {/* Min Purchase Amount */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium"
            htmlFor="min-purchase-amount"
          >
            Min Purchase Amount
          </label>
          <input
            id="min-purchase-amount"
            type="number"
            placeholder="0"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 max-w-[450px]"
            onChange={(e) => setMinPurchaseAmount(e.target.value)}
            value={minPurchaseAmount}
            min="0"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              id="is-active"
              type="checkbox"
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              onChange={(e) => setIsActive(e.target.checked)}
              checked={isActive}
            />
            <label className="text-base font-medium" htmlFor="is-active">
              Active
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="applicable-to-all"
              type="checkbox"
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              onChange={(e) => setApplicableToAll(e.target.checked)}
              checked={applicableToAll}
            />
            <label
              className="text-base font-medium"
              htmlFor="applicable-to-all"
            >
              Applicable to All Products
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded hover:bg-orange-700 transition"
        >
          CREATE PROMOTION
        </button>
      </form>
    </div>
  );
};

export default CreatePromotion;
