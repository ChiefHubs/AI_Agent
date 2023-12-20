import React, { useState } from "react";
import "./style.css";

import Sidebar from "./Sidebar";
import Chat from "../chat/Chat";

const Home = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (text) => {
    const newMessage = { text };
    console.log("message", newMessage);
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left side content */}
      <div className="hidden md:block md:w-[20%]">
        <Sidebar queries={messages} />
      </div>
      {/* Right side content */}
      <div className="w-full md:w-[80%]">
        <div className="bg-[#f4f4f4] h-screen flex flex-col justify-between mb-2">
          <Chat onSendMessage={(text) => addMessage(text)} />
        </div>
      </div>
    </div>
  );
};

export default Home;
