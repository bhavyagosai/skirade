const jwt = require("jsonwebtoken");
const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} = require("../../backend/config");

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = "Bearer " + context;
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
        console.error("Invalid/Expired token");
      }
    }
    console.error("Authentication token must be Bearer [token]");
  }
  console.error("Authorization header must be provided");
};
