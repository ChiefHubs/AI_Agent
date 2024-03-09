import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addStyle } from "../../apis";
import { useFormik } from "formik";
import "../../style.css";

const CustomModal = () => {
  const user = useSelector((store) => store.auth.user);
  const [isLoading, changeIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      sidebar_back: "",
      sidebar_setting_back: "",
      sidebar_hover: "",
      chat_back: "",
      font_size: "",
      font_color: "",
      text_title: "",
      first_question: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const theme = useSelector((store) => store.setting.isDark);
  const onSubmit = async (values) => {
    changeIsLoading(true);
    let data = {
      ...values,
      userId: user._id,
      theme_state: theme === true ? "true" : "false",
    };
    await addStyle(data)
      .then((res) => {
        // alert("good");
        window.location.reload();
        changeIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        changeIsLoading(false);
      });
  };

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }
  return (
    <>
      <div className="login-area">
        <h1 align="center" className="title">
          Setting Style
        </h1>
        <div className="form-area">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <span>
                <label>sidebar_back</label>
              </span>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sidebar_back}
                name="sidebar_back"
                type="color"
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>sidebar_setting_back</label>
              </span>
              <input
                name="sidebar_setting_back"
                type="color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sidebar_setting_back}
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>sidebar_hover</label>
              </span>
              <input
                name="sidebar_hover"
                type="color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sidebar_hover}
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>chat_back</label>
              </span>
              <input
                name="chat_back"
                type="color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.chat_back}
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>font_color</label>
              </span>
              <input
                type="color"
                name="font_color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.font_color}
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>font_size</label>
              </span>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.font_size}
                className="input-box"
                name="font_size"
                placeholder="Enter fontSize"
                type="text"
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>text_title</label>
              </span>
              <input
                className="input-box"
                placeholder="Enter text_title"
                type="text"
                name="text_title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.text_title}
              ></input>
            </div>
            <div className="form-control">
              <span>
                <label>first_question</label>
              </span>
              <input
                className="input-box"
                placeholder="Enter first_question"
                type="text"
                name="first_question"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_question}
              ></input>
            </div>
            <div style={{ display: "flex" }}>
              <button type="submit" align="center" className="btn submit-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
