import { Dispatch, SetStateAction, FC, useState } from "react";
import { Modal, Button, TextInput, List, Group, Text } from "@mantine/core";

import { MovieType } from "../../../../data/movieData";

// import Swal from "sweetalert2";

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
  const [searchResults, setSearchResults] = useState<TSearchResult[]>();
  const [openModal, setOpenModal] = useState(false);

  const handleSearchMovie = async () => {
    const response = await fetch(
      `${MOVIE_API}/search/movie?api_key=${API_KEY}&query=${userQuery}`
    );
    const data = await response.json();

    setSearchResults(data.results);
  };

  const handleAddMovie = (movieId: number) => {
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
    }
  };
  console.log(movieStorage);
  return (
    <div>
      <Modal
        fullScreen
        size="lg"
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="What is your favorite movie?"
      >
        <TextInput
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <Button onClick={handleSearchMovie}>Search</Button>
        <List>
          {searchResults?.map((result) => {
            return (
              <List.Item key={result.id}>
                <Group>
                  <Text>{result.title}</Text>
                  <Text>{result.vote_average}</Text>
                  <Text>{result.release_date}</Text>
                  <Button onClick={() => handleAddMovie(result.id)}>Add</Button>
                </Group>
              </List.Item>
            );
          })}
        </List>
      </Modal>
      <Button
        size="md"
        fullWidth
        color="indigo"
        onClick={() => setOpenModal(true)}
        my="md"
      >
        Movie+
      </Button>
    </div>
  );
};

export default AddMovieModal;
