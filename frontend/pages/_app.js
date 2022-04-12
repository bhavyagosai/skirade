import "../styles/globals.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp;
