import React from "react";
import { StyleSheet, View } from "react-native";

import StatsList from "./StatsList";
import RepositoryCard from "./RepositoryCard";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "white",
    padding: theme.spacing.normal
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <RepositoryCard repo={item} />
      <StatsList repo={item} />
    </View>
  );
};

export default RepositoryItem;