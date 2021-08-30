import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import MoviesApi from '../../common/moviesApi/moviesApi';
import {converFavoredMovie, converRawMovie, Movie} from './moviesModel';

const MOVIES_PREFIX: string = 'movies';
const LOCAL_STORAGE_MOVIES_KEY: string = 'movies_wishlist';

function getWishlistArray(): number[] {
    const rawWishlist: string = localStorage.getItem(LOCAL_STORAGE_MOVIES_KEY) || '';
    return rawWishlist ? JSON.parse(rawWishlist) : [];
}

function updateLSFavoredList(movieId: number): void {
    const wishlist: number[] = getWishlistArray();
    const wishlistSet: Set<number> = new Set(wishlist);

    if (wishlistSet.has(movieId)) {
        wishlistSet.delete(movieId);
    }
    else {
        wishlistSet.add(movieId);
    }

    localStorage.setItem(LOCAL_STORAGE_MOVIES_KEY, JSON.stringify(Array.from(wishlistSet)));
}

export const toggleFavored = createAction(`${MOVIES_PREFIX}/setFavored`, function prepare(movie: Movie) {
    updateLSFavoredList(movie.movieId);
    return {
        payload: {
            id: movie.movieId,
            changes: {favored: !movie.favored}
        }
    };
});

export const initMoviesList = createAsyncThunk(
    `${MOVIES_PREFIX}/initMoviesList`,
    async function (_,{dispatch}): Promise<Movie[]> {
        const moviesWishlist: number [] = getWishlistArray();
        const wishlistList: any[] = await MoviesApi.getMoviesByIds(moviesWishlist);
        dispatch(addMovies());
        dispatch(addMovies());
        return wishlistList.map(converFavoredMovie);
    }
);

export const addMovies = createAsyncThunk(
    `${MOVIES_PREFIX}/addMovies`,
    async function (_, {getState}): Promise<Movie[]> {
        const {moviesPage} = getState() as any;
        const moviesList: any[] = await MoviesApi.getPopularMovies(moviesPage);
        return moviesList.map((movie: any) => {
            return converRawMovie(movie);
        });
    }
);