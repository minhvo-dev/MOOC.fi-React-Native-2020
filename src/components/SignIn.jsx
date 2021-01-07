import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Subheading from "./Subheading";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.normal,
    backgroundColor: "white"
  },
  button: {
    padding: theme.spacing.normal,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.normal
  },
  buttonLabel: {
    color: "white",
    textAlign: "center"
  }
});

const initialValues = {
  username: "",
  password: ""
};

const SignInForm = ({ onSubmit }) => {
  const containerStyle = [styles.container];
  const buttonStyle = [styles.button];
  const buttonLabelStyle = [styles.buttonLabel];

  return (
    <View style={containerStyle}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={buttonStyle} accessibilityRole="button" >
          <Subheading style={buttonLabelStyle}>Sign in</Subheading>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// validation scheme
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

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

export default SignIn;