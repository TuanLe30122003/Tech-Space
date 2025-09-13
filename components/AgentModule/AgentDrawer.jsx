"use client";

import React, { useState } from "react";

const AgentDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "agent",
      content:
        "Hello! I'm your AI tech assistant. Ask me anything about technology!",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "user",
      content: "What is React.js?",
      timestamp: new Date(),
    },
    {
      id: 3,
      type: "agent",
      content:
        "React.js is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and allows developers to create reusable UI components.",
      timestamp: new Date(),
    },
    {
      id: 4,
      type: "user",
      content: "How does Next.js differ from React?",
      timestamp: new Date(),
    },
    {
      id: 5,
      type: "agent",
      content:
        "Next.js is a React framework that adds features like server-side rendering, routing, and optimization out of the box. While React is just a library for building UIs, Next.js provides a complete framework for building production-ready applications.",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center gap-2">
            <div className="maxw">
              <h2 className="text-xl font-bold">Tech Space Agent</h2>
              <p className="text-sm text-gray-500">
                Your Tech Space AI assistant is here to help
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-xs ${
                      message.type === "user"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about technology..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <button
                onClick={() => {
                  if (inputMessage.trim()) {
                    const newMessage = {
                      id: messages.length + 1,
                      type: "user",
                      content: inputMessage.trim(),
                      timestamp: new Date(),
                    };
                    setMessages([...messages, newMessage]);
                    setInputMessage("");
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Question
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AgentDrawer;
