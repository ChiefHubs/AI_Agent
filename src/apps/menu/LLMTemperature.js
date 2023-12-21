import React, { useState } from "react";
import { useFormik } from "formik";

const LLMTemperature = () => {
  const formik = useFormik({
    initialValues: {
      temparature: "",
    },
    // validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });
  return (
    <>
      <section className="form-section">
        <div className="container">
          <div className="login-area">
            <h1 align="center" className="title">
              LLM Temperature
            </h1>

            <form>
              <div className="form-area">
                <div className="form-control">
                  <span className="input-error">
                    {/* <label>UI Key </label> */}
                    {/* {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null} */}
                  </span>

                  <input
                    type="password"
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
        </div>
      </section>
    </>
  );
};

export default LLMTemperature;
