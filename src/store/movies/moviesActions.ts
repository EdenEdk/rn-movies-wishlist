import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {converFavoredMovie, converRawMovie, Movie} from './moviesModel';
import MoviesApi from '../../common/MoviesApi/MoviesApi';
import StorageManager from '../../common/AsyncStorage/AsyncStorage';

const MOVIES_PREFIX:string = 'movies';
const LOCAL_STORAGE_MOVIES_KEY:string = 'movies_wishlist';

async function getWishlistArray():Promise<number[]> {
  const rawWishlist:string = await StorageManager.getData(LOCAL_STORAGE_MOVIES_KEY) || '';
  return rawWishlist ? JSON.parse(rawWishlist) : [];
}

async function updateLSFavoredList(movieId:number):Promise<void> {
  const wishlist:number[] = await getWishlistArray();
  const wishlistSet:Set<number> = new Set(wishlist);

  if (wishlistSet.has(movieId)) {
    wishlistSet.delete(movieId);
  }
  else {
    wishlistSet.add(movieId);
  }
  StorageManager.setData(LOCAL_STORAGE_MOVIES_KEY, Array.from(wishlistSet));
}

export const toggleFavored = createAction(`${MOVIES_PREFIX}/setFavored`, function prepare(movie:Movie) {
  updateLSFavoredList(movie.movieId);
  return {
    payload:{
      id:movie.movieId,
      changes:{favored:!movie.favored}
    }
  };
});

export const initMoviesList = createAsyncThunk(
  `${MOVIES_PREFIX}/initMoviesList`,
  async function(_, {dispatch}):Promise<Movie[]> {
    const moviesWishlist:number [] = await getWishlistArray();
    let wishlistList:any[] = [];
    if (moviesWishlist.length) {
      wishlistList = await MoviesApi.getMoviesByIds(moviesWishlist);
    }
    dispatch(addMovies());
    dispatch(addMovies());
    return wishlistList.map(converFavoredMovie);
  }
);

export const addMovies = createAsyncThunk(
  `${MOVIES_PREFIX}/addMovies`,
  async function(_, {getState}):Promise<Movie[]> {
    const {moviesPage} = getState() as any;
    const moviesList:any[] = await MoviesApi.getPopularMovies(moviesPage);
    return moviesList.map((movie:any) => {
      return converRawMovie(movie);
    });
  }
);
