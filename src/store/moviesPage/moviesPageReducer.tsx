import {createReducer} from '@reduxjs/toolkit'
import {addMovies} from '../movies/moviesActions';

export const moviesPageReducer = createReducer<number>(
    0,
    (builder) => {
        builder
            .addCase(addMovies.pending, (state, action) => {
                return state+1;
            })
    }
);