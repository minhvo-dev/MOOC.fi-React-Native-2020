import React from "react";
import { StyleSheet, View } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.small
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
