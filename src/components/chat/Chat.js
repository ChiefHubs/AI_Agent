import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

function Chat({ onSendMessage }) {
  const ref = useRef();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "What is Web 3.0?",
      isUser: true,
    },
    {
      text: "As of my last knowledge update in January 2022, Web 3.0 refers to a conceptual evolution of the World Wide Web, building on the previous iterations, Web 1.0 and Web 2.0. However, please note that technological developments can progress rapidly, and there may have been further advancements or changes since then.Web 1.0: The early web, characterized by static web pages and limited interactivity. Users mainly consumed information without actively contributing or collaborating. Web 2.0: The second generation introduced interactive and dynamic content, social media platforms, user-generated content, and increased collaboration. It marked a shift toward a more participatory and social web. Web 3.0: Web 3.0 is often described as the next phase of the internet, emphasizing a more intelligent, decentralized, and interconnected web. Some key features and concepts associated with Web 3.0 include:",
      isUser: false,
    },
    {
      text: "What is Web 2.0?",
      isUser: true,
    },
    {
      text: "As of my last knowledge update in January 2022, Web 3.0 refers to a conceptual evolution of the World Wide Web, building on the previous iterations, Web 1.0 and Web 2.0. However, please note that technological developments can progress rapidly, and there may have been further advancements or changes since then.Web 1.0: The early web, characterized by static web pages and limited interactivity. Users mainly consumed information without actively contributing or collaborating. Web 2.0: The second generation introduced interactive and dynamic content, social media platforms, user-generated content, and increased collaboration. It marked a shift toward a more participatory and social web. Web 3.0: Web 3.0 is often described as the next phase of the internet, emphasizing a more intelligent, decentralized, and interconnected web. Some key features and concepts associated with Web 3.0 include:",
      isUser: false,
    },
    {
      text: "how to make website?",
      isUser: true,
    },
    {
      text: "Creating a website involves several steps, from planning and design to development and deployment. Here's a basic guide to help you get started:",
      isUser: false,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    if (prompt.trim() !== "") {
      onSendMessage(prompt);
      setPrompt("");
    }
    try {
      const text = prompt;
      setPrompt("");
      // const res=await generateMessage(prompt)
      // setMessages([
      //   ...messages,
      //   {text:text,isUser:true},
      //   {text:res,isUser:false}
      // ])
      setLoading(false);
    } catch (err) {
      setLoading(true);
      console.log(err);
    }
  };

  useEffect(() => {
    // setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth" }), 1000);
  }, [messages]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-xl text-black p-4">Agent Query</h1>
        {/* <Starter/> */}
        {/* messages */}
        {/* {messages.length === 0 ? (
          <Starter />
        ) : (
          <div className="overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col"> */}
        {/* message */}
        <div className=" bg-[#dad6d6] rounded overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col">
          {messages.map((m, index) => (
            <div key={index} className="flex items-start space-x-4 my-6 p-2">
              {/* <img
                className="h-8 w-8 rounded-full"
                src={m.isUser ? "/images/asset 0.png" : "/images/logo.png"}
                alt="user"
              /> */}
              <div className="flex flex-col items-start">
                <p className="text-gray font-bold">
                  {m.isUser ? "You" : "Answer"}
                </p>
                <p className="text-black">{m.text}</p>
              </div>
            </div>
          ))}
          <div ref={ref} />
        </div>
      </div>
      {loading && (
        <p className="text-black text-sm animate-pulse text-center">
          Loading...
        </p>
      )}
      <div className="w-full flex justify-center items-center flex-col p-4 md:p-0">
        <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
          <input
            value={prompt}
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
      </div>
    </>
  );
}

export default Chat;
