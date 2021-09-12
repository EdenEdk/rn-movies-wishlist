import React from 'react';
import MoviesApi from '../../common/MoviesApi/MoviesApi';
import {fireEvent, render, RenderAPI, waitFor} from '@testing-library/react-native';
import {Movie} from '../../store/movies/moviesModel';
import {MovieCard, MovieCardTestIds} from './MovieCard';

describe('MovieCard', () => {
  const movieUrlPrefix:string = 'MOVIE_PREFIX';
  beforeAll(() => {
    jest.spyOn(MoviesApi, 'getMovieImageUrl').mockImplementation((imageUrl:string) => movieUrlPrefix + imageUrl);
  });

  it('should display the movie poster', async () => {
    const movieImageUrl:string = 'MOVIE_URL';
    const movieMock:any = {imageUrl:movieImageUrl};
    const {getByTestId} = await waitFor(() => renderMovieCard(movieMock));
    const moviePosterImage = getByTestId(MovieCardTestIds.posterImage);
    expect(moviePosterImage.props.source.uri).toBe(movieUrlPrefix + movieImageUrl);
  });

  it('should pass the movieId upon clicking the movie', async () => {
    const movieId:number = 1;
    const movieMock:any = {movieId};
    const movieClicked = jest.fn();
    const {getByTestId} = await waitFor(() => renderMovieCard(movieMock,movieClicked));
    const movieContainer = getByTestId(MovieCardTestIds.container);
    fireEvent.press(movieContainer);
    expect(movieClicked).toHaveBeenCalledWith(movieId);
  });
});

function renderMovieCard(movie:Movie,
  movieClicked:(movieId:number) => void = () => {
  }):RenderAPI {
  return render(<MovieCard movie={movie} movieClicked={movieClicked} />);
}
