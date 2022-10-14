import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Food from "./food/Food";
import DarkThemeButton from "../components/DarkThemeButton";

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
        <Food />
      </main>
      <footer>
        <DarkThemeButton />
      </footer>
    </div>
  );
};

export default Home;
