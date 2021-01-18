import React from "react";
import { FlatList } from "react-native";
import useUser from "../../hooks/useUser";

import ReviewItem from "./ReviewItem";
import ItemSeparator from "../ItemSeparator";

import { END_REACHED_THRESHOLD, NUMBER_REVIEWS_TO_FETCH } from "../../constants";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../../graphql/mutations";

const MyReviewListContainer = ({ reviews, reload, onEndReach, removeReview }) => {

  const renderItem = ({ item }) => (
    <ReviewItem
      review={item}
      reload={reload}
      removeReview={removeReview}
    />
  );


  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
    />
  );
};

const MyReviewList = () => {
  const { authorizedUser, fetchMore, refetch } = useUser({
    includeReviews: true,
    first: NUMBER_REVIEWS_TO_FETCH
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const onEndReach = () => {
    fetchMore();
  };

  const reload = async () => {
    await refetch();
  };

  const removeReview = async (id) => {
    return await deleteReview({
      variables: {
        id
      }
    });
  };

  const reviewNodes =
    authorizedUser
      ? authorizedUser.reviews.edges.map(edge => edge.node)
      : [];

  return (
    <MyReviewListContainer
      reviews={reviewNodes}
      reload={reload}
      onEndReach={onEndReach}
      removeReview={removeReview}
    />
  );
};

export default MyReviewList;