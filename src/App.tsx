import './App.scss';
import { MovieProvider } from './contexts/MovieContext/MovieContext';
import MoviesSwipper from './features/MoviesSwipper/MoviesSwipper';

function App() {
  return (
    <div className='app-container'>
      <MovieProvider>
        <MoviesSwipper />
      </MovieProvider>
    </div>
  );
}

export default App;
