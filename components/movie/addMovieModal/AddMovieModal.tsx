import { Dispatch, SetStateAction, FC, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Group,
  SimpleGrid,
  Text,
  Image,
  Card,
  Badge,
} from "@mantine/core";

import { MovieType } from "../../../data/movieData";
import Swal from "sweetalert2";

import HomeButton from "../../homeButton/HomeButton";

const MOVIE_API = process.env.MOVIE_API || "";
const API_KEY = process.env.API_KEY || "";
const POSTER_API = process.env.POSTER_API || "";

type Props = {
  movieStorage: MovieType[];
  setMovieStorage: Dispatch<SetStateAction<MovieType[]>>;
};

type TSearchResult = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  imdb_id: string;
  genres: string;
  description: string;
  overview: string;
  poster_path: string;
};

const AddMovieModal: FC<Props> = (props) => {
  const { movieStorage, setMovieStorage } = props;
  const [userQuery, setUserQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleSearchMovie = async () => {
    const response = await fetch(
      `${MOVIE_API}/search/movie?api_key=${API_KEY}&query=${userQuery}`
    );
    const data = await response.json();

    if (response.status === 200 && data.results.length > 0) {
      setSearchResults(data.results);
      setOpenModal(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Movie not available",
      });
    }
  };

  const handleAddMovie = (movieId: number) => {
    const isDuplicate = movieStorage.some((movie) => movie.id === movieId);
    if (!isDuplicate) {
      const match = searchResults?.find((movie) => movie.id === movieId);
      if (match !== undefined) {
        const newMovie: MovieType = {
          id: match.id,
          imdb_id: match.imdb_id,
          title: match.title,
          genres: match.genres,
          rating: match.vote_average,
          posterPath: `${POSTER_API}${match?.poster_path}`,
          description: match.overview,
        };
        const newMovieStorage = [...movieStorage, ...[newMovie]];
        setMovieStorage(newMovieStorage);
        Swal.fire({
          icon: "success",
          title: "Movie added!",
          text: "Check the list to view your movie.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This movie is already added to the list.",
      });
    }
  };

  return (
    <>
      <Group position="center" my="md">
        <TextInput
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Search movies..."
          mx="sm"
          style={{ width: "300px" }}
        />
        <Button size="md" onClick={handleSearchMovie}>
          Search
        </Button>
        <HomeButton />
      </Group>
      <Modal
        fullScreen
        transition="fade"
        closeButtonLabel="Exit Search Results"
        opened={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Text weight={700} align="center">
          <h1>Search Results</h1>
        </Text>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {searchResults?.map((result) => {
            return (
              <Card shadow="sm" p="lg" radius="md" withBorder key={result.id}>
                <Image
                  src={`${POSTER_API}${result.poster_path}`}
                  alt={result.title}
                  withPlaceholder
                  fit="contain"
                  height={400}
                />

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{result.title}</Text>
                  <Badge color="yellow" variant="filled" size="lg">
                    {result.vote_average}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  With Fjord Tours you can explore more of the magical fjord
                  landscapes with tours and activities on and around the fjords
                  of Norway
                </Text>

                <Button
                  color="green"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => handleAddMovie(result.id)}
                >
                  Add Movie
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
      </Modal>
    </>
  );
};

export default AddMovieModal;
