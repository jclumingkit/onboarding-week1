import { useState } from "react";
import { NextPage } from "next";
import { Container, SimpleGrid } from "@mantine/core";

import { MovieType } from "../../data/movieData";
import AddMovieModal from "../../components/pageComponents/movie/addMovieModal/AddMovieModal";
import MovieCard from "../../components/pageComponents/movie/movieCard/MovieCard";

const Movie: NextPage<{ movieList: MovieType[] }> = ({ movieList }) => {
  const [movieStorage, setMovieStorage] = useState(movieList);

  return (
    <Container style={{ width: "100vw" }} p="xs">
      <>
        <AddMovieModal
          movieStorage={movieStorage}
          setMovieStorage={setMovieStorage}
        />
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {movieStorage?.map((movieItem) => {
            return <MovieCard key={movieItem.id} movieItem={movieItem} />;
          })}
        </SimpleGrid>
      </>
    </Container>
  );
};

export default Movie;
