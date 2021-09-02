import {createEntityAdapter} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface Movie {
    movieId: number; //id
    title: string; //title
    originalTitle: string; //originalTitle
    overview: string //overview
    imageUrl: string; //poster_path
    popularity: number; //popularity
    rating: number; //vote_average
    favored?: boolean;
}

export function converFavoredMovie(rawMovie: any): Movie {
    return converRawMovie(rawMovie, true);
}

export function converRawMovie(rawMovie: any, favored=false): Movie {
    return {
        movieId: rawMovie.id,
        title: rawMovie.title,
        originalTitle: rawMovie.originalTitle,
        overview: rawMovie.overview,
        imageUrl: rawMovie.poster_path,
        popularity: rawMovie.popularity,
        rating: rawMovie.vote_average,
        favored
    };
}

export const moviesAdapter = createEntityAdapter<Movie>({
    selectId: (movie) => movie.movieId,
    sortComparer: (a: Movie, b: Movie) => {
        return b.popularity - a.popularity
    }
});

export const {selectAll: selectAllMovies, selectById:selectMovieById} = moviesAdapter.getSelectors((state: RootState) => state.movies);
