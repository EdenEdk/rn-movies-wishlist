import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {moviesReducer} from '../../store/movies/moviesReducer';
import {moviesPageReducer} from '../../store/moviesPage/moviesPageReducer';
import {render} from '@testing-library/react-native';

export function renderComponent(component){
  return render(component,{wrapper:TestComponent})
}

export function TestComponent({children}) {
  const store = configureStore({
    reducer:{
      movies:moviesReducer,
      moviesPage:moviesPageReducer
    }
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
