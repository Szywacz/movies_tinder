import { Movie } from '../contexts/MovieContext/types';

export type RecommendationUpdateResponse = {
  message: string;
  success: boolean;
};

export async function getMoviesData() {
  try {
    const response = await fetch(
      '/api/movies/PAGE&limit=10'
    );
    if (!response.ok) throw new Error('Failed to fetch movies data');
    const movieResponse = (await response.json()) as Movie[];
    return movieResponse;
  } catch (error) {
    console.error('Error fetching movies: ', error);
    throw error;
  }
}

export async function updateMovieRecommendation(
  id: string,
  decision: 'accept' | 'reject'
): Promise<RecommendationUpdateResponse> {
  try {
    const response = await fetch(`/api/recommendations/${id}/${decision}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update recommendation');
    }

    return (await response.json()) as RecommendationUpdateResponse;
  } catch (error) {
    console.error('Error updating recommendation: ', error);
    throw error;
  }
}
