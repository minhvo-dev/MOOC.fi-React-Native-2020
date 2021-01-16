import React from "react";
import { StyleSheet, View } from "react-native";
import { format } from "date-fns";

import theme from "../../theme";
import Text from "../Text";
import Subheading from "../Subheading";

const styles = StyleSheet.create({
  outsideContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: theme.spacing.normal,
    backgroundColor: "white"
  },
  insideContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: theme.spacing.normal
  },
  lowPriorityItem: {
    flexGrow: 0
  },
  normalPriorityItem: {
    flexGrow: 1
  },
  ratingContainer: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  ratingText: {
    color: theme.colors.primary
  },
  wrapText: {
    flexShrink: 1,
    flexWrap: "wrap"
  },
  date: {
    fontStyle: "italic",
    marginBottom: theme.spacing.small
  }
});

const ReviewItem = ({ review }) => {
  const outsideContainerStyle = [styles.outsideContainer];
  const insideContainerStyle = [
    styles.insideContainer,
    styles.wrapText
  ];
  const ratingContainerStyle = [styles.ratingContainer];
  const ratingTextStyle = [styles.ratingText];
  const dateStyle = [styles.date];

  const { rating, user, createdAt, text } = review;
  const date = format(new Date(createdAt), "MM/dd/yyyy");

  return (
    <View style={outsideContainerStyle}>
      <View style={ratingContainerStyle}>
        <Subheading style={ratingTextStyle}>{rating}</Subheading>
      </View>
      <View style={insideContainerStyle}>
        <Subheading>{user.username}</Subheading>
        <Text style={dateStyle}>{date}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;