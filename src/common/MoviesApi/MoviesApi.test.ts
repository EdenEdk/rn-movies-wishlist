import axios from 'axios';
import MoviesApi from './MoviesApi';
import {Linking} from 'react-native';

describe('MoviesApi', () => {
  let axiosGetMock;
  beforeAll(() => {
    axiosGetMock = jest.spyOn(axios, 'get');
  });

  afterEach(()=> {
    axiosGetMock.mockClear();
  });

  describe('getPopularMovies', () => {
    const firstPage:number[] = [1, 2, 3];
    const secondPage:number[] = [4, 5, 6];
    const thirdPage:number[] = [7, 8, 9];
    const pages:number[][] = [firstPage, secondPage, thirdPage];
    beforeAll(() => {
      axiosGetMock.mockImplementation((url:string, config?:any) =>
        Promise.resolve({data:{results:pages[config.params.page - 1]}}));
    });

    it('should check that axios get has been called with the right page number', async () => {
      const pageNum:number = 1;
      await MoviesApi.getPopularMovies(pageNum);
      const [url, config] = axiosGetMock.mock.calls[0];
      expect(axiosGetMock).toHaveBeenCalled();
      expect(config.params.page).toBe(pageNum);
    });

    it('should return [1,2,3] as page 1 movies ids', async () => {
      const popularMovies = await MoviesApi.getPopularMovies(1);
      expect(popularMovies).toBe(firstPage);
    });

    it('should return [4,5,6] as page 1 movies ids', async () => {
      const popularMovies = await MoviesApi.getPopularMovies(2);
      expect(popularMovies).toBe(secondPage);
    });
  });

  describe('getMoviesByIds', () => {
    const moviesIds:number[] = [1, 2, 3];
    const movieData:any = {1:'Movie1', 2:'Movie2', 3:'Movie3'};
    beforeAll(() => {
      axiosGetMock.mockImplementation((url:string) => {
          const splitUrl:string[] = url.split('/');
          const movieId:number = +splitUrl[splitUrl.length - 1];
          return Promise.resolve({data:movieData[movieId]});
        }
      );
    });

    it('should check that axios.get has been called 3 times', () => {
      MoviesApi.getMoviesByIds(moviesIds);
      expect(axiosGetMock).toHaveBeenCalledTimes(3);
    });

    it('should return an array of strings containing movies data', async () => {
      const moviesData:any[] = await MoviesApi.getMoviesByIds(moviesIds);
      expect(moviesData.length).toBe(3);
      expect(moviesData[0]).toBe(movieData[1]);
      expect(moviesData[1]).toBe(movieData[2]);
      expect(moviesData[2]).toBe(movieData[3]);
    });
  });

  describe('getMovieImageUrl', () => {
    it('should check if the returned urlk contains the image url', () => {
      const testUrl:string = 'TEST_URL';
      expect(MoviesApi.getMovieImageUrl(testUrl)).toContain(testUrl);
    });
  });

  describe('searchTrailerOnYoutube', () => {
    const trailerSuffix:string = 'Trailer';
    let linkingMock;
    beforeAll(() => {
      linkingMock = jest.spyOn(Linking, 'openURL');
    });

    it('should check that the function only open the current url', () => {
      const url:string = 'VIDEO_URL';
      MoviesApi.searchTrailerOnYoutube(url);
      const callParams:string= linkingMock.mock.calls[0][0];
      expect(callParams.endsWith(`${url} ${trailerSuffix}`)).toBeTruthy();
    });
  });
});
