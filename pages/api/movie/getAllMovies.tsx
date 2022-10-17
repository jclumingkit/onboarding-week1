import { NextApiRequest, NextApiResponse } from "next";
import favMovieIds from "../../../data/movieData";

const MOVIE_API = process.env.MOVIE_API || "";
const API_KEY = process.env.API_KEY || "";
const POSTER_API = process.env.POSTER_API || "";

// type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const getAllMovie = async (req: NextApiRequest, res: NextApiResponse) => {
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
  res.status(200).send(movies);
};

export default getAllMovie;
