import * as yup from "yup";

const pattern =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const patternWarning =
  "Password must contain at least 8 characters,one lowercase, one uppercase, one number and one special character";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name should be min 2 characters")
    .max(25, "Name should be max 25 characters")
    .required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().matches(pattern, patternWarning).required("Required"),
  password2: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().matches(pattern, patternWarning).required("Required"),
});

export const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be min 2 characters")
    .required("Required"),
  mail: yup.string().email("Invalid Email").required("Required"),
});
