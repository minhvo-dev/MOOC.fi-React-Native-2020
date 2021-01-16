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

const ReviewForm = ({ onSubmit }) => {
  const containerStyle = [styles.container];
  const buttonStyle = [styles.button];
  const buttonLabelStyle = [styles.buttonLabel];

  return (
    <View style={containerStyle}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline={true} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={buttonStyle} accessibilityRole="button">
          <Subheading style={buttonLabelStyle}>Create a review</Subheading>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ReviewForm;