import React, {ReactElement, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {addMovies, initMoviesList} from '../../../store/movies/moviesActions';
import {Movie, selectAllMovies} from '../../../store/movies/moviesModel';
import {MoviesList} from '../../MoviesList/MoviesList';

const HomeScreenTitle:string = 'Home';
const HOME_SCREEN_PREFIX:string = 'HomeScreen';

export const HomeScreenTestIds = {
  container:`${HOME_SCREEN_PREFIX}:CONTAINER`
};

export function HomeScreen(props:any):ReactElement {
  const dispatch = useAppDispatch();
  const moviesList:Movie[] = useAppSelector(selectAllMovies);

  useEffect(() => {
    dispatch(initMoviesList());
  }, []);

  function loadMoreMovies():void {
    dispatch(addMovies());
  }

  return (
    <View testID={HomeScreenTestIds.container} style={styles.root}>
      <MoviesList parentComponentId={props.componentId} moviesList={moviesList} loadMoreMovies={loadMoreMovies} />
    </View>
  );
}

HomeScreen.options = {
  topBar:{
    title:{
      text:HomeScreenTitle
    }
  },
  bottomTab:{
    text:HomeScreenTitle
  }
};

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});

