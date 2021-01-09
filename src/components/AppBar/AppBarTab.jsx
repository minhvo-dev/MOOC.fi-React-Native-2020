import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import Subheading from "../Subheading";
import theme from "../../theme";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "white"
  },
  container: {
    padding: theme.spacing.normal
  }
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <View style={styles.container}>
        <Subheading style={styles.text}>{children}</Subheading>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;