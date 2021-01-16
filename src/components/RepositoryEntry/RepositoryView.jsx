import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import theme from "../../theme";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import Subheading from "../Subheading";


const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.small,
    backgroundColor: "white"
  },
  button: {
    margin: theme.spacing.normal,
    padding: theme.spacing.normal,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.normal
  },
  buttonLabel: {
    color: "white",
    textAlign: "center"
  }
});

const RepositoryView = ({ repository }) => {
  const containerStyle = [styles.container];
  const buttonStyle = [styles.button];
  const buttonLabelStyle = [styles.buttonLabel];

  const onPress = () => {
    WebBrowser.openBrowserAsync(repository.url);
  };

  return (
    <View style={containerStyle}>
      <RepositoryItem item={repository} />
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={buttonStyle}>
          <Subheading style={buttonLabelStyle}>
            Open in GitHub
          </Subheading>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RepositoryView;