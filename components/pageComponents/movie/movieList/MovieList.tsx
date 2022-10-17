import { useEffect, useState } from "react";
import { SimpleGrid } from "@mantine/core";

import MovieCard from "./movieCard/MovieCard";

import { MovieType } from "../../../../data/movieData";

const MovieList = () => {
  const [movieList, setMovieList] = useState<MovieType[]>();
  const getFavMovies = async () => {
    const results = await fetch("/api/movie/getAllMovies");
    const data = await results.json();

    setMovieList(data);
  };

  useEffect(() => {
    getFavMovies();
  }, []);

  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {movieList?.map((movieItem) => {
        return <MovieCard key={movieItem.id} movieItem={movieItem} />;
      })}
    </SimpleGrid>
  );
};

export default MovieList;
