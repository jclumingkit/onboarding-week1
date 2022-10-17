import type { NextPage } from "next";
import Head from "next/head";
import DarkThemeButton from "../../components/DarkThemeButton/DarkThemeButton";

import Food from "./Food";

const FoodPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Day 1 Project</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Food />
      </main>
      <footer>
        <DarkThemeButton />
      </footer>
    </div>
  );
};

export default FoodPage;
