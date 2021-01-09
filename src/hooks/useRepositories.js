import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network"
    }
  );

  return {
    repositories: loading ? undefined : data.repositories,
    error
  };
};

export default useRepositories;