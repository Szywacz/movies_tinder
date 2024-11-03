import { PropsWithChildren, useState } from 'react';
import './Swipeable.scss';

type SwipeableProps = {
  onSwipe?: (decision: 'reject' | 'accept') => void;
};

interface SwipeState {
  startX: number;
  currentX: number;
  isDragging: boolean;
}

const Swipeable = ({
  onSwipe,
  children,
}: PropsWithChildren<SwipeableProps>) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    currentX: 0,
    isDragging: false,
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    element.setPointerCapture(e.pointerId);

    setSwipeState({
      startX: e.clientX,
      currentX: e.clientX,
      isDragging: true,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipeState.isDragging) return;

    setSwipeState((prev) => ({
      ...prev,
      currentX: e.clientX,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipeState.isDragging) return;

    const element = e.currentTarget;
    element.releasePointerCapture(e.pointerId);

    const swipeDistance = swipeState.currentX - swipeState.startX;
    const minSwipeDistance = 100;

    if (Math.abs(swipeDistance) >= minSwipeDistance) {
      onSwipe?.('reject');
    }

    setSwipeState((prev) => ({
      ...prev,
      isDragging: false,
      currentX: prev.startX,
    }));
  };

  const translateX = swipeState.isDragging
    ? swipeState.currentX - swipeState.startX
    : 0;

  return (
    <div className={`swipeable__container`}>
      <div
        className={`swipeable__content`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: swipeState.isDragging
            ? 'none'
            : 'transform 0.3s ease-out',
        }}>
        {children}
      </div>
    </div>
  );
};

export default Swipeable;
