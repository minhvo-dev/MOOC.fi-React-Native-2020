import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, loading, error } = useQuery(
    GET_REPOSITORIES,
    {
      variables: {
        orderBy,
        orderDirection
      },
      fetchPolicy: "cache-and-network"
    }
  );

  return {
    repositories: loading ? undefined : data.repositories,
    error
  };
};

export default useRepositories;