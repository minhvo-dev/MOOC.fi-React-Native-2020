import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, error } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        console.log(error);
      }
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories, // new pageinfo
            edges: [ // combine two edges
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges
            ]
          }
        };

        return nextResult;
      }
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    error
  };
};

export default useRepositories;