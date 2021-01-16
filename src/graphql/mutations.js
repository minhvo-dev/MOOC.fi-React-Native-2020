import { gql } from "apollo-boost";

import { USER_DETAILS } from "./fragments";

export const SIGN_IN = gql`
  mutation signIn (
    $username: String!
    $password: String!
  ) {
    authorize (
      credentials: {
        username: $username
        password: $password
      }
    ) {
      accessToken
      user {
        ...UserDetails
      }
    }
  }
  ${USER_DETAILS}
`;

export const CREATE_REVIEW = gql`
  mutation createReview (
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $review
      }
    ) {
      id
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser (
    $username: String!
    $password: String!
  ) {
    createUser(
      user: {
        username: $username
        password: $password 
      }
    ) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;