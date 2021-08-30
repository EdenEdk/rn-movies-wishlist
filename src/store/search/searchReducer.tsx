import {createReducer} from '@reduxjs/toolkit';
import {updateSearchWord} from './searchActions';

export const searchReducer = createReducer<string>(
    '',
    (builder) => {
        builder
            .addCase(updateSearchWord, (state, action) => {
                return action.payload;
            })
    }
);