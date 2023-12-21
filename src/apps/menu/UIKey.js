import React, { useState } from "react";
import { useFormik } from "formik";

const UIKey = () => {
  const formik = useFormik({
    initialValues: {
      uikey: "",
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
              UI Key
            </h1>

            <form>
              <div className="form-area">
                <div className="form-control">
                  <span className="input-error">
                    <label>UI Key </label>
                    {/* {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null} */}
                  </span>

                  <input
                    type="password"
                    id="uikey"
                    name="uikey"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.uikey}
                    className="input-box"
                    placeholder="Enter your UI Key"
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
        </div>
      </section>
    </>
  );
};

export default UIKey;
