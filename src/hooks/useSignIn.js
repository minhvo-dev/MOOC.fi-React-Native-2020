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

    if (data && data.authorize) {
      await authStorage.setAccessToken(data.authorize.accessToken);
      await apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;