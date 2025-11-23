"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import {
  specificationSchema,
  createEmptySpecifications,
} from "@/config/specificationSchema";

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [specifications, setSpecifications] = useState(() =>
    createEmptySpecifications("Earphone")
  );

  const handleSpecificationChange = (key, value, fieldType) => {
    let processedValue = value;

    // Xử lý giá trị theo type
    if (fieldType === "number") {
      processedValue =
        value === "" || value === null ? null : parseFloat(value);
      if (isNaN(processedValue)) processedValue = null;
    } else if (fieldType === "boolean") {
      processedValue = Boolean(value);
    }

    setSpecifications((prev) => ({
      ...prev,
      [key]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("specifications", JSON.stringify(specifications));

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const token = await getToken();

      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Earphone");
        setPrice("");
        setOfferPrice("");
        setSpecifications(createEmptySpecifications("Earphone"));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add <span className="text-orange-600">Product</span>
        </h2>
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => {
                const newCategory = e.target.value;
                setCategory(newCategory);
                setSpecifications(createEmptySpecifications(newCategory));
              }}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
        {specificationSchema[category] &&
          specificationSchema[category].length > 0 && (
            <div className="flex flex-col gap-4 max-w-2xl">
              <p className="text-base font-medium">Specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specificationSchema[category].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1">
                    <label
                      className="text-sm font-medium"
                      htmlFor={`spec-${field.key}`}
                    >
                      {field.label}
                      {field.unit && (
                        <span className="text-xs text-gray-500 ml-1">
                          ({field.unit})
                        </span>
                      )}
                    </label>
                    {field.type === "select" ? (
                      <select
                        id={`spec-${field.key}`}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        onChange={(e) =>
                          handleSpecificationChange(
                            field.key,
                            e.target.value,
                            field.type
                          )
                        }
                        value={specifications[field.key] ?? ""}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "boolean" ? (
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`spec-${field.key}`}
                            checked={specifications[field.key] === true}
                            onChange={() =>
                              handleSpecificationChange(
                                field.key,
                                true,
                                field.type
                              )
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`spec-${field.key}`}
                            checked={specifications[field.key] === false}
                            onChange={() =>
                              handleSpecificationChange(
                                field.key,
                                false,
                                field.type
                              )
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                    ) : field.type === "number" ? (
                      <div className="relative">
                        <input
                          id={`spec-${field.key}`}
                          type="number"
                          placeholder={field.placeholder || "0"}
                          className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
                          onChange={(e) =>
                            handleSpecificationChange(
                              field.key,
                              e.target.value,
                              field.type
                            )
                          }
                          value={specifications[field.key] ?? ""}
                          min={field.min}
                          max={field.max}
                          step={field.step || 1}
                        />
                        {field.unit && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            {field.unit}
                          </span>
                        )}
                      </div>
                    ) : (
                      <input
                        id={`spec-${field.key}`}
                        type="text"
                        placeholder={field.placeholder || "Type here"}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        onChange={(e) =>
                          handleSpecificationChange(
                            field.key,
                            e.target.value,
                            field.type
                          )
                        }
                        value={specifications[field.key] ?? ""}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;
