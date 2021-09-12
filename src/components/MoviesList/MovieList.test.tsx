import React from 'react';
import {Movie} from '../../store/movies/moviesModel';
import {fireEvent, render, RenderAPI, waitFor} from '@testing-library/react-native';
import {MoviesList, MoviesListTestIds} from './MoviesList';
import NavigationManager from '../../common/Navigation/NavigationManager';
import {MovieCardTestIds} from '../MovieCard/MovieCard';
import {MovieDetailsScreenName} from '../Screens/MovieDetails/MovieDetails';
import {Keyboard} from 'react-native';


describe('MoviesList', () => {
  describe('Display', () => {
    it('should display the movies list components', async () => {
      const {getByTestId} = await waitFor(() => renderMoviesList('', []));
      expect(getByTestId(MoviesListTestIds.container)).toBeTruthy();
      expect(getByTestId(MoviesListTestIds.searchBox)).toBeTruthy();
      expect(getByTestId(MoviesListTestIds.list)).toBeTruthy();
    });


    it('should display 3 items in the movies list', async () => {
      const moviesList:any[] = [
        {movieId:1}, {movieId:2}, {movieId:3}
      ];
      const {getAllByTestId} = await waitFor(() => renderMoviesList('', moviesList));
      const movieCardContainers = getAllByTestId(MovieCardTestIds.container);
      expect(movieCardContainers).toHaveLength(moviesList.length);
    });
  });

  describe('Movie Press', () => {
    let pushToNavigatorMock;
    beforeAll(() => {
      pushToNavigatorMock = jest.spyOn(NavigationManager, 'pushToNavigator').mockImplementation(jest.fn);
      jest.spyOn(Keyboard, 'dismiss').mockImplementation(jest.fn);
    });

    it('should call Navigator.push when clicking a movie', async () => {
      const parentComponentId:string = 'component1';
      const movieId:number = 1;
      const moviesList:any[] = [{movieId}];
      const {getByTestId} = await waitFor(() => renderMoviesList(parentComponentId, moviesList));
      const movieContainer = getByTestId(MovieCardTestIds.container);
      fireEvent.press(movieContainer);
      expect(pushToNavigatorMock).toHaveBeenCalledWith(parentComponentId, MovieDetailsScreenName, {movieId});
    });
  });

  describe('SearchBox', () => {
    it('should leave only 1 movie in the movies list after the search box filter', async () => {
      const moviesListMock:any[] = [
        {movieId:1, title:'MOVIE1'},
        {movieId:2, title:'MOVIE2'}
      ];
      const searchText:string = 'MOVIE1';
      const {getByTestId, getAllByTestId} = await waitFor(() => renderMoviesList('', moviesListMock));
      const searchBox = getByTestId(MoviesListTestIds.searchBox);
      const movieCardsBeforeFilter = getAllByTestId(MovieCardTestIds.container);
      expect(movieCardsBeforeFilter).toHaveLength(moviesListMock.length);
      fireEvent.changeText(searchBox, searchText);
      const movieCardsAfterFilter = getAllByTestId(MovieCardTestIds.container);
      expect(movieCardsAfterFilter).toHaveLength(1);
    });

    it('should clear the search box after pressing a movie', async () => {
      const moviesList:any[] = [
        {movieId:1, title:'MOVIE1'},
        {movieId:2, title:'MOVIE2'}
      ];
      const searchText:string = 'MOVIE1';
      const {getByTestId} = await waitFor(() => renderMoviesList('', moviesList));
      const searchBox = getByTestId(MoviesListTestIds.searchBox);
      fireEvent.changeText(searchBox, searchText);
      expect(searchBox.props.value).toBe(searchText);
      const movieContainer = getByTestId(MovieCardTestIds.container);
      fireEvent.press(movieContainer);
      expect(searchBox.props.value).toBe('');
    });
  });
});

function renderMoviesList(parentComponentId:string, moviesList:Movie[], loadMore?:() => void):RenderAPI {
  return render(<MoviesList parentComponentId={parentComponentId} moviesList={moviesList} />);
}
