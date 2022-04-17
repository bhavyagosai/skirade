const jwt = require("jsonwebtoken");
const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} = require("../../backend/config");

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = `Bearer ${context}`;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(
          token,
          __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        return user;
      } catch (err) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
