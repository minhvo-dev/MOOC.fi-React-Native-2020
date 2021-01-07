import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  inputField: {
    marginBottom: theme.spacing.normal,
    padding: theme.spacing.normal,
    borderRadius: theme.borderRadius.normal,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.colors.secondary
  },
  errorField: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.inputField,
    style,
    error && styles.errorField
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;