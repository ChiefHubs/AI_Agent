import React, { useState, useRef, useEffect } from "react";
import { getStyles } from "../../menu/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { generateChat } from "../apis";
import "../style.css";
import { useSelector } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function BubbleChat({
  activeChat,
  setActiveChat,
  setQueries,
  questionList,
  setQuestionList,
}) {
  const activeModel = useSelector((store) => store.auth.activeModel);
  const [question, setQuestion] = useState("");
  const [isOpen, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [setStyle, setStyleData] = useState(false);

  const bottomRef = useRef(null);

  const { first_question, font_size, font_color, chat_back } =
    setStyle.length > 0 ? setStyle[0] : {};
  const handleSendMessage = async () => {
    // e.preventDefault();
    setQuestionList([...questionList, question]);

    if (!question) {
      return;
    }
    let payload = {
      question: question,
      modelId: activeModel,
    };

    if (!activeChat.id) {
      const splitQues = question.split(" ");

      payload.isNew = true;
      payload.title =
        splitQues[0] + " " + (splitQues[1] || "") + " " + (splitQues[2] || "");
    } else {
      payload.id = activeChat.id;
    }
    setIsLoading(true);
    setQuestion("");
    await generateChat(payload)
      .then((res) => {
        setQueries(res.data.chats);

        const oldActiveChat = res.data.chats.find(
          (chat) => chat.id === activeChat.id
        );
        const chat = oldActiveChat
          ? oldActiveChat
          : res.data.chats[res.data.chats.length - 1];
        setActiveChat(chat);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        toast("Something went wrong. Please check retrain model status", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false);
      });
  };

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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.queries.length]);

  useEffect(() => {
    getStyle();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // console.log("Enter key pressed ✅");
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div>
      <div
        className={`flex flex-col justify-between  mb-2 bg-white h-[400px] w-[350px] fixed right-4 bottom-12 shadow-lg border-1 rounded-lg overflow-hidden transition-transform duration-300  ${
          isOpen ? "" : "transform translate-y-full opacity-0"
        } `}
      >
        <div className="bg-sky-900 w-full h-12 flex justify-start items-center rounded-t-lg">
          <img src="/images/bot.png" className="w-10 ml-2" />
        </div>
        <div className="h-[230px] overflow-y-scroll">
          <div
            className={`${
              questionList.length > 0 || activeChat.queries.length > 0
            } rounded overflow-y-scroll  w-full  mx-auto md:p-0 p-4 flex flex-col`}
          >
            <div className={`text-sm font-bold flex justify-start my-1`}>
              <img
                src="/images/bot.png"
                className="w-10 h-10 rounded-lg ml-1"
              />
              <span className="font-bold ml-1 bg-gray-300 p-2 rounded-lg">
                {!first_question ? "How can I help you?" : first_question}
              </span>
            </div>
            {questionList.length > 0 &&
              questionList.map((m, index) => (
                <>
                  <div className="flex flex-col items-end w-full my-1 ">
                    <p className="p-2 rounded-lg bg-indigo-700 text-white">
                      {m}
                    </p>
                  </div>

                  <div className={`text-sm font-bold flex justify-start my-1`}>
                    <img
                      src="/images/bot.png"
                      className="w-10 h-10 rounded-lg ml-1"
                    />
                    <span className="font-bold ml-1 bg-gray-300 p-2 rounded-lg">
                      {isLoading && questionList.length - 1 === index ? (
                        <span className="flex justify-center items-center h-full">
                          <img src="/images/dots.gif" className="w-12" />
                        </span>
                      ) : (
                        <p>
                          {activeChat.queries.map((ans, index) => (
                            <p key={index}>
                              <Markdown remarkPlugins={[remarkGfm]}>
                                {m === ans.question && ans.solution}
                              </Markdown>
                            </p>
                          ))}
                        </p>
                      )}
                    </span>
                  </div>
                </>
              ))}
            <div ref={bottomRef} />
          </div>
        </div>
        <div className="p-4">
          <div className="w-full h-[50px] border border-gray-600 flex items-center rounded-lg p-2">
            <input
              value={question}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`h-full w-full p-2 outline-none bg-inherit`}
              type="text"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="h-full p-2 rounded-lg icon-style text-[#ececf1]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
          <p className="text-xs text-white p-2 text-center"></p>
          <ToastContainer />
        </div>
      </div>
      <button
        onClick={() => {
          setOpen(!isOpen);
        }}
        className="bg-sky-900 rounded-full w-[50px] h-[50px] p-2 shadow-lg text-white fixed bottom-1 right-4"
      >
        <FontAwesomeIcon icon={isOpen ? faChevronDown : faMessage} />
      </button>
    </div>
  );
}

export default BubbleChat;
