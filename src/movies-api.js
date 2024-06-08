import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const key = '5a4235d577967caf8b078da8c716bc77';

export const getTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${key}`);
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?api_key=${key}`);
  return response.data;
};

export const getMoviesByName = async (movieName) => {
  const response = await axios.get(`/search/movie?api_key=${key}&query=${movieName}&page=1&language=en-US`)
  return response.data
}

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits?api_key=${key}`);
  return response.data;
}

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews?api_key=${key}`);
  return response.data;
}