import { useQuery } from "@apollo/react-hooks";

import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useUser = (variables) => {
  const { data, loading, fetchMore, ...rest } = useQuery(GET_AUTHORIZED_USER, {
    variables,
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log(error);
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = variables.includeReviews && !loading && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser, // either use previous result or new is fine
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews, // new pageinfo
              edges: [ // combine two edges
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges
              ]
            }
          }
        };

        return nextResult;
      }
    });
  };

  return {
    authorizedUser: data ? data.authorizedUser : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...rest
  };
};

export default useUser;