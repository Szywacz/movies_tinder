import { render, screen } from '@testing-library/react';
import MoviesSwipper from './MoviesSwipper';
import { useMovies } from '../../contexts/MovieContext/MovieContext';

jest.mock('../../contexts/MovieContext/MovieContext', () => ({
  useMovies: jest.fn(),
}));

describe('MoviesSwipper', () => {
  const mockMovie = {
    title: 'Test Movie',
    rating: 8.5,
    summary: 'Test description',
    imageUrl: 'test-image.jpg',
  };

  const mockHandleRecommendationUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loading state', () => {
    (useMovies as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      currentMovie: null,
      handleRecommendationUpdate: mockHandleRecommendationUpdate,
    });

    render(<MoviesSwipper />);
    expect(screen.getByText('Loading movies...')).toBeInTheDocument();
  });

  it('error state', () => {
    (useMovies as jest.Mock).mockReturnValue({
      loading: false,
      error: 'Failed to fetch movies.',
      currentMovie: null,
      handleRecommendationUpdate: mockHandleRecommendationUpdate,
    });

    render(<MoviesSwipper />);
    expect(screen.getByText('Failed to fetch movies.')).toBeInTheDocument();
  });

  it('no movies state', () => {
    (useMovies as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      currentMovie: null,
      handleRecommendationUpdate: mockHandleRecommendationUpdate,
    });

    render(<MoviesSwipper />);
    expect(
      screen.getByText('I am sorry, there is no more movies to recommend.')
    ).toBeInTheDocument();
  });

  it('movie displayed', () => {
    (useMovies as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      currentMovie: mockMovie,
      handleRecommendationUpdate: mockHandleRecommendationUpdate,
    });

    render(<MoviesSwipper />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
});
