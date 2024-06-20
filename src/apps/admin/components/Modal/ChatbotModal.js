import React, { useState, useEffect } from "react";
import {
  chatbotRegSchema,
  chatbotUpdateSchema,
} from "../../../admin/validations";
import { createChatbotApp, updateChatbotApp } from "../../apis";
import { setTheme } from "../../../auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import "../../style.css";
import { Avatar } from "@material-tailwind/react";

const ChatbotModal = ({ data, onClose, getApps, showToast, apps, orgs }) => {
  const dispatch = useDispatch();

  const [isLoading, changeIsLoading] = useState(false);
  const [appList, setAppList] = useState([]);
  const [image, _setImage] = useState(null);
  const [avatar, setImageData] = useState(null);

  const formik = useFormik({
    initialValues: {
      org: "",
      app: "",
      email: "",
      description: "",
    },
    validationSchema: chatbotRegSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const formik_edit = useFormik({
    initialValues: {
      org: "",
      app: "",
      email: "",
      description: "",
    },
    validationSchema: chatbotUpdateSchema,
    onSubmit: (values) => {
      onSubmitEdit(values);
    },
  });

  const onSubmit = async (values) => {
    changeIsLoading(true);
    try {
      const response = await createChatbotApp(values);
      changeIsLoading(false);
      onClose();
      // getApps();
    } catch (e) {
      showToast(
        e.response?.data?.error || "Server error in registering apps",
        2
      );
      console.log("error ", e);
      changeIsLoading(false);
    }
  };

  const onSubmitEdit = async (values) => {
    changeIsLoading(true);
    try {
      const response = await updateChatbotApp(values);
      changeIsLoading(false);
      onClose();
      // getApps();
    } catch (e) {
      showToast(
        e.response?.data?.error || "Server error in registering apps",
        2
      );
      console.log("error ", e);
      changeIsLoading(false);
    }
  };

  const theme = useSelector((store) => store.setting.isDark);
  const session_theme = sessionStorage.getItem("dark");

  useEffect(() => {
    if (data?.length > 0) {
      formik.setValues(data[0]);
      formik_edit.setValues(data[0]);
    } else {
      formik.setValues({
        org: "",
        app: "",
        email: "",
        description: "",
      });
      formik_edit.setValues({
        org: "",
        app: "",
        email: "",
        description: "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (session_theme === "false" || session_theme === false) {
      dispatch(setTheme(false));
    } else {
      dispatch(setTheme(true));
    }
  }, []);

  useEffect(() => {
    const selectedOrg = formik.values.org;
    const filterApps = apps.filter((app) => {
      return app.org_id._id == selectedOrg;
    });
    setAppList(filterApps);
  }, [formik.values.org]);

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const newImage = e.target?.files?.[0];
    console.log("----file 11----------", e.target?.files?.[0]);
    if (newImage) {
      setImageData(newImage);
      setImage(URL.createObjectURL(newImage));
    }
  };

  const cleanup = () => {
    URL.revokeObjectURL(image);
    // inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  return (
    <>
      {data === null ? (
        <section
          className={`form-sections ${
            theme === true ? "" : "bg-white"
          } relative `}
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="login-area fixed top-[15%]">
            <h1 align="center" className="title">
              Add Chatbot
            </h1>
            <div className="form-area">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control justify-center items-center flex">
                  <label htmlFor="input_file">
                    <Avatar
                      src={image || "/images/default_user.jpg"}
                      className="cursor-pointer"
                      variant="rounded"
                    ></Avatar>
                  </label>
                  <div>
                    <input
                      type="file"
                      id="input_file"
                      accept=".jpg,.png"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="org">Organization</label>
                    {formik.touched.org && formik.errors.org ? (
                      <div className="error">{formik.errors.org}</div>
                    ) : null}
                  </span>
                  <select
                    type="text"
                    autoComplete="off"
                    id="org"
                    name="org"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.org}
                    className="input-box"
                  >
                    <option value={""}>Select Organization</option>
                    {orgs.map((org, i) => {
                      return (
                        <option key={i} value={org._id}>
                          {org.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="app">App Name</label>
                    {formik.touched.app && formik.errors.app ? (
                      <div className="error">{formik.errors.app}</div>
                    ) : null}
                  </span>
                  <select
                    type="text"
                    autoComplete="off"
                    id="app"
                    name="app"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.app}
                    className="input-box"
                  >
                    <option value={""}>Select App</option>
                    {appList.map((app, i) => {
                      return (
                        <option key={i} value={app._id}>
                          {app.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="email">Email</label>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </span>
                  <input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="input-box"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="description">Description</label>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="error">{formik.errors.description}</div>
                    ) : null}
                  </span>
                  <textarea
                    autoComplete="off"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="input-box"
                    rows={10}
                    placeholder="Enter Description"
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <button
                    type="submit"
                    align="center"
                    className="btn submit-btn"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    align="center"
                    className="btn submit-btn"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`form-sections ${
            theme === true ? "" : "bg-white"
          } relative`}
        >
          <div className="login-area fixed top-[15%]">
            <h1 align="center" className="title">
              Edit App
            </h1>
            <div className="form-area">
              <form onSubmit={formik_edit.handleSubmit}>
                <div className="signupForm">
                  <div className="form-control">
                    <span>
                      <label htmlFor="name">First Name</label>
                      {formik_edit.touched.name && formik_edit.errors.name ? (
                        <div className="error">{formik_edit.errors.name}</div>
                      ) : null}
                    </span>
                    <input
                      type="text"
                      autoComplete="off"
                      id="name"
                      name="name"
                      onChange={formik_edit.handleChange}
                      onBlur={formik_edit.handleBlur}
                      value={formik_edit.values.name}
                      className="input-box"
                      placeholder="Enter First Name"
                      disabled
                    />
                  </div>
                  <div className="form-control">
                    <span>
                      <label htmlFor="description">Description</label>
                      {formik_edit.touched.description &&
                      formik_edit.errors.description ? (
                        <div className="error">
                          {formik_edit.errors.description}
                        </div>
                      ) : null}
                    </span>
                    <textarea
                      type="text"
                      autoComplete="off"
                      id="description"
                      name="description"
                      onChange={formik_edit.handleChange}
                      onBlur={formik_edit.handleBlur}
                      value={formik_edit.values.description}
                      className="input-box"
                      placeholder="Enter Description"
                      rows={10}
                    />
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <button
                    type="submit"
                    align="center"
                    className="btn submit-btn"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    align="center"
                    className="btn submit-btn"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ChatbotModal;
