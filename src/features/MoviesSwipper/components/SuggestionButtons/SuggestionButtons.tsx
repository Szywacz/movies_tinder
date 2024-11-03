/* eslint-disable @typescript-eslint/no-floating-promises */
import Button, {
  ButtonProps,
} from '../../../../components/common/Button/Button';
import { useMovies } from '../../../../contexts/MovieContext/MovieContext';
import './SuggestionButtons.scss';

interface SuggestionButtonConfig
  extends Pick<ButtonProps, 'size' | 'className' | 'variant'> {
  title: string;
  onClick: () => void;
}

const SuggestionButtons = () => {
  const { handleRecommendationUpdate } = useMovies();

  const stopPropagation = (e: React.PointerEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  const buttons: SuggestionButtonConfig[] = [
    {
      title: 'Accept',
      size: 'lg',
      variant: 'success',
      className: '',
      onClick: () => {
        handleRecommendationUpdate('accept');
      },
    },
    {
      title: 'Reject',
      size: 'lg',
      variant: 'danger',
      className: '',
      onClick: () => {
        handleRecommendationUpdate('reject');
      },
    },
  ];
  return (
    <div className='suggestion-buttons__container'>
      {buttons.map((_, index) => (
        <Button
          key={index}
          onClick={_.onClick}
          size={_.size}
          variant={_.variant}
          onPointerDown={stopPropagation}
          onTouchStart={stopPropagation}
          onTouchEnd={stopPropagation}>
          {_.title}
        </Button>
      ))}
    </div>
  );
};

export default SuggestionButtons;
