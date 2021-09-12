import React, {ReactElement} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../../store/movies/moviesModel';
import MoviesApi from '../../common/MoviesApi/MoviesApi';

interface MovieCardProps {
  movie:Movie;
  movieClicked:(movieId:number) => void;
}

const MOVIE_CARD_PREFIX:string = 'MovieCard';

export const MovieCardTestIds = {
  container:`${MOVIE_CARD_PREFIX}:CONTAINER`,
  posterImage:`${MOVIE_CARD_PREFIX}:POSTER_IMAGE`
};

export function MovieCard({movie, movieClicked}:MovieCardProps):ReactElement {
  function moviePressed():void {
    movieClicked(movie.movieId);
  }

  return (
    <TouchableOpacity testID={MovieCardTestIds.container} style={styles.root} onPress={moviePressed}>
      <ImageBackground testID={MovieCardTestIds.posterImage} style={styles.backgroundImage} resizeMode="cover"
                       source={{uri:MoviesApi.getMovieImageUrl(movie.imageUrl)}}>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    margin:2,
    height:300,
    maxWidth:'49%'
  },
  backgroundImage:{
    flex:1
  }
});
