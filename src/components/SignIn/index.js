import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-native";

import SignInForm from "./SignInForm";
import useSignIn from "../../hooks/useSignIn";

const initialValues = {
  username: "",
  password: ""
};

// validation schema
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async ({ username, password }) => {
    await signIn({ username, password });
    history.push("/");
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;