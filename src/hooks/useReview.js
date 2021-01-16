import { useMutation } from "@apollo/react-hooks";

import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [createReview_, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  const createReview = async ({ ownerName, repositoryName, rating, review }) => {
    const { data } = await createReview_({
      variables: {
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        review
      }
    });

    return data;
  };

  return [createReview, result];
};

export default useReview;