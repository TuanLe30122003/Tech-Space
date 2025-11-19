"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const specificationFields = {
  Earphone: [
    { key: "driverSize", label: "Driver Size" },
    { key: "connectivity", label: "Connectivity" },
    { key: "batteryLife", label: "Battery Life" },
    { key: "weight", label: "Weight" },
  ],
  Headphone: [
    { key: "driverSize", label: "Driver Size" },
    { key: "connectivity", label: "Connectivity" },
    { key: "batteryLife", label: "Battery Life" },
    { key: "noiseCancellation", label: "Noise Cancellation" },
  ],
  Watch: [
    { key: "display", label: "Display" },
    { key: "batteryLife", label: "Battery Life" },
    { key: "waterResistance", label: "Water Resistance" },
    { key: "strapMaterial", label: "Strap Material" },
  ],
  Smartphone: [
    { key: "display", label: "Display" },
    { key: "processor", label: "Processor" },
    { key: "ram", label: "RAM" },
    { key: "storage", label: "Storage" },
    { key: "batteryCapacity", label: "Battery Capacity" },
    { key: "camera", label: "Camera" },
  ],
  Laptop: [
    { key: "processor", label: "Processor" },
    { key: "ram", label: "RAM" },
    { key: "storage", label: "Storage" },
    { key: "display", label: "Display" },
    { key: "graphics", label: "Graphics" },
    { key: "operatingSystem", label: "Operating System" },
  ],
  Camera: [
    { key: "sensor", label: "Sensor" },
    { key: "lensMount", label: "Lens Mount" },
    { key: "megapixels", label: "Megapixels" },
    { key: "isoRange", label: "ISO Range" },
    { key: "videoResolution", label: "Video Resolution" },
  ],
  Accessories: [
    { key: "compatibility", label: "Compatibility" },
    { key: "material", label: "Material" },
    { key: "dimensions", label: "Dimensions" },
    { key: "weight", label: "Weight" },
  ],
};

const createEmptySpecifications = (category) => {
  const fields = specificationFields[category] || [];
  return fields.reduce((acc, field) => {
    acc[field.key] = "";
    return acc;
  }, {});
};

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

  const handleSpecificationChange = (key, value) => {
    setSpecifications((prev) => ({
      ...prev,
      [key]: value,
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
        {specificationFields[category] &&
          specificationFields[category].length > 0 && (
            <div className="flex flex-col gap-3 max-w-md">
              <p className="text-base font-medium">Specifications</p>
              {specificationFields[category].map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label
                    className="text-sm font-medium"
                    htmlFor={`spec-${key}`}
                  >
                    {label}
                  </label>
                  <input
                    id={`spec-${key}`}
                    type="text"
                    placeholder="Type here"
                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                    onChange={(e) =>
                      handleSpecificationChange(key, e.target.value)
                    }
                    value={specifications[key] ?? ""}
                  />
                </div>
              ))}
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
