import SuggestionButtons from '../SuggestionButtons/SuggestionButtons';
import './MovieCard.scss';

type MovieCardProps = {
  title: string;
  rating: number;
  description: string;
  posterUrl: string;
};

const MovieCard = ({
  title,
  rating,
  description,
  posterUrl,
}: MovieCardProps) => {
  return (
    <div className='movie-card'>
      <div
        className='movie-card__poster'
        style={{ backgroundImage: `url(${posterUrl})` }}></div>
      <div className='movie-card__content'>
        <div className='movie-card__header'>
          <h3 className='movie-card__title'>{title}</h3>
          <div className='movie-card__rating'>{rating}</div>
        </div>
        <p className='movie-card__description'>{description}</p>
        <SuggestionButtons />
      </div>
    </div>
  );
};

export default MovieCard;
