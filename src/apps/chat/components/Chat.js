import React, { useState, useRef, useEffect, useReducer } from "react";
import { getStyles } from "../../menu/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMicrophone,
  faMicrophoneSlash,
  faPaperPlane,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { generateChat } from "../apis";
import "../style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getTokenOrRefresh } from "./speech";
import speechsdk, {
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";

function Chat({
  activeChat,
  setActiveChat,
  setQueries,
  questionList,
  setQuestionList,
}) {
  const theme = useSelector((store) => store.setting.isDark);

  const activeModel = useSelector((store) => store.auth.activeModel);
  const [question, setQuestion] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [setStyle, setStyleData] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timer, dispatch] = useReducer(reducer, 0);
  const interval = useRef();
  const audioCtxContainer = useRef();
  const mediaRecorder = useRef();
  const chunks = [];

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

  function reducer(state, action) {
    if (action.type === "increment") {
      return state + 1;
    }
    if (action.type === "reset") {
      return 0;
    }
    throw Error("Unknown action.");
  }
  const startTimer = () => {
    interval.current = setInterval(() => {
      dispatch({ type: "increment" });
    }, 1000);
  };

  const generateText = async (content) => {
    "use server";

    // const response = await speechToText(content);
    // return response;
  };

  const handleRecording = () => {
    console.log("recording-------", recording);
    recording ? stopRecording() : startRecording();
    setRecording(!recording);
  };

  const stopRecording = () => {
    setQuestion("speaking done.........");
  };

  const startRecording = async () => {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    setQuestion("speak into your microphone...");

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        setQuestion(`RECOGNIZED: Text=${result.text}`);
      } else {
        setQuestion(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
      }
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between mb-2">
        <div>
          {/* <h1 className="font-bold text-xl text-black p-4">Agent Query</h1> */}
          <div
            // style={{ backgroundColor: chat_back }}
            className={`${
              (questionList.length > 0 || activeChat.queries.length > 0) &&
              (theme === true
                ? `bg-[${chat_back}]  text-white`
                : "white border-slate-300")
            } rounded overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col`}
          >
            {questionList.length === 0 ? (
              <div
                className={`text-xl font-bold flex justify-center ${
                  theme === true ? "text-[#ececf1]" : "text-black"
                }`}
              >
                <span
                  // style={{ fontSize: font_size, color: font_color }}
                  className="font-bold"
                >
                  {!first_question ? "How can I help you?" : first_question}
                </span>
              </div>
            ) : (
              <></>
            )}
            {questionList.length > 0 &&
              questionList.map((m, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 my-6 p-2"
                >
                  <div className="flex flex-col items-start">
                    <p
                      style={
                        theme === true
                          ? { fontSize: font_size, color: font_color }
                          : { fontSize: font_size, color: "black" }
                      }
                      className={`font-bold`}
                    >
                      {m && "You"}
                    </p>
                    <p
                      style={
                        theme === true
                          ? { fontSize: font_size, color: font_color }
                          : { fontSize: font_size, color: "black" }
                      }
                      className={`${
                        theme === true ? "text-gray-300" : "text-black"
                      }`}
                    >
                      {m}
                    </p>

                    <p
                      style={
                        theme === true
                          ? { fontSize: font_size, color: font_color }
                          : { fontSize: font_size, color: "black" }
                      }
                      className={`${
                        theme === true ? "text-gray-300" : "text-black"
                      } font-bold`}
                    >
                      {m && "Answer"}
                    </p>
                    {isLoading && questionList.length - 1 === index && (
                      <p
                        style={
                          theme === true
                            ? { fontSize: font_size, color: font_color }
                            : { fontSize: font_size, color: "black" }
                        }
                        className={`${
                          theme === true ? "text-gray-300" : "text-black"
                        } text-sm animate-pulse text-center`}
                      >
                        Loading...
                      </p>
                    )}
                    {activeChat.queries.map((ans, index) => (
                      <div
                        style={
                          theme === true
                            ? { fontSize: font_size, color: font_color }
                            : { fontSize: font_size, color: "black" }
                        }
                        key={index}
                        className={`${
                          theme === true ? "text-gray-300" : "text-black"
                        }`}
                      >
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {m === ans.question && ans.solution}
                        </Markdown>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            <div ref={bottomRef} />
          </div>
        </div>
        {/* {isLoading && (
          <p className="text-black text-sm animate-pulse text-center">
            Loading...
          </p>
        )} */}
        <div className="w-full flex  justify-center items-center flex-row p-4 md:p-0">
          <button className="mr-2 p-3" onClick={() => handleRecording()}>
            <FontAwesomeIcon
              icon={recording ? faMicrophoneSlash : faMicrophone}
              className={`${
                theme === true ? "text-white" : "text-black"
              } text-2xl`}
            />
          </button>
          <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
            <button
              onClick={() => setQuestion("")}
              className="h-full p-2 rounded-lg icon-style text-[#ececf1]"
            >
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
            <input
              value={question}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`${
                theme === true ? "text-gray-300" : "text-black"
              } h-full w-full p-2 outline-none bg-inherit`}
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
        <div className="flex justify-between p-6">
          <Link
            to={"/policy"}
            target="_blank"
            className={`${
              theme === true ? `text-white ` : `text-black`
            } underline`}
          >
            Our Policy
          </Link>
          <Link
            to={"/terms"}
            target="_blank"
            className={`${
              theme === true ? `text-white ` : `text-black`
            } underline `}
          >
            Term and Condition
          </Link>
          <Link
            to={"/privacy"}
            target="_blank"
            className={`${
              theme === true ? `text-white ` : `text-black`
            } underline `}
          >
            Privacy Policy
          </Link>
          <Link
            to="mailto:support-team@iykyknow.ai"
            className={`${
              theme === true ? `text-white ` : `text-black`
            } underline `}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}

export default Chat;
