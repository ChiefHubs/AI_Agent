import * as Yup from "yup";

export const signupSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is equired"),
  mobileno: Yup.string()
    .matches(/^[0-9]+$/, "Invalid contact number") // Only allow numeric characters
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number can be at most 15 digits")
    .required("Contact is required"),
  password: Yup.string().required("Password is required"),
  // .min(6, "Password must be at least 6 characters")

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("password is required"),
  // .min(6, "Password must be at least 6 characters")
  // .required("password is required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
