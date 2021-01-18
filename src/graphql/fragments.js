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

export const PAGEINFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    endCursor
    startCursor
    totalCount
    hasNextPage
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    repository {
      id
      fullName
    }
    user {
      id
      username
    }
  }
`;