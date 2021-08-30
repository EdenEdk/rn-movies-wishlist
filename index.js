import {Navigation} from 'react-native-navigation';
import {registerNavigatorScreens, ScreensDictionary, initNavigator} from './src/common/Navigation/NavigationManager';

registerNavigatorScreens();

Navigation.events().registerAppLaunchedListener(() => {
  initNavigator(ScreensDictionary.Home);
});
