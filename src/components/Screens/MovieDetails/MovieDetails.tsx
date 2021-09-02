import React, {ReactElement} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Movie, selectMovieById} from '../../../store/movies/moviesModel';
import MoviesApi from '../../../common/MoviesApi/MoviesApi';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {toggleFavored} from '../../../store/movies/moviesActions';
import {NavigationComponentProps} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export const MovieDetailsScreenName:string = 'MovieDetails';

export interface MovieDetailsProps extends NavigationComponentProps {
  movieId:number;
}

export function MovieDetailsScreen({movieId}:MovieDetailsProps):ReactElement {
  const dispatch = useAppDispatch();
  const movie:Movie = useAppSelector((state) => selectMovieById(state, movieId)) as Movie;

  return (
    <View style={styles.root}>
      <View style={styles.movieHeader}>
        <Image style={styles.movieImage} source={{uri:MoviesApi.getMovieImageUrl(movie.imageUrl)}} />
        <View style={styles.movieTitleContainer}>
          <Text style={styles.movieTitle} testID={'moviedetailsscreen:text:movie_title'}>{movie.title}</Text>
          <View style={styles.movieActions}>
            <Icon.Button
              name="youtube"
              backgroundColor="#FF0000" onPress={() => {
              MoviesApi.searchTrailerOnYoutube(movie.title);
            }}>
              Watch Trailer
            </Icon.Button>
            <Icon name="star" size={35} color={movie.favored ? '#f3c73a' : 'gray'} onPress={() => {
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

MovieDetailsScreen.options = {
  topBar:{
    title:{
      text:MovieDetailsScreenName
    }
  }
};

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
    backgroundColor:'#e2e2e2'
  },
  movieDescription:{
    fontSize:20,
    fontWeight:'300',
    textAlign:'center'
  }
});
