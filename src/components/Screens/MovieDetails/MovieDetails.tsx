import React, {ReactElement} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../../../store/movies/moviesModel';
import MoviesApi from '../../../common/MoviesApi/MoviesApi';
import {useAppDispatch} from '../../../store/hooks';
import {toggleFavored} from '../../../store/movies/moviesActions';

export interface MovieDetailsProps {
  movie:Movie;
}

function MovieDetailsScreen({movie}:MovieDetailsProps):ReactElement {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.root}>
      <View style={styles.movieHeader}>
        <Image style={styles.movieImage} source={{uri:MoviesApi.getMovieImageUrl(movie.imageUrl)}} />
        <View style={styles.movieTitleContainer}>
          <Text style={styles.movieTitle} testID={'moviedetailsscreen:text:movie_title'}>{movie.title}</Text>
          <View style={styles.movieActions}>
            <Button title={'youtube'} onPress={() => {
              MoviesApi.searchTrailerOnYoutube(movie.title);
            }} />
            <Button title={'favorites'} onPress={() => {
              dispatch(toggleFavored(movie));
            }} />
          </View>
        </View>
      </View>
      <ScrollView style={styles.movieDescriptionContainer} contentContainerStyle={{paddingTop:10, paddingBottom:10}}>
        <Text style={styles.movieDescription}>{movie.overview}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    padding:20
  },
  movieHeader:{
    height:'40%',
    flexDirection:'row'
  },
  movieImage:{
    width:'40%'
  },
  movieTitleContainer:{
    flex:1,
    padding:10,
    justifyContent:'space-between'
  },
  movieTitle:{
    fontSize:24,
    textAlign:'center',
    fontWeight:'bold'
  },
  movieActions:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  movieDescriptionContainer:{
    flex:1,
    marginTop:10,
    borderRadius:5,
    backgroundColor:'aliceblue'
  },
  movieDescription:{
    fontSize:20,
    fontWeight:'300',
    textAlign:'center'
  }
});

export default MovieDetailsScreen;
