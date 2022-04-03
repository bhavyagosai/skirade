const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} = require("../../config");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const User = require("../../models/User");
const checkAuth = require("../../util/check-auth");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    { expiresIn: "3h" }
  );
};

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUser(_, { username }) {
      try {
        const user = await User.findOne({ username });
        if (user) {
          return user;
        } else {
          throw new Error(`User ${username} does not exist`);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async persistentLogin(_, {}, context) {
      const user = checkAuth(context);
      console.log(user);

      if (user) return true;
      else return false;
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid)
        throw new UserInputError(
          "Error(s) encountered while logging the user in",
          { errors }
        );

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      if (
        !validateRegisterInput(username, email, password, confirmPassword).valid
      )
        throw new UserInputError(
          "Error(s) encountered while registering the user",
          validateRegisterInput(
            username,
            email,
            password,
            confirmPassword
          ).errors
        );
      if (await User.findOne({ username })) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is already taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
