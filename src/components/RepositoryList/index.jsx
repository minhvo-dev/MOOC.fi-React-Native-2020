import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import useRepositories from "../../hooks/useRepositories";

import theme from "../../theme";
import RepositoryItem from "./RepositoryItem";
import OrderMenu from "./OrderMenu";
import Searchbar from "./Searchbar";
import ItemSeparator from "../ItemSeparator";

import { OrderByType, OrderDirectionType } from "../../utils/orderTypes";
import { END_REACHED_THRESHOLD, NUMBER_REPOSITORIES_TO_FETCH } from "../../constants";

const options = [
  {
    id: 1,
    label: "Latest",
    value: {
      orderBy: OrderByType.DATE,
      orderDirection: OrderDirectionType.DESCENDING
    }
  },
  {
    id: 2,
    label: "Highest rated",
    value: {
      orderBy: OrderByType.RATING,
      orderDirection: OrderDirectionType.DESCENDING
    }
  },
  {
    id: 3,
    label: "Lowest rated",
    value: {
      orderBy: OrderByType.RATING,
      orderDirection: OrderDirectionType.ASCENDING
    }
  }
];

const styles = StyleSheet.create({
  listHeaderContainer: {
    margin: theme.spacing.normal,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

const RepositoryListHeader = ({ option, setOption, searchKeyword, setSearchKeyword }) => {
  const containerStyle = [styles.listHeaderContainer];

  return (
    <View style={containerStyle}>
      <OrderMenu
        options={options}
        setOption={setOption}
        selected={option}
      />
      <Searchbar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      option,
      setOption,
      searchKeyword,
      setSearchKeyword
    } = this.props;
    return (
      <RepositoryListHeader
        option={option}
        setOption={setOption}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  renderItem = ({ item }) => <RepositoryItem item={item} />;

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
      />
    );
  }

}

const RepositoryList = () => {
  const [option, setOption] = React.useState(options[0]);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const { repositories, fetchMore } = useRepositories(
    {
      ...option.value,
      searchKeyword,
      first: NUMBER_REPOSITORIES_TO_FETCH
    }
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      option={option}
      setOption={setOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;