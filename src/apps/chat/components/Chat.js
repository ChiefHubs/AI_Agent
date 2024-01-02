import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { generateChat } from "../apis";
import "../style.css";

function Chat({ activeChat, setActiveChat, setQueries }) {
  const ref = useRef();
  const [prompt, setPrompt] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!question) {
      return;
    }
    let payload = {
      question: question,
      fileId: 1,
    };
    if (!activeChat.id) {
      const splitQues = question.split(" ");

      payload.isNew = true;
      payload.title = splitQues[0] + " " + splitQues[1];
    } else {
      payload.id = activeChat.id;
    }
    setIsLoading(true);
    await generateChat(payload)
      .then((res) => {
        setQueries(res.data.chats);

        const oldActiveChat = res.data.chats.find(
          (chat) => chat.id === activeChat.id
        );

        setPrompt(res.data.chats);

        const chat = oldActiveChat
          ? oldActiveChat
          : res.data.chats[res.data.chats.length - 1];
        setActiveChat(chat);
        setQuestion("");
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

  useEffect(() => {}, [question]);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-between mb-2">
        <div>
          {/* <h1 className="font-bold text-xl text-black p-4">Agent Query</h1> */}
          <div
            className={`${
              activeChat.queries.length > 0 && "bg-[#dad6d6]"
            } rounded overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col`}
          >
            {activeChat.queries.map((m, index) => (
              <div key={index} className="flex items-start space-x-4 my-6 p-2">
                {/* <img
                className="h-8 w-8 rounded-full"   
                src={m.isUser ? "/images/asset 0.png" : "/images/logo.png"}
                alt="user"
              /> */}
                <div className="flex flex-col items-start">
                  <p className="text-gray font-bold">{m.question && "You"}</p>
                  <p className="text-black">{m.question}</p>
                  {/* </div>
              <div className="flex flex-col items-start"> */}
                  <p className="text-gray font-bold">
                    {m.solution && "Answer"}
                  </p>
                  <p className="text-black">{m.solution}</p>
                </div>
              </div>
            ))}
            <div ref={ref} />
          </div>
        </div>
        {isLoading && (
          <p className="text-black text-sm animate-pulse text-center">
            Loading...
          </p>
        )}
        <div className="w-full flex justify-center items-center flex-col p-4 md:p-0">
          <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
            <input
              value={question}
              onChange={handleInputChange}
              className="text-black h-full w-full p-2 outline-none bg-inherit"
              type="text"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="h-full p-2 rounded-lg icon-style"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
          <p className="text-xs text-white p-2 text-center"></p>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Chat;
