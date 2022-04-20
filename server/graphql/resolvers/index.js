const usersResolvers = require("./users");
const sampleResolvers = require("./sample");
const postsResolvers = require("./posts");

module.exports = {
  Query: {
    // ...sampleResolvers.Query,
    ...usersResolvers.Query,
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};
