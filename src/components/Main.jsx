import React from "react";
import { StyleSheet, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";

import theme from "../theme";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import RepositoryEntry from "./RepositoryEntry";
import ReviewInput from "./ReviewInput";
import SignUp from "./SignUp";
import MyReviewList from "./MyReviewList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.secondary
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signIn" exact>
          <SignIn />
        </Route>
        <Route path="/signUp" exact>
          <SignUp />
        </Route>
        <Route path="/createReview" exact>
          <ReviewInput />
        </Route>
        <Route path="/myReviews" exact>
          <MyReviewList />
        </Route>
        <Route path="/repository/:id">
          <RepositoryEntry />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;