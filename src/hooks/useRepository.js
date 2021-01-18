import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, loading, fetchMore, error } = useQuery(GET_REPOSITORY, {
    variables,
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    fetchPolicy: "cache-and-network"
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews, // update page info
              edges: [ // merge previous reviews with new fetched reviews
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ],
            }
          }
        };
        
        return nextResult;
      }
    });
  };

  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    error
  };
};

export default useRepository;