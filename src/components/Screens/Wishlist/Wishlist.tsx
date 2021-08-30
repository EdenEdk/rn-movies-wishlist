import React, {ReactElement} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {pushToNavigator, ScreensDictionary} from '../../../common/Navigation/NavigationManager';

function WishlistScreen(props:any):ReactElement {
  function openMovieDetails() {
    pushToNavigator(props.componentId, ScreensDictionary.MovieDetails);
  }

  return (
    <View style={styles.root}>
      <Text>Wishlist Screen</Text>
      <Button title={'Open Movie Details'} onPress={openMovieDetails}/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default WishlistScreen;
