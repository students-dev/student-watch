export interface Media {
  id: string | number;
  tmdbId?: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  mediaType: 'movie' | 'tv' | 'anime';
  adult: boolean;
  genres: string[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface SearchResult {
  results: Media[];
  totalResults: number;
  totalPages: number;
}
