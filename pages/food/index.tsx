import type { NextPage } from "next";
import Head from "next/head";

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
    </div>
  );
};

export default FoodPage;
