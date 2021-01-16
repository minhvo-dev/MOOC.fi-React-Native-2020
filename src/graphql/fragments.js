import { gql } from "apollo-boost";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    name
    fullName
    ownerName
    ownerAvatarUrl
    url
    language
    description
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    reviews {
      edges {
        node {
          id
          rating
          createdAt
          text
          user {
            id
            username
          }
        }
      }
    }
  }
`;

export const REPOSITORY_OVERVIEW = gql`
  fragment RepositoryOverview on Repository {
    id
    fullName
    ownerAvatarUrl
    language
    description
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    createdAt
  }
`;