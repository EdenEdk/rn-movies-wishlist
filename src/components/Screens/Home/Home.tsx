import React, {ReactElement, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MoviesList from '../../MoviesList/MoviesList';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {addMovies, initMoviesList} from '../../../store/movies/moviesActions';
import {Movie, selectAllMovies} from '../../../store/movies/moviesModel';

function HomeScreen(props:any):ReactElement {
  const dispatch = useAppDispatch();
  const moviesList:Movie[] = useAppSelector(selectAllMovies);

  useEffect(() => {
    dispatch(initMoviesList());
  }, []);

  function loadMoreMovies():void {
    dispatch(addMovies());
  }

  return (
    <View style={styles.root}>
      <MoviesList parentComponentId={props.componentId} moviesList={moviesList} loadMoreMovies={loadMoreMovies} />
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});

export default HomeScreen;
