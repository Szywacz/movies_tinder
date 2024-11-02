import Swipeable from './components/Swipeable/Swipeable';
import MovieCard from './components/MovieCard/MovieCard';

const MoviesSwipper = () => {
  const onSwipe = () => {
    console.log('onSwipe', 'swipin');
  };

//   if (movies.length < 1)
//     return (
//       <div style={{ color: 'white' }}>
//         I am sorry, there is no more movies to recommend.
//       </div>
//     );

  return (
    <Swipeable onSwipe={onSwipe}>
      <MovieCard
        title='test'
        rating={7.7}
        description={
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus repellendus quam officia.'
        }
        posterUrl='https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg'
      />
    </Swipeable>
  );
};

export default MoviesSwipper;
