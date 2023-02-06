import * as yup from "yup";

export const contactFormValidation = yup.object().shape({
  name: yup
    .string("Name must be String")
    .min(2, "Name must be min 2 characters")
    .max(25, "Name must be max 2 characters")
    .required("Required"),
  mail: yup.string().email("Invalid Email").required("Required"),
  subject: yup.string().min(1).max(100).required("Required"),
  message: yup.string().max(1000).required("Required"),
});

export const reviewValidation = yup.object().shape({
  comment: yup
    .string()
    .min(1, "Comment should be min 1 character")
    .max(1000, "Comment should be max 1000 characters")
    .required("Required"),
  rating: yup.number().min(0).max(5).required("Required"),
});

export const forgotLinkValidation = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
});

const pattern =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const patternWarning =
  "Password must contain at least 8 characters,one lowercase, one uppercase, one number and one special character";

export const resetpassValidation = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
  pass: yup.string().matches(pattern, patternWarning).required("Required"),
  pass2: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("pass"), null], "Passwords must match"),
});
