import type { NextPage } from "next";
import Head from "next/head";

import HomeButton from "../../components/homeButton/HomeButton";
import DarkThemeButton from "../../components/darkThemeButton/DarkThemeButton";

import Movie from "./Movie";

const MoviePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Day 3 Project</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Movie />
      </main>
      <footer>
        <HomeButton />
        <DarkThemeButton />
      </footer>
    </div>
  );
};

export default MoviePage;
