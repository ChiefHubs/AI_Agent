import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { forgotPasswordSchema } from "../validations";
import "../style.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  //   const [wrongCredError, changeWrongCredError] = useState("");
  const [isLoading, changeIsLoading] = useState(false);

  const onSubmit = async (data) => {
    changeIsLoading(true);
    try {
      console.log("try");
      changeIsLoading(false);
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
      <section className="form-section">
        <div className="container">
          <div className="login-area">
            <h1 align="center" className="title">
              Forgot Password
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-area">
                <div className="form-control">
                  <span className="input-error">
                    <label>Email </label>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </span>

                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="input-box"
                    placeholder="Enter your email"
                  />
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "4px",
                    fontSize: "11px",
                  }}
                >
                  We’ll send a verification code to this email if it matches
                  your existing account.
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="btn cancel-btn"
                    onClick={() => navigate("/login")}
                    style={{
                      marginRight: "4px",
                    }}
                  >
                    Cancel
                  </button>
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

export default ForgotPassword;
