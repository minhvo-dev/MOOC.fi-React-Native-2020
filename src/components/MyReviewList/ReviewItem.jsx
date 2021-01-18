import React from "react";
import { Alert, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { format } from "date-fns";
import { useHistory } from "react-router-native";

import theme from "../../theme";
import Text from "../Text";
import Subheading from "../Subheading";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center"
  },
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
  },
  buttonContainer: {
    margin: theme.spacing.normal,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    marginHorizontal: theme.spacing.small,
    padding: theme.spacing.normal,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.normal,
    flexGrow: 1
  },
  buttonLabel: {
    color: "white",
    textAlign: "center"
  },
  redBackground: {
    backgroundColor: "red"
  }
});

export const ReviewItemDetail = ({ rating, heading, date, text }) => {
  const outsideContainerStyle = [styles.outsideContainer];
  const insideContainerStyle = [
    styles.insideContainer,
    styles.wrapText
  ];
  const ratingContainerStyle = [styles.ratingContainer];
  const ratingTextStyle = [styles.ratingText];
  const dateStyle = [styles.date];

  const dateStr = format(new Date(date), "MM/dd/yyyy");

  return (
    <View style={outsideContainerStyle}>
      <View style={ratingContainerStyle}>
        <Subheading style={ratingTextStyle}>{rating}</Subheading>
      </View>
      <View style={insideContainerStyle}>
        <Subheading>{heading}</Subheading>
        <Text style={dateStyle}>{dateStr}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const ReviewItemContainer = ({ review, reload, removeReview }) => {
  const history = useHistory();

  const { id, repository, rating, createdAt, text } = review;

  const handleViewRepository = () => {
    history.push(`/repository/${repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure to delete this message?",
      [
        {
          text: "Delete",
          onPress: async () => {
            await removeReview(id);
            await reload();
          }
        },
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        }
      ],
      {
        cancelable: true
      }
    );
  };

  const containerStyle = [styles.container];
  const buttonContainerStyle = [styles.buttonContainer];
  const buttonStyle = [styles.button];
  const buttonLabelStyle = [styles.buttonLabel];
  const redButtonStyle = [styles.button, styles.redBackground];

  return (
    <View style={containerStyle}>
      <ReviewItemDetail
        date={createdAt}
        rating={rating}
        text={text}
        heading={repository.fullName}
      />
      <View style={buttonContainerStyle}>
        <TouchableWithoutFeedback onPress={handleViewRepository}>
          <View style={buttonStyle} accessibilityRole="button" >
            <Subheading style={buttonLabelStyle}>View repository</Subheading>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleDeleteReview}>
          <View style={redButtonStyle} accessibilityRole="button" >
            <Subheading style={buttonLabelStyle}>Delete review</Subheading>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};


const ReviewItem = ({ review, reload, removeReview }) => {
  return (
    <ReviewItemContainer
      review={review}
      reload={reload}
      removeReview={removeReview}
    />
  );
};

export default ReviewItem;