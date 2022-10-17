export type MovieType = {
  id: number;
  imdb_id: string;
  title: string;
  genres: string;
  rating: number;
  posterPath: string;
  description: string;
};

const favMovieIds = [27205, 157336, 324857, 2034, 299536, 155];

export default favMovieIds;
