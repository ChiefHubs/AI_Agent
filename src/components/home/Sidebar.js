import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faGear,
  faUser,
  faArrowRightFromBracket,
  faKey,
  faTemperatureThreeQuarters,
  faAngleDown,
  faAngleRight,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const leftMenuItems = [
  {
    title: "Profile",
    icon: faUser,
  },
  {
    title: "Change Password",
    icon: faLock,
  },
  {
    title: "Setting",
    icon: faGear,
  },
  //   {
  //     title: "UI Key",
  //     icon: faKey,
  //   },
  //   {
  //     title: "LLM Temperature",
  //     icon: faTemperatureThreeQuarters,
  //   },
  {
    title: "Logout",
    icon: faArrowRightFromBracket,
  },
];

const Sidebar = ({ queries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  return (
    <div className="bg-[#333] flex flex-col items-start p-4 h-screen">
      <div
        onClick={() => window.location.reload()}
        className="flex items-center w-full p-1 rounded-lg hover:bg-[#202123]"
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="text-[#ececf1] p-1 h-8 w-8">
            <FontAwesomeIcon
              icon={faRecordVinyl}
              fontSize="1.5em"
              className="icon-style"
            />
          </div>
          <h2 className="text-[#ececf1] font-semibold">New Chat</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        {/* recent chats */}
        <div>
          <p className="text-[#666666] text-sm mt-1">Today</p>
          <div className="text-[#fff] text-sm space-y-4 mt-4 w-full">
            {queries.map((q, index) => (
              <div
                key={index}
                className="p-1 w-full rounded-lg cursor-pointer hover:bg-[#202123]"
              >
                {q.text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4 relative">
          {isOpen && (
            <div class="absolute bottom-10 w-full bg-black origin-top-right rounded-md ">
              {leftMenuItems.map((item, i) => (
                <div class="py-2 rounded-md w-full hover:bg-[#202123]" key={i}>
                  <div className="block px-3 py-2 mt-2 text-[#fff] text-sm font-semibold rounded-lg md:mt-0  focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon
                      icon={item.icon}
                      fontSize="1em"
                      className="icon-style px-3"
                    />
                    {item.title}

                    {/* <span className="flex justify-between">
                      {item.title}
                      {item.title === "Setting" && (
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          fontSize="1em"
                          onClick={() => setIsSettingOpen(true)}
                        />
                      )}
                    </span> */}

                    {/* {item.title === "Setting" && 
                    
                    !isSettingOpen ? (
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        fontSize="1em"
                        onClick={() => setIsSettingOpen(true)}
                      />
                    ) : (
                      <FontAwesomeIcon
                         icon={faAngleRight}
                        fontSize="1em"
                        onClick={() => setIsSettingOpen(false)}
                      />
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* account */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center w-full p-2 mt-16 rounded-lg hover:bg-[#202123]"
          >
            {/* <img
              src="/images/asset 0.png"
              alt="account"
              className="w-8 h-8 rounded-full"
            /> */}
            <p className="text-[#fff] h-8 p-1">Pooja Patel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
