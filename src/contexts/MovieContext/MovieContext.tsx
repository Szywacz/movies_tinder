import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MovieContextState, MovieContextValue } from './types';
import {
  getMoviesData,
  updateMovieRecommendation,
} from '../../services/mockMovieService';

const initialState: MovieContextState = {
  movies: [],
  currentMovie: null,
  loading: true,
  error: null,
};

const MovieContext = createContext<MovieContextValue | undefined>(undefined);

export const MovieProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<MovieContextState>(initialState);

  const fetchMovies = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const movies = await getMoviesData();
      setState((prev) => ({
        ...prev,
        movies,
        currentMovie: movies[0] || null,
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch movies.';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  const handleRecommendationUpdate = async (decision: 'reject' | 'accept') => {
    if (!state.currentMovie) return;

    try {
      await updateMovieRecommendation(state.currentMovie.id, decision);

      setState((prev) => {
        const nextMovieIndex =
          prev.movies.findIndex((m) => m.id === prev.currentMovie?.id) + 1;
        return {
          ...prev,
          currentMovie: prev.movies[nextMovieIndex] || null,
        };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to update recommendation.';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
      }));
    }
  };

  const refreshMovies = async () => {
    await fetchMovies();
  };

  useEffect(() => {
    (async () => {
      await fetchMovies();
    })().catch((error) => {
      setState((prev) => ({
        ...prev,
        error: error as string,
        loading: false,
      }));
    });
  }, []);

  const value: MovieContextValue = {
    ...state,
    handleRecommendationUpdate,
    refreshMovies,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
