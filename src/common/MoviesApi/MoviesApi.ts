import axios, {AxiosResponse} from 'axios';
import {Linking} from 'react-native';

const language:string = 'en_US';
const region:string = 'IL';
const api_key:string = '40ab4b29399a2e3f961acf68acc457e8';
const baseUrl:string = 'https://api.themoviedb.org/3/movie';
const MOVIE_POSTER_BASE_URL:string = 'https://image.tmdb.org/t/p/w185';
const YOUTUBE_SEARCH:string = 'https://www.youtube.com/results?search_query=';

async function getPopularMovies(page:number = 1):Promise<any[]> {
  const params = {api_key, language, page, region};
  const axiosAnswer:AxiosResponse<any> = await axios.get(`${baseUrl}/popular`, {params});
  return axiosAnswer.data.results;
}

async function getMoviesByIds(moviesIds:number[]):Promise<any[]> {
  const params = {api_key, language};
  const moviesRequests:Promise<any>[] = moviesIds.map((movieId:number) => axios.get(`${baseUrl}/${movieId}`, {params}));
  const axiosAnswers:AxiosResponse<any>[] = await Promise.all<AxiosResponse<any>>(moviesRequests);
  return axiosAnswers.map((answer:AxiosResponse<any>) => answer.data);
}

function getMovieImageUrl(imageUrl:string):string {
  return MOVIE_POSTER_BASE_URL + imageUrl;
}

function searchTrailerOnYoutube(movieTitle:string):void {
  Linking.openURL(`${YOUTUBE_SEARCH}${movieTitle} Trailer`);
}

const MoviesApi = {getPopularMovies, getMoviesByIds, getMovieImageUrl, searchTrailerOnYoutube};
export default MoviesApi;
