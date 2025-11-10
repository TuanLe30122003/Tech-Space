"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="w-full px-6 md:px-16 lg:px-32 py-16">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl w-full font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our products or need technical support? Our
              AI assistant and support team are here to help you 24/7.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Phone className="w-6 h-6 text-orange-600" />,
                      title: "Phone",
                      lines: ["0378765203", "Mon-Fri 9AM-6PM"],
                    },
                    {
                      icon: <Mail className="w-6 h-6 text-orange-600" />,
                      title: "Email",
                      lines: [
                        "TuanLe30122003@gmail.com",
                        "We'll respond within 24 hours",
                      ],
                    },
                    {
                      icon: <MapPin className="w-6 h-6 text-orange-600" />,
                      title: "Location",
                      lines: [
                        "Ha Noi City, Vietnam",
                        "Serving customers worldwide",
                      ],
                    },
                    {
                      icon: <Clock className="w-6 h-6 text-orange-600" />,
                      title: "AI Assistant",
                      lines: [
                        "Available 24/7",
                        "Instant tech support and guidance",
                      ],
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
                    >
                      <div className="bg-orange-100 p-3 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.lines[0]}</p>
                        <p className="text-sm text-gray-500">{item.lines[1]}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.55 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Why Contact Us?
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Product recommendations and compatibility</li>
                  <li>• Technical support and troubleshooting</li>
                  <li>• Order status and shipping inquiries</li>
                  <li>• Returns and warranty information</li>
                  <li>• Bulk orders and business partnerships</li>
                  <li>• Feedback and suggestions</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send us a Message
              </h2>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.35 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.45 }}
                >
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.5 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 flex items-center justify-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.55 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </motion.form>

              <motion.div
                className="mt-8 p-4 bg-blue-50 rounded-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> For faster assistance, try our AI
                  assistant first! It can help with most technical questions and
                  product recommendations instantly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
