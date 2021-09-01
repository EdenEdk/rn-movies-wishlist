import React, {ReactElement, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MoviesList from '../../MoviesList/MoviesList';
import {Movie, selectAllMovies} from '../../../store/movies/moviesModel';
import {useAppSelector} from '../../../store/hooks';

function WishlistScreen(props:any):ReactElement {
  const moviesList:Movie[] = useAppSelector(selectAllMovies);

  return (
    <View style={styles.root}>
      <MoviesList parentComponentId={props.componentId} moviesList={moviesList.filter((movie) => movie.favored)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});

export default WishlistScreen;
