import type { NextPage } from "next";
import Head from "next/head";

import HomeButton from "../../components/homeButton/HomeButton";
import DarkThemeButton from "../../components/darkThemeButton/DarkThemeButton";
import { MovieType } from "../../data/movieData";
import favMovieIds from "../../data/movieData";
import Movie from "./Movie";

const MOVIE_API = process.env.MOVIE_API || "";
const API_KEY = process.env.API_KEY || "";
const POSTER_API = process.env.POSTER_API || "";

export async function getServerSideProps() {
  const movies = await Promise.all(
    favMovieIds.map(async (movieId) => {
      const result = await fetch(
        `${MOVIE_API}/movie/${movieId}?api_key=${API_KEY}`
      );
      const data = await result.json();
      const movie = {
        id: data.id,
        imdb_id: data.imdb_id,
        title: data.title,
        genres: data.genres,
        rating: data.vote_average,
        posterPath: `${POSTER_API}${data.poster_path}`,
        description: data.overview,
      };
      return movie;
    })
  );
  return {
    props: {
      movieList: movies,
    },
  };
}

const MoviePage: NextPage<{ movieList: MovieType[] }> = ({ movieList }) => {
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
        <Movie movieList={movieList} />
      </main>
      <footer>
        <HomeButton />
        <DarkThemeButton />
      </footer>
    </div>
  );
};

export default MoviePage;
