import * as yup from "yup";

export const addBookSchema = yup.object().shape({
  author: yup
    .string()
    .min(1, "Author name must be min 1 character")
    .max(25, "Author name must be max 25 character")
    .required("Required"),
  title: yup
    .string()
    .min(1, "Title must be min 1 character")
    .max(100, "Title must be max 25 character")
    .required("Required"),
  genre: yup
    .array()
    .of(yup.string())
    .min(1, "Atleast on genre must be selected")
    .required("Required"),
  total: yup.number().min(1, "Total Books must be min 1").required("Required"),
  rating: yup
    .number()
    .min(0, "Rating must be min 0")
    .max(5, "Rating must be max 5")
    .required("Required"),
  numOfRatings: yup
    .number()
    .min(0, "Number of Ratings must be min 0")
    .required("Required"),
});

export const newsLetterSchema = yup.object().shape({
  audience: yup.string().required("Required"),
  subject: yup.string().max(200).required("Required"),
  body: yup.string().max(2000).required("Required"),
});
