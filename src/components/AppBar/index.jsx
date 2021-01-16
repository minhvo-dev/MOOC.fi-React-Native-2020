import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link, useHistory } from "react-router-native";
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

const AuthorizedTabs = ({ review, logout }) => {
  return (
    <>
      <AppBarTab onPress={review}>Create a review</AppBarTab>
      <AppBarTab onPress={logout}>Sign out</AppBarTab>
    </>
  );
};

const UnauthorizedTabs = () => {
  return (
    <>
      <Link to="/signIn" component={AppBarTab}>Sign in</Link>
      <Link to="/signUp" component={AppBarTab}>Sign up</Link>
    </>
  );
};

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authorizedUser = data ? data.authorizedUser : undefined;

  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push("/");
  };

  const navigateToReview = () => {
    history.push("/review");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}>Repositories</Link>
        {authorizedUser
          ? <AuthorizedTabs logout={logout} review={navigateToReview} />
          : <UnauthorizedTabs />}
      </ScrollView>
    </View>
  );
};

export default AppBar;