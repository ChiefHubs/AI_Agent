import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Chat from "../../chat/components/Chat";
import ChangePassword from "../../menu/ChangePassword";
import LLMTemperature from "../../menu/LLMTemperature";
import Profile from "../../menu/Profile";
import FileUpload from "../../menu/UIKey";
import UIKey from "../../menu/UIKey";
import "../style.css";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuPageOpen, setIsMenuPageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
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
        <Sidebar queries={messages} setCurrentPage={setCurrentPage} />
      </div>

      {/* Right side content */}
      <div className="w-full md:w-[80%]">
        <div className="bg-[#f4f4f4] h-screen flex flex-col justify-between mb-2">
          {currentPage === "" ? (
            <Chat
              onSendMessage={(text) => addMessage(text)}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          ) : (
            <>
              <div
                className="flex cursor-pointer align-end"
                onClick={() => setCurrentPage("")}
              >
                <div className="text-p-1 h-8 w-8"></div>
                <h2 className="text-[#f4f4f4]  bg-black px-3 py-3 rounded-lg mt-2 font-semibold justify-end">
                  Close
                </h2>
              </div>
              {currentPage === "Change Password" && <ChangePassword />}

              {currentPage === "LLM Temperature" && <LLMTemperature />}
              {currentPage === "Profile" && <Profile />}
              {currentPage === "UI Key" && <UIKey />}
              {currentPage === "File Upload" && <FileUpload />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
