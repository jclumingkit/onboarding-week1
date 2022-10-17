import { FC } from "react";
import { Container, Center } from "@mantine/core";

import MovieList from "../../components/pageComponents/movie/movieList/MovieList";

const Movie: FC = () => {
  return (
    <Container style={{ width: "100vw" }} p="xs">
      <Center>
        <MovieList />
      </Center>
    </Container>
  );
};

export default Movie;
