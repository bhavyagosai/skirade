import "../styles/globals.css";

import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AppContext from "../components/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const checkAuth = require("../utils/check-auth");

const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache(),
});

const user = {
  loggedIn:
    typeof window !== "undefined"
      ? localStorage.getItem("UserData")
        ? checkAuth(
            JSON.parse(localStorage.getItem("UserData")).register
              ? JSON.parse(localStorage.getItem("UserData")).register.token
              : JSON.parse(localStorage.getItem("UserData")).login.token
          )
          ? true
          : false
        : false
      : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGE":
      const newState = state;
      newState.loggedIn =
        typeof window !== "undefined"
          ? localStorage.getItem("UserData")
            ? checkAuth(
                JSON.parse(localStorage.getItem("UserData")).register
                  ? JSON.parse(localStorage.getItem("UserData")).register.token
                  : JSON.parse(localStorage.getItem("UserData")).login.token
              )
              ? true
              : false
            : false
          : false;

      if (newState.loggedIn === false) {
        if (localStorage.getItem("UserData"))
          localStorage.removeItem("UserData");
      }
      // const { planetName } = action;
      // newState.find((planet) => planetName === planet.name).occupied =
      //   action.occupied;
      return newState;
    default:
      return state;
  }
};

function MyApp({ Component, pageProps }) {
  const [userState, dispatch] = React.useReducer(reducer, user);

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ user: userState, dispatch }}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
