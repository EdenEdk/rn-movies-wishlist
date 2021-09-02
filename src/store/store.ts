import {configureStore} from '@reduxjs/toolkit'
import {moviesReducer} from './movies/moviesReducer'
import {searchReducer} from './search/searchReducer';
import {moviesPageReducer} from './moviesPage/moviesPageReducer';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        searchWord: searchReducer,
        moviesPage: moviesPageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;