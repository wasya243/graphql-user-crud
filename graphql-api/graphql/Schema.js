const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type User {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
    }

    type PaginatedUsers {
      users: [User!]
      total: Int!
      totalPages: Int!
      currentPage: Int!
    }
  
    type Query {
      user(id: ID!): User
      users(page: Int!, perPage: Int!): PaginatedUsers
    }
  
    type Mutation {
      createUser(firstName: String!, lastName: String!, email: String!): User
      updateUser(id: ID!, firstName: String, lastName: String, email: String): User
      deleteUser(id: ID!): User
    }
`);

module.exports = schema;