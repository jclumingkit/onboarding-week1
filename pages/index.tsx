import styles from "../styles/Home.module.css";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { List } from "@mantine/core";

const Home: NextPage = () => {
  return (
    <>
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
          <List>
            <List.Item>
              <Link href="/food">Day 1 and Day 2 Projects</Link>
            </List.Item>
            <List.Item>
              <Link href="/movie">Day 3 Projects</Link>
            </List.Item>
          </List>
        </main>
      </div>
    </>
  );
};

export default Home;
