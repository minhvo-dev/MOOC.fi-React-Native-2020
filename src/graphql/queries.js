import { gql } from "apollo-boost";

import {REPOSITORY_OVERVIEW, REPOSITORY_DETAILS, USER_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories (
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      edges {
        node {
          ...RepositoryOverview
        }
      }
    }
  }
  ${REPOSITORY_OVERVIEW}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser {
    authorizedUser {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query getRepository (
    $id: ID!
  ) {
    repository(id: $id) {
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`;