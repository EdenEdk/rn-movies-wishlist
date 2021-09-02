import React, {ReactElement} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../../store/movies/moviesModel';
import MoviesApi from '../../common/MoviesApi/MoviesApi';


interface MovieCardProps {
  movie:Movie;
  movieClicked:(movie:Movie) => void;
}

function MovieCard({movie, movieClicked}:MovieCardProps):ReactElement {
  return (
    <TouchableOpacity style={styles.root} onPress={() => movieClicked(movie)}>
      <ImageBackground style={styles.backgroundImage} resizeMode="cover"
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

export default MovieCard;
