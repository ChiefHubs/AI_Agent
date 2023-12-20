import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is equired"),
  contact: Yup.string()
    .matches(/^[0-9]+$/, "Invalid contact number") // Only allow numeric characters
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number can be at most 15 digits")
    .required("Contact is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <section className="form-section">
      <div className="container">
        <div className="login-area">
          <h1 align="center" className="title">
            Signup
          </h1>
          <div className="form-area">
            <form onSubmit={formik.handleSubmit}>
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
                  <label htmlFor="contact">Contact</label>
                  {formik.touched.contact && formik.errors.contact ? (
                    <div className="error">{formik.errors.contact}</div>
                  ) : null}
                </span>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact}
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
