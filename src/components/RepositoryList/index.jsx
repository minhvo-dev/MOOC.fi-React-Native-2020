import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import theme from "../../theme";
import RepositoryItem from "./RepositoryItem";
import OrderPicker from "./OrderPicker";

import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.small
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <OrderPicker setOrder={setOrder} />}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = React.useState({});

  const { repositories } = useRepositories(order);

  return (
    <RepositoryListContainer 
    repositories={repositories} 
    setOrder={setOrder}
    />
  );
};

export default RepositoryList;