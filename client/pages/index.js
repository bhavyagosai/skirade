import styles from "../styles/Index.module.css";
import Head from "next/head";

import ChatElement from "../components/ChatElement";

export default function Home() {
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
