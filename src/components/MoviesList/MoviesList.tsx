import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import {Movie} from '../../store/movies/moviesModel';
import {MovieCard} from '../MovieCard/MovieCard';
import NavigationManager from '../../common/Navigation/NavigationManager';
import {MovieDetailsScreenName} from '../Screens/MovieDetails/MovieDetails';

interface MoviesListProps {
  parentComponentId:string;
  moviesList:Movie[];
  loadMoreMovies?:() => void;
}

const MOVIES_LIST_PREFIX:string = 'MoviesList';

export const MoviesListTestIds = {
  container:`${MOVIES_LIST_PREFIX}:CONTAINER`,
  searchBox:`${MOVIES_LIST_PREFIX}:SEARCH_BOX`,
  list:`${MOVIES_LIST_PREFIX}:LIST`
};

export function MoviesList({parentComponentId, moviesList, loadMoreMovies}:MoviesListProps):ReactElement {
  const [searchWord, setSearchWord] = useState('');
  const [filteredMoviesList, setFilteredMoviesList] = useState<Movie[]>([]);

  useEffect(() => {
    filterMoviesList();
  }, [moviesList, searchWord]);


  function openMovieDetails(movieId:number):void {
    setSearchWord('');
    Keyboard.dismiss();
    NavigationManager.pushToNavigator(parentComponentId, MovieDetailsScreenName, {movieId});
  }

  function renderListItem({item}):ReactElement {
    return <MovieCard movie={item} movieClicked={openMovieDetails} />;
  }

  function filterMoviesList():void {
    const lowerCaseSearchText:string = searchWord.toLowerCase();
    const filteredList:Movie[] = lowerCaseSearchText ?
      moviesList.filter((movie) => {
        return movie.title.toLowerCase().startsWith(lowerCaseSearchText);
      }) : moviesList;
    setFilteredMoviesList(filteredList);
  }

  return (
    <View testID={MoviesListTestIds.container} style={styles.root}>
      <TextInput testID={MoviesListTestIds.searchBox} style={styles.searchBox} value={searchWord}
                 onChangeText={setSearchWord} placeholder={'Search a Movie'} />
      <FlatList
        testID={MoviesListTestIds.list}
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
