import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must contain @"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must contain @"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const editProfileValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
});

export const createPostValidation = yup.object().shape({
  description: yup.string().required("Title is required"),
});
