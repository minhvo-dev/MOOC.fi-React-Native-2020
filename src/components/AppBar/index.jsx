import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link, useHistory } from "react-router-native";
import Constants from "expo-constants";
import { useApolloClient } from "@apollo/react-hooks";

import useUser from "../../hooks/useUser";

import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import AuthStorageContext from "../../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: "flex",
    flexDirection: "row"
  }
});

const AuthorizedTabs = ({ createReview, myReviews, logout }) => {
  return (
    <>
      <AppBarTab onPress={createReview}>Create a review</AppBarTab>
      <AppBarTab onPress={myReviews}>My reviews</AppBarTab>
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

  const { authorizedUser } = useUser();

  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push("/");
  };

  const navigateTo = (where) => {
    return () => {
      history.push(where);
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}>Repositories</Link>
        {authorizedUser
          ? <AuthorizedTabs
            logout={logout}
            createReview={navigateTo("/createReview")}
            myReviews={navigateTo("/myReviews")} />
          : <UnauthorizedTabs />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;