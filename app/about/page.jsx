"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="w-full px-6 md:px-16 lg:px-32 py-16">
        <motion.div
          className="mx-auto"
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
            <h1 className="text-4xl w-full text-center font-bold text-gray-800 mb-4">
              About TechSpace
            </h1>

            <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
              TechSpace is your premier destination for cutting-edge technology
              products. We are a leading e-commerce platform specializing in the
              latest gadgets, electronics, and tech innovations that power your
              digital lifestyle.
            </p>
          </motion.div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to TechSpace
              </h2>
              <p className="text-lg">
                TechSpace is your premier destination for cutting-edge
                technology products. We are a leading e-commerce platform
                specializing in the latest gadgets, electronics, and tech
                innovations that power your digital lifestyle.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg">
                Our mission is to make advanced technology accessible to
                everyone. We carefully curate our product selection to bring you
                the most innovative and reliable tech solutions from top brands
                worldwide. Whether you're a tech enthusiast, professional, or
                simply looking to upgrade your digital experience, we have
                something perfect for you.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Premium Tech Products
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Latest smartphones and tablets</li>
                    <li>• High-performance laptops and computers</li>
                    <li>• Professional audio equipment</li>
                    <li>• Gaming consoles and accessories</li>
                    <li>• Smart home devices</li>
                    <li>• Photography and videography gear</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    AI-Powered Support
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Virtual AI assistant for tech guidance</li>
                    <li>• Product recommendations</li>
                    <li>• Technical troubleshooting</li>
                    <li>• Compatibility checking</li>
                    <li>• Setup and configuration help</li>
                    <li>• 24/7 instant support</li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Choose TechSpace?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🛡️",
                    title: "Quality Assurance",
                    description:
                      "Every product is carefully vetted for quality and authenticity. We partner only with trusted manufacturers and authorized distributors.",
                  },
                  {
                    icon: "🚀",
                    title: "Fast Delivery",
                    description:
                      "Quick and reliable shipping to get your tech products to you as fast as possible, with tracking and secure packaging.",
                  },
                  {
                    icon: "🤖",
                    title: "AI Assistant",
                    description:
                      "Our intelligent virtual assistant helps you find the perfect products and provides instant technical support whenever you need it.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="text-center p-6 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.1 + index * 0.1,
                    }}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Commitment
              </h2>
              <p className="text-lg">
                At TechSpace, we believe technology should enhance your life,
                not complicate it. That's why we've integrated artificial
                intelligence into every aspect of your shopping experience. Our
                AI assistant doesn't just help you find products – it
                understands your needs, answers your technical questions, and
                guides you through complex setups and troubleshooting.
              </p>
              <p className="text-lg mt-4">
                Whether you're a seasoned tech professional or just starting
                your digital journey, our platform and AI support system are
                designed to make technology accessible, understandable, and
                enjoyable for everyone.
              </p>
            </motion.section>

            <motion.section
              className="bg-orange-50 p-8 rounded-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to Explore?
              </h2>
              <p className="text-lg">
                Discover the latest in technology with confidence, knowing that
                our AI assistant is always ready to help. Browse our curated
                selection of premium tech products and experience shopping
                reimagined for the digital age.
              </p>
            </motion.section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default About;
