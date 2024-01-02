import React, { useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { LLMTempSchema } from "../validations";

const LLMTemperature = ({ setCurrentPage }) => {
  const formik = useFormik({
    initialValues: {
      temparature: "",
    },
    validationSchema: LLMTempSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const [isLoading, changeIsLoading] = useState(false);

  const onSubmit = async (data) => {
    changeIsLoading(true);
    try {
  
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
              LLM Temperature
            </h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-content-area">
              <div className="form-control">
                <span className="input-error">
                  <label> LLM Temperature </label>
                  {formik.touched.temparature && formik.errors.temparature ? (
                    <div className="error">{formik.errors.temparature}</div>
                  ) : null}
                </span>

                <input
                  type="text"
                  id="temparature"
                  name="temparature"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.temparature}
                  className="input-box"
                  placeholder="Enter temparature"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
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

export default LLMTemperature;
