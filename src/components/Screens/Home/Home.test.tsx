import React from 'react';
import {RenderAPI, waitFor} from '@testing-library/react-native';
import {renderComponent} from '../../../utils/tests/TestComponent';
import {HomeScreen, HomeScreenTestIds} from './Home';
import MoviesApi from '../../../common/MoviesApi/MoviesApi';
import StorageManager from '../../../common/AsyncStorage/AsyncStorage';
import {MoviesListTestIds} from '../../MoviesList/MoviesList';
import {MovieCardTestIds} from '../../MovieCard/MovieCard';

describe('HomeScreen', () => {
  beforeAll(() => {
    jest.spyOn(MoviesApi, 'getPopularMovies').mockResolvedValue([]);
    jest.spyOn(StorageManager, 'getData').mockResolvedValue('');
    jest.spyOn(StorageManager, 'setData');
  });

  it('should display the home screen', async () => {
    const {getByTestId} = await waitFor(() => renderHomeScreen());
    const container = getByTestId(HomeScreenTestIds.container);
    expect(container).toBeTruthy();
  });

  it('should display the movies list components', async () => {
    const {getByTestId} = await waitFor(() => renderHomeScreen());
    expect(getByTestId(MoviesListTestIds.container)).toBeTruthy();
    expect(getByTestId(MoviesListTestIds.searchBox)).toBeTruthy();
    expect(getByTestId(MoviesListTestIds.list)).toBeTruthy();
  });
});

function renderHomeScreen():RenderAPI {
  return renderComponent(<HomeScreen componentId={'comp1'} />);
}
