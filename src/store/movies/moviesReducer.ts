import {createReducer, EntityState} from '@reduxjs/toolkit'
import {addMovies, initMoviesList, toggleFavored} from './moviesActions'
import {Movie, moviesAdapter} from './moviesModel'

export const moviesReducer = createReducer<EntityState<Movie>>(
    moviesAdapter.getInitialState(),
    (builder) => {
        builder
            .addCase(initMoviesList.fulfilled, (state, action) => {
                moviesAdapter.setAll(state, action.payload);
            })
            .addCase(addMovies.fulfilled, (state, action) => {
                moviesAdapter.addMany(state, action.payload);
            })
            .addCase(toggleFavored,(state,action)=>{
                moviesAdapter.updateOne(state,action.payload);
            })
    }
);