const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type User {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      items: [UserItem]
    }

    type UserItem {
      id: ID!
      userId: ID!
      itemName: String!
      description: String!
      amount: Float!
      user: User
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
      userItems(userId: ID!): [UserItem]
    }
  
    type Mutation {
      createUser(firstName: String!, lastName: String!, email: String!): User
      updateUser(id: ID!, firstName: String, lastName: String, email: String): User
      deleteUser(id: ID!): User

      createUserItem(userId: ID!, itemName: String!, description: String!, amount: Int!): UserItem
      deleteUserItem(id: ID!): UserItem
    }
`);

module.exports = schema;