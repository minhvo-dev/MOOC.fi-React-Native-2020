import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "react-router-native";

import Subheading from "./Subheading";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: "#ffffff"
  },
  container: {
    padding: theme.spacing.normal
  }
});

const AppBarTab = ({ text, to }) => {
  return (
    <View style={styles.container}>
      <Link to={to} component={TouchableOpacity} activeOpacity={0.1}>
        <Subheading style={styles.text}>{text}</Subheading>
      </Link>
    </View>
  );
};

export default AppBarTab;