import { useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

import AuthStorageContext from "../contexts/AuthStorageContext";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [login, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await login({
      variables: {
        username,
        password
      }
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();

    return result;
  };

  return [signIn, result];
};

export default useSignIn;