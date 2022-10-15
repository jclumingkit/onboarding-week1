import type { NextPage } from "next";
import Head from "next/head";
import Food from "./Food";
import DarkThemeButton from "../../components/DarkThemeButton";

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
