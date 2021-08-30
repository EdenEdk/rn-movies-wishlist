import React, {ReactElement, useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {pushToNavigator, ScreensDictionary, updateScreenProps} from '../../../common/Navigation/NavigationManager';

function HomeScreen(props: any):ReactElement {
  function openMovieDetails() {
    pushToNavigator(props.componentId, ScreensDictionary.MovieDetails, );
  }

  return (
    <View style={styles.root}>
      <Text testID={'home-screen-text'}>HomeScreen</Text>
      <Button title={'Open Movie Details'} onPress={openMovieDetails} />
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

export default HomeScreen;
