import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import MovieCard from '../MovieCard/MovieCard';
import {Movie} from '../../store/movies/moviesModel';
import {pushToNavigator} from '../../common/Navigation/NavigationManager';
import {MovieDetailsScreenName} from '../Screens/MovieDetails/MovieDetails';

interface MoviesListProps {
  parentComponentId:string;
  moviesList:Movie[];
  loadMoreMovies?:() => void;

}

function MovieList({parentComponentId, moviesList, loadMoreMovies}:MoviesListProps):ReactElement {
  const [searchWord, setSearchWord] = useState('');
  const [filteredMoviesList, setFilteredMoviesList] = useState<Movie[]>([]);

  useEffect(() => {
    filterMoviesList();
  }, [moviesList, searchWord]);


  function openMovieDetails(movie:Movie):void {
    setSearchWord('');
    Keyboard.dismiss();
    pushToNavigator(parentComponentId, MovieDetailsScreenName, {movieId:movie.movieId});
  }

  function renderListItem({item}):ReactElement {
    return <MovieCard movie={item} movieClicked={(movie) => openMovieDetails(movie)} />;
  }

  function filterMoviesList():void {
    const lowerCaseSearchText:string = searchWord;
    const filteredList:Movie[] = lowerCaseSearchText ?
      moviesList.filter((movie) => {
        return movie.title.toLowerCase().startsWith(lowerCaseSearchText);
      }) : moviesList;
    setFilteredMoviesList(filteredList);
  }

  return (
    <View style={styles.root}>
      <TextInput style={styles.searchBox} value={searchWord} onChangeText={setSearchWord} placeholder={'Search a Movie'} />
      <FlatList
        keyboardShouldPersistTaps={'always'}
        numColumns={2}
        keyExtractor={(item:Movie) => item.movieId.toString()}
        data={filteredMoviesList}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={2}
        renderItem={renderListItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1
  },
  searchBox:{
    paddingLeft:10,
    backgroundColor:'#e2e2e2',
    borderWidth:1,
    borderColor:'#bdbdbd'
  }
});

export default MovieList;
