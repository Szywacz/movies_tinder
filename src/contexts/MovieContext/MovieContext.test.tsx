import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MovieProvider, useMovies } from './MovieContext';
import {
  getMoviesData,
  updateMovieRecommendation,
} from '../../services/mockMovieService';

jest.mock('../../services/mockMovieService');

const mockMovies = [
  { id: 'testid1', title: 'Movie 1' },
  { id: 'testid2', title: 'Movie 2' },
];

export const TestConsumerComponent = () => {
  const { currentMovie, loading, error, handleRecommendationUpdate } =
    useMovies();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div data-testid='current-movie'>{currentMovie?.title}</div>
      <button onClick={() => handleRecommendationUpdate('accept')}>
        Accept
      </button>
      <button onClick={() => handleRecommendationUpdate('reject')}>
        Reject
      </button>
    </div>
  );
};

describe('Movie Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('it should fetch and display movies through useEffect', async () => {
    (getMoviesData as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(
      <MovieProvider>
        <TestConsumerComponent />
      </MovieProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('current-movie')).toHaveTextContent('Movie 1');
    });
  });

  it('should handle fetch error', async () => {
    (getMoviesData as jest.Mock).mockRejectedValueOnce(
      'Failed to fetch movies.'
    );

    render(
      <MovieProvider>
        <TestConsumerComponent />
      </MovieProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to fetch movies.')
      ).toBeInTheDocument();
    });
  });

  it('it should be able to update recommendation for movie', async () => {
    (getMoviesData as jest.Mock).mockResolvedValueOnce(mockMovies);
    (updateMovieRecommendation as jest.Mock).mockResolvedValueOnce({});

    render(
      <MovieProvider>
        <TestConsumerComponent />
      </MovieProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-movie')).toHaveTextContent('Movie 1');
    });

    const acceptBtn = screen.getByText('Accept');
    fireEvent.click(acceptBtn);

    await waitFor(() => {
      expect(updateMovieRecommendation).toHaveBeenCalledWith(
        'testid1',
        'accept'
      );
    });
  });

  it('should handle recommendation update error', async () => {
    (getMoviesData as jest.Mock).mockResolvedValueOnce(mockMovies);
    (updateMovieRecommendation as jest.Mock).mockRejectedValueOnce(
      'Failed to update recommendation.'
    );

    render(
      <MovieProvider>
        <TestConsumerComponent />
      </MovieProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-movie')).toHaveTextContent('Movie 1');
    });

    const acceptBtn = screen.getByText('Accept');
    fireEvent.click(acceptBtn);

    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to update recommendation.')
      ).toBeInTheDocument();
    });
  });

  it('should throw error when useMovies is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});
    expect(() => {
      render(<TestConsumerComponent />);
    }).toThrow('useMovies must be used within a MovieProvider');
    consoleSpy.mockRestore();
  });
});
