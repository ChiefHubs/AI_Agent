import React, { useState } from "react";
import { useFormik } from "formik";

// import { forgotPasswordSchema } from "../validations";
import "./style.css";

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirmnewpassword: "",
    },
    // validationSchema: forgotPasswordSchema,
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
              Change Password
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-area">
                <div className="form-control">
                  <span className="input-error">
                    <label>New Password </label>
                    {/* {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null} */}
                  </span>

                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newpassword}
                    className="input-box"
                    placeholder="Create New Password"
                  />
                </div>

                <div className="form-control">
                  <span className="input-error">
                    <label>Confirm Password </label>
                    {/* {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null} */}
                  </span>

                  <input
                    type="password"
                    id="confirmnewpassword"
                    name="confirmnewpassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newpassword}
                    className="input-box"
                    placeholder="Enter Confirm New Password"
                  />
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
                    // onClick={() => navigate("/login")}
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

export default ChangePassword;
