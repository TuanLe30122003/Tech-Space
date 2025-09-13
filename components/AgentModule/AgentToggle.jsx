"use client";

import { Bot } from "lucide-react";
import React, { useState } from "react";
import AgentDrawer from "./AgentDrawer";

const AgentToggle = () => {
  const [isAgent, setIsAgent] = useState(false);

  const toggleAgent = () => {
    setIsAgent(!isAgent);
  };

  const closeAgent = () => {
    setIsAgent(false);
  };

  return (
    <>
      <div className="fixed bottom-10 right-10">
        <button
          onClick={toggleAgent}
          className="bg-blue-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
      <AgentDrawer isOpen={isAgent} onClose={closeAgent} />
    </>
  );
};

export default AgentToggle;
