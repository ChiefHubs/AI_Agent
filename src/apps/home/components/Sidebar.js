import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faGear,
  faUser,
  faArrowRightFromBracket,
  faKey,
  faTemperatureThreeQuarters,
  faAngleDown,
  faAngleUp,
  faLock,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../auth/actions";

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

  {
    title: "Logout",
    icon: faArrowRightFromBracket,
  },
];

const settingMenu = [
  {
    title: "File Upload",
    icon: faFileArrowUp,
  },
  {
    title: "LLM Key",
    icon: faKey,
  },
  {
    title: "LLM Temperature",
    icon: faTemperatureThreeQuarters,
  },
];

const Sidebar = ({
  queries,
  setCurrentPage,
  setActiveChat,
  activeChat,
  handleCreateNewChat,
  setIsMenuOpen,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <div className="bg-[#333] flex flex-col items-start p-4 h-screen">
      {/* new chat button */}
      <div className="flex items-center w-full p-1 rounded-lg hover:bg-[#202123]">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="text-[#ececf1] p-1 h-8 w-8">
            <FontAwesomeIcon
              icon={faRecordVinyl}
              fontSize="1.5em"
              className="icon-style"
            />
          </div>
          <h2
            onClick={handleCreateNewChat}
            className="text-[#ececf1] font-semibold"
          >
            New Chat
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        {/* recent chats title */}

        <div>
          <p className="text-[#666666] text-sm mt-1">Today</p>
          <div className="text-[#fff] text-sm space-y-4 mt-4 w-full overflow-y-scroll h-[70vh]">
            {queries.length !== 0 &&
              queries.map((q, index) => (
                <div
                  style={{
                    backgroundColor:
                      q.id === activeChat.id ? "#434b49" : "inherit",
                  }}
                  key={index}
                  onClick={() => {
                    setActiveChat(q);
                    setCurrentPage("");
                    setIsMenuOpen && setIsMenuOpen(false);
                  }}
                  className="px-2 py-2 truncate w-full rounded-lg cursor-pointer hover:bg-[#202123]"
                >
                  {q.title}
                </div>
              ))}
          </div>
        </div>

        {/* left side bottom menu */}
        <div className="flex flex-col space-y-4 relative">
          {isOpen && (
            <div className="absolute bottom-10 w-full bg-black origin-top-right rounded-md ">
              {leftMenuItems.map((item, i) => (
                <div
                  className="py-2 rounded-md w-full hover:bg-[#202123]"
                  key={i}
                >
                  <div className="block px-3 py-2 mt-2 text-[#fff] text-sm font-semibold rounded-lg md:mt-0  focus:outline-none focus:shadow-outline">
                    {item.title === "Setting" ? (
                      <div className="cursor-pointer">
                        <div
                          className="flex items-center"
                          onClick={() => setIsSettingOpen(!isSettingOpen)}
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            fontSize="1em"
                            className="icon-style px-3"
                          />
                          <div className="flex flex-row justify-between items-center w-full cursor-pointer">
                            {item.title}
                            {!isSettingOpen ? (
                              <FontAwesomeIcon
                                icon={faAngleDown}
                                fontSize="1em"
                                className="icon-style"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faAngleUp}
                                fontSize="1em"
                                className="icon-style"
                              />
                            )}
                          </div>
                        </div>

                        {/* setting submenu */}
                        {isSettingOpen &&
                          settingMenu.map((item, i) => {
                            return (
                              <div
                                className="flex flex-row py-2 rounded-md w-full hover:bg-bl cursor-pointer hover:bg-black"
                                key={i}
                                onClick={() => {
                                  setCurrentPage(item.title);
                                  setIsMenuOpen && setIsMenuOpen(false);
                                }}
                              >
                                <div className="block px-3 py-2 mt-2 text-[#fff] text-sm font-semibold rounded-lg md:mt-0  focus:outline-none focus:shadow-outline">
                                  <FontAwesomeIcon
                                    icon={item.icon}
                                    fontSize="1em"
                                    className="icon-style px-3"
                                  />
                                  {item.title}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : item.title === "Logout" ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          dispatch(logout);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          fontSize="1em"
                          className="icon-style px-3 "
                        />
                        {item.title}
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setCurrentPage(item.title);
                          setIsMenuOpen && setIsMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          fontSize="1em"
                          className="icon-style px-3 "
                        />
                        {item.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* user account details */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center w-full p-2 rounded-lg hover:bg-[#202123] cursor-pointer"
          >
            <img
              src="/images/default_user.jpg"
              alt="account"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-[#fff] h-8 p-1">
              {user.firstName + " " + user.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
