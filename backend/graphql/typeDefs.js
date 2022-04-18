const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    name: String!
    age: Int!
    city: String!
    country: String!
    education: String!
    institution: String!
    degree: String!
    passingYear: Int!
    createdAt: String!
    profileImage: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    name: String!
    age: String!
    city: String!
    country: String!
    education: String!
    institution: String!
    degree: String!
    passingYear: String!
  }
  type Query {
    sayHi: String!
    getUsers: [User]
    getUser(username: String!): User
    persistentLogin: Boolean!
  }
  type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User!
  }
`;
