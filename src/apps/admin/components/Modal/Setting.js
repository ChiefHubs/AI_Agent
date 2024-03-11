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
                <label>Sidebar Background</label>
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
                <label>Sidebar Sub Background</label>
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
                <label>Sidebar Mouse Hover Color</label>
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
                <label>Chat Background</label>
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
                <label>Font Color</label>
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
                <label>Font Size</label>
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
                <label>Chat Title</label>
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
                <label>First Greeting Sentence</label>
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
