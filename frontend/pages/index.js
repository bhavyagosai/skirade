import styles from "../styles/Index.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql, useMutation, useQuery } from "@apollo/client";

import ChatElement from "../components/ChatElement";

const CHECK_AUTH_STATE = gql`
  {
    persistentLogin
  }
`;

export default function Home() {
  const [authToken, setAuthToken] = useState("");
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    setAuthToken(
      JSON.parse(localStorage.getItem("UserData")).register
        ? JSON.parse(localStorage.getItem("UserData")).register.token
        : JSON.parse(localStorage.getItem("UserData")).login.token
    );
  }, []);

  const { loading, error, data } = useQuery(CHECK_AUTH_STATE, {
    skip: authToken ? false : true,
    context: {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (authState) => {
      console.log(authState.persistentLogin);

    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Skirade</title>
        <meta
          name="description"
          content="Find the right team in a few clicks"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://kit-pro.fontawesome.com/releases/v5.15.3/css/pro.min.css"
          rel="stylesheet"
        />
      </Head>

      <ChatElement />

      <div className={styles.mainContainerLeft}>
        <div className={styles.shapeContainer}>
          <div className={styles.triangle} />
          <div className={styles.circle} />
          <div className={styles.rectangle} />
        </div>
      </div>
      <div className={styles.mainContainerRight}>
        <h1 className={styles.heading}>Find the right team in a few clicks.</h1>
        <div className={styles.buttonContainer}>
          <div className={styles["button"] + " " + styles["blue"]}>
            Find Talent
          </div>
          <div className={styles["button"] + " " + styles["green"]}>
            Find Work
          </div>
        </div>
      </div>
    </div>
  );
}
