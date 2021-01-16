import React from "react";
import { Image, StyleSheet, View } from "react-native";

import theme from "../../theme";
import Subheading from "../Subheading";
import Text from "../Text";

const styles = StyleSheet.create({
  outsideContainder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  insideContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  primaryBackgroundColor: {
    backgroundColor: theme.colors.primary,
  },
  whiteColor: {
    color: "#ffffff"
  },
  logo: {
    width: 64,
    height: 64,
  },
  lowPriorityItem: {
    flexGrow: 0
  },
  normalPriorityItem: {
    flexGrow: 1
  },
  roundBorder: {
    borderRadius: theme.borderRadius.normal
  },
  leftNormalMargin: {
    marginLeft: theme.spacing.normal
  },
  bottomSmallMargin: {
    marginBottom: theme.spacing.small
  },
  smallSpacing: {
    padding: theme.spacing.small
  },
  wrapText: {
    flexShrink: 1,
    flexWrap: "wrap"
  }
});

const RepositoryCard = ({ repo }) => {
  const outsideContainderStyle = [
    styles.outsideContainder,
  ];
  const insideContainerStyle = [
    styles.insideContainer,
    styles.leftNormalMargin,
    styles.wrapText
  ];
  const avataStyle = [
    styles.logo,
    styles.lowPriorityItem,
    styles.normalSpacing,
    styles.roundBorder
  ];
  const textContainerStyle = [
    styles.leftNormalMargin,
    styles.bottomSmallMargin
  ];
  const languageContainerStyle = [
    styles.primaryBackgroundColor,
    styles.leftNormalMargin,
    styles.bottomSmallMargin,
    styles.smallSpacing,
    styles.roundBorder
  ];

  return (
    <View style={outsideContainderStyle}>
      <Image
        style={avataStyle}
        source={{ uri: repo.ownerAvatarUrl }}
      />

      <View style={insideContainerStyle}>
        <View style={textContainerStyle}>
          <Subheading testID="repoFullname">{repo.fullName}</Subheading>
        </View>
        <View style={textContainerStyle}>
          <Text testID="repoDescription">{repo.description}</Text>
        </View>
        <View style={languageContainerStyle}>
          <Text style={styles.whiteColor} testID="repoLanguage">{repo.language}</Text>
        </View>
      </View>
    </View>
  );

};

export default RepositoryCard;