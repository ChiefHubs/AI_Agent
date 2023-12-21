import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";

import { signupSchema } from "../validations";

import "../style.css";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobileno: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const [isLoading, changeIsLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log("register onsubmit", values);
    changeIsLoading(true);
    try {
      console.log("try");
      // register(values);
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
    <section className="form-section">
      <div className="container">
        <div className="login-area">
          <h1 align="center" className="title">
            Signup
          </h1>
          <div className="form-area">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="form-control">
                  <span>
                    <label htmlFor="firstname">First Name</label>
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="error">{formik.errors.firstname}</div>
                    ) : null}
                  </span>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                    className="input-box"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="firstname">Last Name</label>
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div className="error">{formik.errors.lastname}</div>
                    ) : null}
                  </span>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                    className="input-box"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="form-control">
                <span>
                  <label htmlFor="email">Email</label>
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
                  placeholder="Enter Email"
                />
              </div>

              <div className="form-control">
                <span>
                  <label htmlFor="mobileno">Contact</label>
                  {formik.touched.mobileno && formik.errors.mobileno ? (
                    <div className="error">{formik.errors.mobileno}</div>
                  ) : null}
                </span>
                <input
                  type="text"
                  id="mobileno"
                  name="mobileno"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileno}
                  className="input-box"
                  placeholder="Enter Contact"
                />
              </div>

              <div className="form-control">
                <span>
                  <label htmlFor="password">Password</label>
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
                  placeholder="Create Password"
                />
              </div>

              <div className="form-control">
                <span>
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  {formik.touched.confirmpassword &&
                  formik.errors.confirmpassword ? (
                    <div className="error">{formik.errors.confirmpassword}</div>
                  ) : null}
                </span>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                  className="input-box"
                  placeholder="Confirm Password"
                />
              </div>

              <button type="submit" align="center" className="btn submit-btn">
                Submit
              </button>
            </form>
            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
                fontSize: "15px",
              }}
            >
              Already have an account? &nbsp;
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
