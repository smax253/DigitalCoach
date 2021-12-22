import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState(false);

  const onClickButton = () => setData(!data);
  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Doach</title>
        <meta name="description" content="Senior Design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={onClickButton}>Click Me</button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
