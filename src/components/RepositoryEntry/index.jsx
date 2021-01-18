import React from "react";
import { FlatList } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../../hooks/useRepository";

import ItemSeparator from "../ItemSeparator";
import RepositoryView from "./RepositoryView";
import { ReviewItemDetail } from "../MyReviewList/ReviewItem";

import { END_REACHED_THRESHOLD, NUMBER_REVIEWS_TO_FETCH } from "../../constants";

const RepositoryEntry = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id,
    first: NUMBER_REVIEWS_TO_FETCH
  });

  if (!repository) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItemDetail
          heading={item.user.username}
          rating={item.rating}
          text={item.text}
          date={item.createdAt}
        />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryView repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
    />
  );
};

export default RepositoryEntry;