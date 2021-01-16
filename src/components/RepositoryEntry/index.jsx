import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../../hooks/useRepository";

import theme from "../../theme";
import RepositoryView from "./RepositoryView";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.small
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryEntry = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryView repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryEntry;