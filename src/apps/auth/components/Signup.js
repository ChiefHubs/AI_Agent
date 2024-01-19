import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import swal from 'sweetalert'

import { signupSchema } from "../validations";
import { register, setActiveModel } from "../actions";

import "../style.css";

const Signup = () => {
  const dispatch = useDispatch();

  const [isLoading, changeIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile_no: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { messages, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (values) => {
    changeIsLoading(true);
    try {
      const response = dispatch(register(values));
   dispatch(setActiveModel('gpt'))
      changeIsLoading(false);
    } catch (e) {
      console.log("error ", e.message);
      changeIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.log("errors ", error);
      // dispatch({ type: "clearError" });
      changeIsLoading(false);
    }
    if (isAuthenticated) {
      // alert(message);
      changeIsLoading(false);
  
    }
  }, [error, isAuthenticated, messages]);

  if (isLoading) {
    return <div className="coverSpinner"></div>;
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
              <div className="signupForm">
                <div className="form-control">
                  <span>
                    <label htmlFor="firstName">First Name</label>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="error">{formik.errors.firstName}</div>
                    ) : null}
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="input-box"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-control">
                  <span>
                    <label htmlFor="lastName">Last Name</label>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="error">{formik.errors.lastName}</div>
                    ) : null}
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
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
                  <label htmlFor="mobile_no">Contact</label>
                  {formik.touched.mobile_no && formik.errors.mobile_no ? (
                    <div className="error">{formik.errors.mobile_no}</div>
                  ) : null}
                </span>
                <input
                  type="text"
                  id="mobile_no"
                  name="mobile_no"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile_no}
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
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
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
