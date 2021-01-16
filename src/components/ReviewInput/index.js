import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-native";

import ReviewForm from "./ReviewForm";
import useReview from "../../hooks/useReview";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  review: ""
};

// validation schema
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup
    .string()
    .required("Repository name is required"),
  rating: yup
    .number()
    .integer()
    .min(0)
    .max(100)
    .required("Rating is required")
});

const ReviewInputContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

const ReviewInput = () => {
  const history = useHistory();
  const [createReview] = useReview();

  const onSubmit = async ({ ownerName, repositoryName, rating, review }) => {
    const result = await createReview({ ownerName, repositoryName, rating, review });
    if (result.createReview && result.createReview.repositoryId) {
      history.push(`/repository/${result.createReview.repositoryId}`);
    }
  };

  return (
    <ReviewInputContainer onSubmit={onSubmit} />
  );
};

export default ReviewInput;