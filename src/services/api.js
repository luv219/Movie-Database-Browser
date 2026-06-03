import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

// Add a request interceptor to attach the API key to every request
api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.api_key = import.meta.env.VITE_TMDB_API_KEY;
  return config;
});

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: { with_genres: genreId, page }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: { append_to_response: 'credits' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchTVByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/tv', {
      params: { with_genres: genreId, page }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TV by genre:', error);
    throw error;
  }
};

export const fetchPopularTV = async (page = 1) => {
  try {
    const response = await api.get('/tv/popular', { params: { page } });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

export const fetchTVGenres = async () => {
  try {
    const response = await api.get('/genre/tv/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    throw error;
  }
};

export const searchTV = async (query, page = 1) => {
  try {
    const response = await api.get('/search/tv', {
      params: { query, page }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching TV shows:', error);
    throw error;
  }
};

export const fetchTVDetails = async (id) => {
  try {
    const response = await api.get(`/tv/${id}`, {
      params: { append_to_response: 'credits' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching TV details:', error);
    throw error;
  }
};

export default api;
