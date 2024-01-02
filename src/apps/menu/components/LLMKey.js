import React, { useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { LLMKeySchema } from "../validations";

const UIKey = ({ setCurrentPage }) => {
  const formik = useFormik({
    initialValues: {
      key: "",
    },
    validationSchema: LLMKeySchema,
    onSubmit: (values) => {
    
      onSubmit(values);
    },
  });
  const [isLoading, changeIsLoading] = useState(false);

  const onSubmit = async (data) => {
    changeIsLoading(true);
    try {
      console.log("try");
      changeIsLoading(false);
      setCurrentPage("");
    } catch (e) {
      console.log(e.message);
      changeIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="coverSpin"></div>;
  }

  return (
    <>
      <section className="menu-section">
        {/* <div className="container"> */}
        <div className="menu-area">
          <div className="flex flex-col align-center">
            <div className="flex cursor-pointer">
              <FontAwesomeIcon
                icon={faXmark}
                size={25}
                onClick={() => setCurrentPage("")}
              />
            </div>
            <h1 align="center" className="title">
              LLM Key
            </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-content-area">
              <div className="form-control">
                <span className="input-error">
                  <label>LLM Key </label>
                  {formik.touched.key && formik.errors.key ? (
                    <div className="error">{formik.errors.key}</div>
                  ) : null}
                </span>

                <input
                  type="password"
                  id="key"
                  name="key"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.key}
                  className="input-box"
                  placeholder="Enter LLM Key"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {/* <button
                    className="btn cancel-btn"
                    // onClick={() => navigate("/login")}
                    style={{
                      marginRight: "4px",
                    }}
                  >
                    Cancel
                  </button> */}
                <button type="submit" className="btn forgot-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "15px",
            }}
          ></div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default UIKey;
