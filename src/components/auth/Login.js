import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
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

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }

  return (
    <>
      <section className="form-section">
        <div className="container">
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
        </div>
      </section>
    </>
  );
};

export default Login;
