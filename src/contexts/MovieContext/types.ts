export interface Movie {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  rating: number;
}

export interface MovieContextState {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

export interface MovieContextValue extends MovieContextState {
  handleRecommendationUpdate: (decision: 'reject' | 'accept') => Promise<void>;
  refreshMovies: () => Promise<void>;
}
