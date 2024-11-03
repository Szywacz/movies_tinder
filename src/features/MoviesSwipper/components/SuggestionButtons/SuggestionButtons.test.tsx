import { fireEvent, render, screen } from '@testing-library/react';
import SuggestionButtons from './SuggestionButtons';
import { useMovies } from '../../../../contexts/MovieContext/MovieContext';

jest.mock('../../../../contexts/MovieContext/MovieContext', () => ({
  useMovies: jest.fn(),
}));

describe('SuggestionButtons', () => {
  const mockHandleRecommendationUpdate = jest.fn();
  const mockMovie = {
    id: 'testid1',
    title: 'Test Movie',
    rating: 8.5,
    summary: 'Test description',
    imageUrl: 'test-image.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useMovies as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      currentMovie: mockMovie,
      handleRecommendationUpdate: mockHandleRecommendationUpdate,
    });
    render(<SuggestionButtons />);
  });

  it('should render button with passed children', () => {
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Accept');
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('Reject');
  });

  it('buttons onClick should call handleRecommendationUpdate with proper arguments', () => {
    const acceptBtn = screen.getByText('Accept');
    fireEvent.click(acceptBtn);

    const rejectBtn = screen.getByText('Reject');
    fireEvent.click(rejectBtn);
    expect(mockHandleRecommendationUpdate).toHaveBeenCalledWith('accept');
    expect(mockHandleRecommendationUpdate).toHaveBeenCalledWith('reject');
  });
});
