import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Movie, selectAllMovies} from '../../../store/movies/moviesModel';
import {useAppSelector} from '../../../store/hooks';
import {MoviesList} from '../../MoviesList/MoviesList';

export const WishlistScreenName:string = 'Wishlist';

export function WishlistScreen(props:any):ReactElement {
  const moviesList:Movie[] = useAppSelector(selectAllMovies);

  return (
    <View style={styles.root}>
      <MoviesList parentComponentId={props.componentId} moviesList={moviesList.filter((movie) => movie.favored)} />
    </View>
  );
}

WishlistScreen.options = {
  topBar:{
    title:{
      text:WishlistScreenName
    }
  },
  bottomTab:{
    text:WishlistScreenName
  }
};

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});
