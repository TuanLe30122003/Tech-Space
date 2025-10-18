"use client";
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState({});

  const fetchProductDetails = async (productId) => {
    try {
      const { data } = await axios.get(`/api/product/detail?id=${productId}`);
      if (data.success) {
        return data.product;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
  };

  const fetchOrders = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const ordersData = data.orders.reverse();
        setOrders(ordersData);

        // Fetch product details for all items
        const productIds = new Set();
        ordersData.forEach((order) => {
          order.items.forEach((item) => {
            productIds.add(item.product);
          });
        });

        // Fetch all product details
        const productPromises = Array.from(productIds).map(
          async (productId) => {
            const product = await fetchProductDetails(productId);
            return { productId, product };
          }
        );

        const productResults = await Promise.all(productPromises);
        const productsMap = {};
        productResults.forEach(({ productId, product }) => {
          if (product) {
            productsMap[productId] = product;
          }
        });

        setProductsData(productsMap);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  console.log(productsData);
  console.log(orders);

  return (
    <div className="flex-1 w-full h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:py-10 p-4 space-y-5 w-full">
          <h2 className="text-lg font-medium">My Orders</h2>
          <div className=" rounded-md">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  {order.items.length > 0 &&
                  productsData[order.items[0].product] ? (
                    <Image
                      className="max-w-16 max-h-16 object-cover rounded"
                      src={productsData[order.items[0].product].image[0]}
                      alt={productsData[order.items[0].product].name}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box_icon"
                    />
                  )}
                  <p className="flex flex-col gap-3">
                    <span className="font-medium text-base">
                      {order.items
                        .map((item) => {
                          const product = productsData[item.product];
                          const productName = product
                            ? product.name
                            : `Product ${item.product}`;
                          return `${productName} x ${item.quantity}`;
                        })
                        .join(", ")}
                    </span>
                    <span>Items : {order.items.length}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">
                      {order.address.fullName}
                    </span>
                    <br />
                    <span>{order.address.area}</span>
                    <br />
                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                    <br />
                    <span>{order.address.phoneNumber}</span>
                  </p>
                </div>
                <p className="font-medium my-auto">
                  {currency}
                  {order.amount}
                </p>
                <div>
                  <p className="flex flex-col">
                    <span>Method : COD</span>
                    <span>
                      Date : {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span>Payment : Pending</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
