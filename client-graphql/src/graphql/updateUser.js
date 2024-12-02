import gql from 'graphql-tag';

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
        updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
            id
            firstName
            lastName
            email
        }
    }
`;