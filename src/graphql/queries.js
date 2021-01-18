import { gql } from "apollo-boost";

import {
  REPOSITORY_OVERVIEW,
  REPOSITORY_DETAILS,
  USER_DETAILS,
  PAGEINFO_DETAILS,
  REVIEW_DETAILS
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories (
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryOverview
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${REPOSITORY_OVERVIEW}
  ${PAGEINFO_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser (
    $includeReviews: Boolean = false
    $first: Int
    $after: String
  ) {
    authorizedUser {
      ...UserDetails
      reviews (
        first: $first
        after: $after
      ) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${USER_DETAILS}
  ${REVIEW_DETAILS}
  ${PAGEINFO_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query getRepository (
    $id: ID!
    $first: Int
    $after: String
  ) {
    repository (
      id: $id
    ) {
      ...RepositoryDetails
      reviews (
        first: $first
        after: $after
      ) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
  ${PAGEINFO_DETAILS}
`;