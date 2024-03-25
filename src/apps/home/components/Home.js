import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getStyles } from "../../menu/apis";
import Sidebar from "./Sidebar";
import Chat from "../../chat/components/Chat";
import ChangePassword from "../../menu/components/ChangePassword";
import Admin from "../../admin/components/Admin";
import LLMTemperature from "../../menu/components/LLMTemperature";
import Profile from "../../menu/components/Profile";
import FileUpload from "../../menu/components/FileUpload";
import LLMKey from "../../menu/components/LLMKey";
import SetPrompt from "../../menu/components/SetPrompt";
import UpgradeGPT from "../../menu/components/UpgradeGPT";
import Others from "../../menu/components/Others";
import "../style.css";
import { getAllQueries } from "../apis";
import setAuthHeader from "../../../_helpers/setAuthHeader";
import { Helmet } from "react-helmet";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [isCurrentMenuOpen, setIsCurrentMenuOpen] = useState(false);
  const [queries, setQueries] = useState([]);
  const [setStyle, setStyleData] = useState(false);
  const [activeChat, setActiveChat] = useState({ queries: [] });

  const theme = useSelector((store) => store.setting.isDark);

  const [questionList, setQuestionList] = useState([]);

  const { chat_back, text_title, font_size, font_color } =
    setStyle.length > 0 ? setStyle[0] : {};
  const getQueries = async () => {
    setIsLoading(true);
    await getAllQueries()
      .then((res) => {
        setQueries(res.data?.chats || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setAuthHeader(sessionStorage.getItem("user"));
    getQueries();
    setCurrentPage("");
  }, []);

  const getStyle = async () => {
    setIsLoading(true);
    await getStyles()
      .then((res) => {
        setStyleData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getStyle();
  }, []);

  const handleCreateNewChat = () => {
    setActiveChat({ queries: [] });
    setIsMenuOpen && setIsMenuOpen(false);
    setCurrentPage("");
    setQuestionList([]);
  };

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }
  const originColor = theme === true ? "block" : "#171717";

  console.log("chat----", chat_back);
  return (
    <>
      {text_title ? (
        <Helmet>
          <title>{text_title}</title>
        </Helmet>
      ) : (
        <></>
      )}

      {
        <div className="md:w-full h-screen flex">
          <div className={`hidden md:block  md:w-[40%] lg:w-[20%]`}>
            <Sidebar
              queries={queries}
              setCurrentPage={setCurrentPage}
              setActiveChat={setActiveChat}
              setQueries={setQueries}
              getQueries={getQueries}
              activeChat={activeChat}
              currentPage={currentPage}
              isCurrentMenuOpen={isCurrentMenuOpen}
              setIsCurrentMenuOpen={setIsCurrentMenuOpen}
              handleCreateNewChat={handleCreateNewChat}
              questionList={questionList}
              setQuestionList={setQuestionList}
            />
          </div>
          <div
            style={{
              backgroundColor: theme === true ? chat_back : !originColor,
            }}
            className="w-full md:w-[80%] h-screen md:h-screen"
          >
            <div className="flex flex-row justify-between">
              <h1
                className={`font-bold text-xl ${
                  theme === true ? "text-[#ececf1]" : "text-black"
                } p-4`}
              >
                <span className="font-bold">
                  {!text_title ? "IYKYK Agent" : text_title}
                </span>
              </h1>
              <div className="md:hidden p-4 cursor-pointer">
                <FontAwesomeIcon
                  icon={isMenuOpen ? faXmark : faBars}
                  // size={25}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>
            </div>
            {currentPage === "GoAdmin" && (
              <Admin setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "" ? (
              <Chat
                setIsMenuOpen={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                setQueries={setQueries}
                questionList={questionList}
                setQuestionList={setQuestionList}
              />
            ) : (
              <>
                {currentPage === "Change Password" && (
                  <ChangePassword setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "Upgrade GPT" && (
                  <UpgradeGPT setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "LLM Temperature" && (
                  <LLMTemperature setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "Profile" && (
                  <Profile setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "LLM Key" && (
                  <LLMKey setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "File Upload" && (
                  <FileUpload setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "System Prompt" && (
                  <SetPrompt setCurrentPage={setCurrentPage} />
                )}
                {currentPage === "Others" && (
                  <Others setCurrentPage={setCurrentPage} />
                )}
              </>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default Home;
