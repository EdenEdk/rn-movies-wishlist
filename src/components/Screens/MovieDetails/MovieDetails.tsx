import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function MovieDetailsScreen(props:any):ReactElement {
  return (
    <View style={styles.root}>
      <Text>MovieDetailsScreen Counter:{props.counter}</Text>
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

export default MovieDetailsScreen;
