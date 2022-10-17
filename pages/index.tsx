import styles from "../styles/Home.module.css";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Onboarding Week 1</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Onboarding Week 1 Projects</h1>
        <ul>
          <li className={styles.linkListItem}>
            <Link href="/food">Day 1 and Day 2 Projects</Link>
          </li>
          <li className={styles.linkListItem}>
            <Link href="/movie">Day 3 Projects</Link>
          </li>
        </ul>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
