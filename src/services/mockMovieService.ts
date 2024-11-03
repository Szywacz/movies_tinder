import { Movie } from '../contexts/MovieContext/types';
import mockMovies from '../utils/mocks/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getMoviesData(): Promise<Movie[]> {
  await delay(1000);
  return mockMovies;
}

export async function updateMovieRecommendation(
  id: string,
  decision: 'accept' | 'reject'
): Promise<{ success: boolean; message: string }> {
  await delay(500);
  console.log(`Movie ${id} was ${decision}ed`);
  return {
    success: true,
    message: `Successfully ${decision}ed movie ${id}`,
  };
}
