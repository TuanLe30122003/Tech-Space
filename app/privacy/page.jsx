"use client";
import React from "react";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <div className="w-full mt-4">
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
            Privacy Policy
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-base text-center text-gray-500 max-w-2xl mx-auto mt-4">
            At TechSpace, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website and use our services.
          </p>
        </motion.div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-lg mb-4">
              Welcome to TechSpace. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
            <p className="text-lg">
              By using our website, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with our policies and practices, please do not use our services.
            </p>
          </motion.section>

          {/* Information We Collect */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-lg mb-4">
              We collect several types of information from and about users of
              our website:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2.1 Personal Information
                </h3>
                <p className="text-lg mb-2">
                  When you create an account, place an order, or interact with
                  our services, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>
                    Name and contact information (email address, phone number)
                  </li>
                  <li>Shipping and billing addresses</li>
                  <li>
                    Payment information (processed securely through third-party
                    payment processors)
                  </li>
                  <li>Account credentials (username, password)</li>
                  <li>Order history and purchase preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2.2 Automatically Collected Information
                </h3>
                <p className="text-lg mb-2">
                  When you visit our website, we automatically collect certain
                  information about your device and browsing behavior:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information (type, operating system)</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Search terms used on our website</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2.3 AI Assistant Interactions
                </h3>
                <p className="text-lg mb-2">
                  When you interact with our AI assistant, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Conversation history and queries</li>
                  <li>Product preferences and interests</li>
                  <li>Technical questions and support requests</li>
                  <li>Feedback and ratings</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-lg mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>
                <strong>Order Processing:</strong> To process and fulfill your
                orders, manage payments, and arrange shipping
              </li>
              <li>
                <strong>Account Management:</strong> To create and manage your
                account, authenticate your identity, and provide customer
                support
              </li>
              <li>
                <strong>Personalization:</strong> To personalize your shopping
                experience, recommend products, and improve our AI assistant's
                responses
              </li>
              <li>
                <strong>Communication:</strong> To send you order confirmations,
                shipping updates, promotional materials (with your consent), and
                respond to your inquiries
              </li>
              <li>
                <strong>Website Improvement:</strong> To analyze website usage,
                identify trends, and improve our website's functionality and
                user experience
              </li>
              <li>
                <strong>Security:</strong> To detect, prevent, and address
                technical issues, fraud, and security threats
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with applicable
                laws, regulations, and legal processes
              </li>
            </ul>
          </motion.section>

          {/* Data Sharing and Disclosure */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-lg mb-4">
              We do not sell your personal information. We may share your
              information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>
                <strong>Service Providers:</strong> With third-party service
                providers who perform services on our behalf, such as payment
                processing, shipping, data analytics, and customer support
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any
                merger, sale of assets, or acquisition of all or a portion of
                our business
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or government regulation, or to protect our rights,
                property, or safety
              </li>
              <li>
                <strong>With Your Consent:</strong> When you have given us
                explicit consent to share your information
              </li>
            </ul>
            <p className="text-lg mt-4">
              All third-party service providers are required to maintain the
              confidentiality of your information and are prohibited from using
              it for any purpose other than providing services to us.
            </p>
          </motion.section>

          {/* Data Security */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Data Security
            </h2>
            <p className="text-lg mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>
                Secure socket layer (SSL) technology for data transmission
              </li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-lg mt-4">
              However, no method of transmission over the Internet or electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your personal information, we cannot
              guarantee absolute security.
            </p>
          </motion.section>

          {/* Your Rights */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Your Rights
            </h2>
            <p className="text-lg mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>
                <strong>Access:</strong> Request access to your personal
                information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to
                another service provider
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your
                personal information
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing
                your personal information
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent for data
                processing where applicable
              </li>
            </ul>
            <p className="text-lg mt-4">
              To exercise any of these rights, please contact us using the
              information provided in the "Contact Us" section below.
            </p>
          </motion.section>

          {/* Cookies and Tracking */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-lg mb-4">
              We use cookies and similar tracking technologies to track activity
              on our website and store certain information. Cookies are small
              data files stored on your device. We use both session cookies
              (which expire when you close your browser) and persistent cookies
              (which remain until deleted or expired).
            </p>
            <p className="text-lg mb-4">Types of cookies we use:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors interact with our website
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant
                advertisements (with your consent)
              </li>
            </ul>
            <p className="text-lg mt-4">
              You can control cookies through your browser settings. However,
              disabling cookies may limit your ability to use certain features
              of our website.
            </p>
          </motion.section>

          {/* Third-Party Services */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Third-Party Services
            </h2>
            <p className="text-lg mb-4">
              Our website may contain links to third-party websites, services,
              or applications. We are not responsible for the privacy practices
              of these third parties. We encourage you to read the privacy
              policies of any third-party services you access.
            </p>
            <p className="text-lg">
              Third-party services we may use include payment processors,
              shipping providers, analytics services, and AI service providers.
              These services have their own privacy policies governing the
              collection and use of your information.
            </p>
          </motion.section>

          {/* Children's Privacy */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Children's Privacy
            </h2>
            <p className="text-lg">
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              you are a parent or guardian and believe your child has provided
              us with personal information, please contact us immediately. If we
              become aware that we have collected personal information from a
              child without parental consent, we will take steps to delete that
              information.
            </p>
          </motion.section>

          {/* Data Retention */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.45 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Data Retention
            </h2>
            <p className="text-lg">
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. When we
              no longer need your personal information, we will securely delete
              or anonymize it.
            </p>
          </motion.section>

          {/* Changes to This Policy */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-lg">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the new Privacy Policy on this page and updating the "Last
              updated" date. We encourage you to review this Privacy Policy
              periodically to stay informed about how we protect your
              information.
            </p>
          </motion.section>

          {/* Contact Us */}
          <motion.section
            className="bg-orange-50 p-8 rounded-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              12. Contact Us
            </h2>
            <p className="text-lg mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> TuanLe30122003@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> 0378765203
              </p>
              <p>
                <strong>Address:</strong> Ha Noi City, Vietnam
              </p>
            </div>
            <p className="text-lg mt-4">
              We will respond to your inquiry as soon as possible and within the
              timeframes required by applicable law.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPage;
