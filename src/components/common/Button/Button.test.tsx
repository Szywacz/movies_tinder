import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with passed children', () => {
    render(
      <Button>
        <h1>Click</h1>
      </Button>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
