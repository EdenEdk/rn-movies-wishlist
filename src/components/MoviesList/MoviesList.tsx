import React, {ReactElement, useEffect, useRef, useState} from 'react';
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
  const [tempMovieIdToOpen, setTempMovieIdToOpen] = useState<number>();
  const ref = useRef(null);
  const [filteredMoviesList, setFilteredMoviesList] = useState<Movie[]>([]);

  useEffect(() => {
    filterMoviesList();
  }, [moviesList, searchWord]);

  function pushScreenAndHandleKeyboard():void {
    const textInputRef:any = ref.current;
    textInputRef.focus();
    textInputRef.blur();
    Keyboard.dismiss();
  }

  function openMovieDetails(movieId:number):void {
    setSearchWord('');
    setTempMovieIdToOpen(movieId);
    pushScreenAndHandleKeyboard();
  }

  function blurTextInput() {
    NavigationManager.pushToNavigator(parentComponentId, MovieDetailsScreenName, {movieId:tempMovieIdToOpen});
    setTempMovieIdToOpen(-1);
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
      <TextInput testID={MoviesListTestIds.searchBox}
                 ref={ref}
                 style={styles.searchBox}
                 onBlur={blurTextInput}
                 value={searchWord}
                 onChangeText={setSearchWord} placeholder={'Search a Movie'} />
      <FlatList
        testID={MoviesListTestIds.list}
        keyboardShouldPersistTaps={'handled'}
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
    minHeight:'7%',
    paddingLeft:10,
    backgroundColor:'#e2e2e2',
    borderWidth:1,
    borderColor:'#bdbdbd'
  }
});
