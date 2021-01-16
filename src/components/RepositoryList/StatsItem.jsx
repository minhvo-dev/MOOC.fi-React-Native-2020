import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../Text";
import Subheading from "../Subheading";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

const StatsItem = ({ label, stats }) => {
  const statsStr = stats >= 1000 ? `${(stats / 1000).toFixed(1)}k` : `${stats}`;
  return (
    <View style={styles.container}>
      <Subheading testID="statsSubHeading">{statsStr}</Subheading>
      <Text testID="statsText">{label}</Text>
    </View>
  );
};

export default StatsItem;