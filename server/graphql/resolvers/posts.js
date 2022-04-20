const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError, ApolloError } = require("apollo-server");

const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} = require("../../config");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const User = require("../../models/User");
const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    // async getPost(_, { username }) {
    //   try {
    //     const user = await User.findOne({ username });
    //     if (user) {
    //       return user;
    //     } else {
    //       throw new Error(`User ${username} does not exist`);
    //     }
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
  },
  Mutation: {
    async addPost(
      _,
      {
        postInput: {
          author,
          authorName,
          authorImg,
          title,
          description,
          role,
          skills,
          experience,
          duration,
          university,
          tags,
        },
      }
    ) {
      if (!(await User.findOne({ username: author }))) {
        throw new ApolloError("Author does not exist");
      }

      const newPost = new Post({
        author,
        authorName,
        authorImg,
        title,
        description,
        role,
        skills,
        experience,
        duration,
        university,
        tags,
        createdAt: new Date().toISOString(),
      });

      const res = await newPost.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};
