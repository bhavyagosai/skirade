const { gql } = require("apollo-server");

module.exports = gql`
  type StarredPost {
    postID: String!
    postTitle: String!
  }
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
    starredPosts: [StarredPost]
    github: String
    linkedin: String
    twitter: String
    instagram: String
    title: String
    about: String
    skills: [String]
    languages: [String]
    # experience
  }
  type Post {
    id: ID!
    author: String!
    authorName: String!
    authorImg: String!
    title: String!
    description: String!
    role: String!
    skills: [String]!
    experience: String!
    duration: String!
    university: String!
    tags: [String]
    createdAt: String!
  }
  input PostInput {
    author: String!
    authorName: String!
    authorImg: String!
    title: String!
    description: String!
    role: String!
    skills: [String]!
    experience: String!
    duration: String!
    university: String!
    tags: [String]
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
    github: String
    linkedin: String
    twitter: String
    instagram: String
    title: String
    about: String
    skills: [String]
    languages: [String]
    # experience
  }
  type Query {
    sayHi: String!
    getUsers: [User]
    getUser(username: String!): User
    getPost(postID: String!): Post
    getPosts: [Post]
    filterPosts(
      selectedUniversity: String
      selectedDuration: String
      selectedExperience: String
      selectedRoles: [String]
      selectedSkills: [String]
    ): [Post]
    persistentLogin: Boolean!
  }
  type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User!
    addPost(postInput: PostInput): Post
    starPost(
      username: String!
      postID: String!
      postTitle: String!
    ): StarredPost!
    unstarPost(
      username: String!
      postID: String!
      postTitle: String!
    ): StarredPost!
  }
`;
