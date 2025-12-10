"use client";

import { MessageCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

const ChatbaseToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleChatbase = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Delay nhỏ để element render trước, sau đó mới chạy animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 300); // Đợi animation exit hoàn thành
    }
  };

  const closeChatbase = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-40">
        <button
          onClick={toggleChatbase}
          className={`bg-green-500 text-white p-3 md:p-3 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-green-600 hover:scale-110 active:scale-95 ${
            isOpen ? "rotate-90 scale-110" : ""
          }`}
          aria-label="Toggle Chatbase Bot"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300" />
        </button>
      </div>

      {/* Chatbase Bot Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeChatbase}
          />

          {/* Drawer */}
          <div
            className={`fixed inset-0 md:inset-auto md:bottom-10 md:right-10 md:w-[500px] md:h-[600px] bg-white shadow-2xl z-50 md:rounded-lg overflow-hidden flex flex-col transition-all duration-300 ${
              isAnimating
                ? "translate-x-0 translate-y-0 scale-100 opacity-100"
                : "translate-x-full translate-y-4 scale-95 opacity-0"
            }`}
          >
            {/* Mobile Header with Close Button */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">
                AI Assistant
              </h3>
              <button
                onClick={closeChatbase}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close chat"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/d8B1TwR7QMyoGUT1RJyBm"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                frameBorder="0"
                allow="microphone"
                title="Chatbase AI Assistant"
              ></iframe>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatbaseToggle;
