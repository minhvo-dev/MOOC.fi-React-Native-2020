import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-native";

import SignUpForm from "./SignUpForm";
import useUser from "../../hooks/useUser";
import useSignIn from "../../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  pwConfirm: ""
};

// validation schema
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required("Username is required"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("Password is required"),
  pwConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required")
});

const SignUpContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignUp = () => {
  const history = useHistory();
  const [createUser] = useUser();
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    const result = await createUser({ username, password });
    if (result.createUser && result.createUser.id) {
      await signIn({ username, password });
      history.push("/");
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;