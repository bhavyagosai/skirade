const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const mongoose = require("mongoose");
// const cors = require("cors");

const resolvers = require("./backend/graphql/resolvers");
const typeDefs = require("./backend/graphql/typeDefs");
const { MONGODB } = require("./backend/config");

const server = new ApolloServer({
  // cors: false,
  // cors: {
  //   credentials: true,
  //   // origin: (origin, callback) => {
  //   //   const whitelist = ["http://localhost:5000/", "http://localhost:3000/"];

  //   //   if (whitelist.indexOf(origin) !== -1) {
  //   //     callback(null, true);
  //   //   } else {
  //   //     callback(new Error("Not allowed by CORS"));
  //   //   }
  //   // },
  //   origin: "*",
  // },
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// server.applyMiddleware({ cors: false });

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB has been connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
    // console.log("Server running at \n" + JSON.stringify(res));
  });
