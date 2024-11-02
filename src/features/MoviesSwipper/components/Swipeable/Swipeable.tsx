import { PropsWithChildren, TouchEvent, useRef, useState } from 'react';
import './Swipeable.scss';

type SwipeableProps = {
  onSwipe?: () => void;
};

const Swipeable = ({
  onSwipe,
  children,
}: PropsWithChildren<SwipeableProps>) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [translateX, setTranslateX] = useState<number>(0);

  const elementRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 100;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>): void => {

    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    setIsDragging(false);
    const distance = touchEnd - touchStart;
    setTranslateX(0);

    if (Math.abs(distance) < minSwipeDistance) return;
    if (distance != 0) {
      onSwipe?.();
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    if (!isDragging) return;

    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    const distance = currentTouch - touchStart!;
    setTranslateX(distance);
  };

  return (
    <div className='swipeable__container'>
      <div
        className='swipeable__content'
        ref={elementRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}>
        {children}
      </div>
    </div>
  );
};

export default Swipeable;
