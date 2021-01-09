import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/react-hooks";

import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import { GET_AUTHORIZED_USER } from "../../graphql/queries";
import AuthStorageContext from "../../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: "flex",
    flexDirection: "row"
  }
});

const AppBar = () => {
  const { data, loading } = useQuery(GET_AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}>Repositories</Link>
        {(loading || !data.authorizedUser) && <Link to="/login" component={AppBarTab}>Sign in</Link>}
        {!loading && data.authorizedUser && <AppBarTab onClick={logout}>Sign out</AppBarTab>}
      </ScrollView>
    </View>
  );
};

export default AppBar;