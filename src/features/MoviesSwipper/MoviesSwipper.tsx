import Swipeable from './components/Swipeable/Swipeable';
import MovieCard from './components/MovieCard/MovieCard';
import { useMovies } from '../../contexts/MovieContext/MovieContext';

const MoviesSwipper = () => {
  const { currentMovie, loading, error, handleRecommendationUpdate } =
    useMovies();

  if (loading) {
    return <div className='text-white'>Loading movies...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (!currentMovie)
    return (
      <div style={{ color: 'white' }}>
        I am sorry, there is no more movies to recommend.
      </div>
    );

  return (
    <Swipeable onSwipe={(decision) => handleRecommendationUpdate(decision)}>
      <MovieCard
        title={currentMovie.title}
        rating={currentMovie.rating}
        description={currentMovie.summary}
        posterUrl={currentMovie.imageUrl}
      />
    </Swipeable>
  );
};

export default MoviesSwipper;
