import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: {
      id
    },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    fetchPolicy: "cache-and-network"
  });

  return {
    repository: loading ? undefined : data.repository,
    error
  };
};

export default useRepository;