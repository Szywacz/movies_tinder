import { render, screen } from '@testing-library/react';
import App from './App';
import MoviesSwipper from './features/MoviesSwipper/MoviesSwipper';

jest.mock('./features/MoviesSwipper/MoviesSwipper', () => {
  return jest.fn(() => (
    <div data-testid='movies-swipper-mock'>Movies Swipper Component</div>
  ));
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<App />);
  });

  it('renders without crashing', () => {
    const container = document.querySelector('.app-container');
    expect(container).toHaveClass('app-container');
    expect(document.querySelector('.app-container')).toBeInTheDocument();
  });

  it('renders MoviesSwipper component', () => {
    expect(screen.getByTestId('movies-swipper-mock')).toBeInTheDocument();
  });

  it('calls MoviesSwipper component', () => {
    expect(MoviesSwipper).toHaveBeenCalled();
  });
});
