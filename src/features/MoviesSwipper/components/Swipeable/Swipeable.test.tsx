import { fireEvent, render, screen } from '@testing-library/react';
import Swipeable from './Swipeable';

describe('Swipeable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component', () => {
    render(
      <Swipeable>
        <div>Content</div>
      </Swipeable>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should call onSwipe', () => {
    const mockOnSwipe = jest.fn();
    const component = render(
      <Swipeable onSwipe={mockOnSwipe}>
        <div>Content</div>
      </Swipeable>
    );

    const swipeableContent = component.getByText('Content');

    fireEvent.touchStart(swipeableContent, {
      targetTouches: [{ clientX: 50 }],
    });

    fireEvent.touchMove(swipeableContent, {
      targetTouches: [{ clientX: 200 }],
    });

    fireEvent.touchEnd(swipeableContent);

    expect(mockOnSwipe).toHaveBeenCalledWith('reject');
  });

  it('should not call onSwipe on short swipes', () => {
    const mockOnSwipe = jest.fn();
    const component = render(
      <Swipeable onSwipe={mockOnSwipe}>
        <div>Content</div>
      </Swipeable>
    );

    const swipeableContent = component.getByText('Content');

    fireEvent.touchStart(swipeableContent, {
      targetTouches: [{ clientX: 30 }],
    });

    fireEvent.touchMove(swipeableContent, {
      targetTouches: [{ clientX: 50 }],
    });

    fireEvent.touchEnd(swipeableContent);

    expect(mockOnSwipe).not.toHaveBeenCalled();
  });
});
