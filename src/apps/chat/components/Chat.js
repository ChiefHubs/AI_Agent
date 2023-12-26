import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { generateChat } from "../apis";
import "../style.css";

function Chat({ onSendMessage, setIsMenuOpen, isMenuOpen }) {
  const ref = useRef();
  const [prompt, setPrompt] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    let payload = {
      question: question,
    };
    if (prompt.length === 0) {
      console.log("new chat......");
      payload.isNew = true;
      payload.title = "my title";
    }
    setIsLoading(true);
    await generateChat(payload)
      .then((res) => {
        console.log("chat from server ", res.data.chats);
        // setPrompt([
        //   ...prompt,
        //   {text:text,isUser:true},
        //   {text:res,isUser:false}
        // ])
        setPrompt(res.data.chats);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        setIsLoading(false);
      });
    // if (prompt.trim() !== "") {
    //   onSendMessage(prompt);
    //   setPrompt("");
    // }
    // try {
    //   const text = prompt;
    //   setPrompt("");
    // const res=await generateMessage(prompt)
    // setMessages([
    //   ...messages,
    //   {text:text,isUser:true},
    //   {text:res,isUser:false}
    // ])
    //   setIsLoading(false);
    // } catch (err) {
    //   setIsLoading(true);
    //   console.log(err);
    // }
  };

  useEffect(() => {
    // setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth" }), 1000);
  }, [question]);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    prompt.map((i) => console.log("chat", i.queries));
  };

  prompt.map((i) => console.log("chat", i.queries));

  return (
    <>
      <div>
        {/* <div className="flex flex-row justify-between">
          <h1 className="font-bold text-xl text-black p-4">Agent Query</h1>
          <div className="md:hidden p-4 cursor-pointer">
            <FontAwesomeIcon
              icon={isMenuOpen ? faXmark : faBars}
              size={25}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div> */}

        {/* messages */}
        {/* {messages.length === 0 ? (
          <Starter />
        ) : ( */}

        {/* message */}

        <div className=" bg-[#dad6d6] rounded overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col">
          {prompt.map((m, index) => (
            <div key={index} className="flex items-start space-x-4 my-6 p-2">
              {/* <img
                className="h-8 w-8 rounded-full"
                src={m.isUser ? "/images/asset 0.png" : "/images/logo.png"}
                alt="user"
              /> */}
              <div className="flex flex-col items-start">
                <p className="text-gray font-bold">
                  {m.queries[0].question && "You"}
                </p>
                <p className="text-black">{m.queries[0].question}</p>
                {/* </div>
              <div className="flex flex-col items-start"> */}
                <p className="text-gray font-bold">
                  {m.queries[0].solution && "Answer"}
                </p>
                <p className="text-black">{m.queries[0].solution}</p>
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
      </div>
    </>
  );
}

export default Chat;
