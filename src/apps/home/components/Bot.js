import React, { useState, useEffect } from "react";
import BubbleChat from "../../chat/components/BubbleChat";
import "../style.css";
import { getAllQueries, verifyURL } from "../apis";
import setAuthHeader from "../../../_helpers/setAuthHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../auth/actions";

const Bot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [queries, setQueries] = useState([]);
  const [activeChat, setActiveChat] = useState({ queries: [] });
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.setting.isDark);
  const [questionList, setQuestionList] = useState([]);
  const { tokens } = useParams();

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
    const [u_token, c_token, b_token, r_token] = tokens?.split("&");
    const user_info = verifyURL({ u_token, c_token, b_token, r_token });
    dispatch(setUser(user_info));
    setAuthHeader(user_info.token);
    getQueries();
  }, [tokens]);

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }
  const originColor = theme === true ? "block" : "#171717";

  return (
    <>
      {
        <div className="md:w-full h-screen flex">
          <div
            style={{
              backgroundColor: !originColor,
            }}
            className={"w-full md:w-[100%] h-screen md:h-screen"}
          >
            <BubbleChat
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setQueries={setQueries}
              questionList={questionList}
              setQuestionList={setQuestionList}
            />
          </div>
        </div>
      }
    </>
  );
};

export default Bot;
