import gql from 'graphql-tag';

export const GET_USERS = gql`
    query getUsers($page: Int!, $perPage: Int!) {
      users(page: $page, perPage: $perPage) {
        users {
          id
          firstName
          lastName
          email
        }
        total
        totalPages
        currentPage
      }
    }
`;