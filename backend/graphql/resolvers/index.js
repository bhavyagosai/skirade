const usersResolvers = require("./users");
const sampleResolvers = require("./sample");

module.exports = {
  Query: {
    ...sampleResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
