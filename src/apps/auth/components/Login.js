import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { loginSchema } from "../validations";
import { login } from "../actions";
import "../style.css";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, changeIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { messages, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  console.log("errors ", error);
  console.log("messages ", messages);

  const onSubmit = async (values) => {
    console.log("login onsubmit", values);
    changeIsLoading(true);

    try {
      console.log("try");
      dispatch(login(values));
      changeIsLoading(false);
    } catch (e) {
      console.log("error ", e.message);
      changeIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.log("errors ", error);
      changeIsLoading(false);
    }
    if (isAuthenticated) {
      // alert(message);
      console.log("message", messages);
      console.log("user ", isAuthenticated);
      changeIsLoading(false);
    }
  }, [error, isAuthenticated, messages]);

  if (isLoading) {
    return <div className="coverSpinner"></div>;
  }

  return (
    <>
      <section className="form-section">
        {/* <div className="container"> */}
        <div className="login-area">
          <h1 align="center" className="title">
            Login
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

              <div className="form-control">
                <span className="input-error">
                  <label>Password </label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="input-box"
                  placeholder="Enter your password"
                />
              </div>

              <div
                style={{
                  textAlign: "right",
                  marginTop: "4px",
                  fontSize: "15px",
                }}
              >
                <Link
                  to={`/forgot-password`}
                  style={{ textDecoration: "none" }}
                >
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" align="center" className="btn submit-btn">
                Login
              </button>
            </div>
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: "12px",
              fontSize: "15px",
            }}
          >
            Don't have an account? &nbsp;
            <Link to={`/signup`} style={{ textDecoration: "none" }}>
              Signup
            </Link>
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default Login;
