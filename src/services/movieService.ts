import axios from "axios";
import type { Movie } from "../types/movie"

const myKey = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3/search/movie"

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  try {
    const response = await axios.get<MoviesResponse>(BASE_URL, {
      params: {
        query: query,
        language: 'uk-UA',
        include_adult: false,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
        accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Помилка при запиті до TMDb:', error);
    throw error;
  }
}