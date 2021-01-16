import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router-native";

import theme from "../../theme";
import StatsList from "./StatsList";
import RepositoryCard from "./RepositoryCard";

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
  const history = useHistory();

  const onPress = () => {
    history.push(`/repository/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <RepositoryCard repo={item} />
        <StatsList repo={item} />
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;