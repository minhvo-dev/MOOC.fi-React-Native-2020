import React from "react";
import { StyleSheet, View } from "react-native";

import StatsItem from "./StatsItem";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

const StatsList = ({ repo }) => {
  const stats = [
    {
      label: "Stars",
      stats: repo.stargazersCount
    },
    {
      label: "Forks",
      stats: repo.forksCount
    },
    {
      label: "Reviews",
      stats: repo.reviewCount
    },
    {
      label: "Rating",
      stats: repo.ratingAverage
    }
  ];

  return (
    <View style={styles.container}>
      {stats.map(item => <StatsItem key={item.label} {...item} />)}
    </View>
  );

};

export default StatsList;