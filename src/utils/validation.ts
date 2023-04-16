import * as yup from "yup";

interface loginValidationValues {
  email: string;
  password: string;
}

interface registerValidationValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface editProfileValidationValues {
  name: string;
  surname: string;
}

interface createPostValidationValues {
  description: string;
}

interface createCommentValidationValues {
  body: any;
}

export const loginValidation: yup.ObjectSchema<loginValidationValues> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must contain @"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

export const registerValidation: yup.ObjectSchema<registerValidationValues> =
  yup.object().shape({
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

export const editProfileValidation: yup.ObjectSchema<editProfileValidationValues> =
  yup.object().shape({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
  });

export const createPostValidation: yup.ObjectSchema<createPostValidationValues> =
  yup.object().shape({
    description: yup.string().required("Title is required"),
  });

export const createCommentValidation: yup.ObjectSchema<createCommentValidationValues> =
  yup.object().shape({
    body: yup.string(),
  });
