import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import MovieCard from '../MovieCard/MovieCard';
import {Movie} from '../../store/movies/moviesModel';
import {pushToNavigator, ScreensDictionary} from '../../common/Navigation/NavigationManager';

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
    pushToNavigator(parentComponentId, ScreensDictionary.MovieDetails, {movie});
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
      <TextInput value={searchWord} onChangeText={setSearchWord} placeholder={'Search a Movie'} />
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
  }
});

export default MovieList;
