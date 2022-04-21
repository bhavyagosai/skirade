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
    async starPost(_, { username, postID, postTitle }) {
      const user = await User.findOne({ username });

      if (!user) throw new ApolloError("User does not exist");

      user.starredPosts.map((starredPost) => {
        if (starredPost.postID === postID)
          throw new ApolloError("Post already starred!");
      });

      user.starredPosts.push({ postID, postTitle });

      await User.findOneAndUpdate(
        { username: username },
        {
          starredPosts: user.starredPosts,
        },
        { new: true }
      );

      return {
        postID,
        postTitle,
      };
    },
    async unstarPost(_, { username, postID, postTitle }) {
      const user = await User.findOne({ username });

      if (!user) throw new ApolloError("User does not exist");

      let check = 0;
      user.starredPosts.map((starredPost) => {
        if (starredPost.postID === postID) check = 1;
      });
      if (check === 0)
        throw new ApolloError("Post was never starred in the first place!");

      user.starredPosts = user.starredPosts.filter((starredPost) => {
        return starredPost.postID !== postID;
      });

      await User.findOneAndUpdate(
        { username: username },
        {
          starredPosts: user.starredPosts,
        },
        { new: true }
      );

      return {
        postID,
        postTitle,
      };
    },
  },
};
