import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders app component', () => {
    render(<App />);
    const welcomeMessage = screen.getByText('Test');
    expect(welcomeMessage).toBeInTheDocument();
  });
});
