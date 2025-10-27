import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="w-full px-6 md:px-16 lg:px-32 py-16">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl w-full text-center font-bold text-gray-800 mb-4">
              About TechSpace
            </h1>

            <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
              TechSpace is your premier destination for cutting-edge technology
              products. We are a leading e-commerce platform specializing in the
              latest gadgets, electronics, and tech innovations that power your
              digital lifestyle.
            </p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to TechSpace
              </h2>
              <p className="text-lg">
                TechSpace is your premier destination for cutting-edge
                technology products. We are a leading e-commerce platform
                specializing in the latest gadgets, electronics, and tech
                innovations that power your digital lifestyle.
              </p>
            </section>

            <section>
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
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
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
                </div>
                <div>
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
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Choose TechSpace?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600">
                    Every product is carefully vetted for quality and
                    authenticity. We partner only with trusted manufacturers and
                    authorized distributors.
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Quick and reliable shipping to get your tech products to you
                    as fast as possible, with tracking and secure packaging.
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
                  <p className="text-gray-600">
                    Our intelligent virtual assistant helps you find the perfect
                    products and provides instant technical support whenever you
                    need it.
                  </p>
                </div>
              </div>
            </section>

            <section>
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
            </section>

            <section className="bg-orange-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to Explore?
              </h2>
              <p className="text-lg">
                Discover the latest in technology with confidence, knowing that
                our AI assistant is always ready to help. Browse our curated
                selection of premium tech products and experience shopping
                reimagined for the digital age.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
