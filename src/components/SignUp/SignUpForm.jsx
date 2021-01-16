import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import theme from "../../theme";
import FormikTextInput from "../FormikTextInput";
import Subheading from "../Subheading";

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

const SignUpForm = ({ onSubmit }) => {
  const containerStyle = [styles.container];
  const buttonStyle = [styles.button];
  const buttonLabelStyle = [styles.buttonLabel];

  return (
    <View style={containerStyle}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput name="pwConfirm" placeholder="Password confirmation" secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <View style={buttonStyle} accessibilityRole="button" >
          <Subheading style={buttonLabelStyle}>Sign up</Subheading>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignUpForm;