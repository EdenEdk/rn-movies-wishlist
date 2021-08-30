import {createAction} from '@reduxjs/toolkit';

const SEARCH_PREFIX: string = 'search';

export const updateSearchWord = createAction<string>(`${SEARCH_PREFIX}/updateSearchWord`);