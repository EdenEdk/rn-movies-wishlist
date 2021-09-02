import {Navigation} from 'react-native-navigation';
import {initNavigator, registerNavigatorScreens} from './src/common/Navigation/NavigationManager';

registerNavigatorScreens();

Navigation.events().registerAppLaunchedListener(async() => {
  initNavigator();
});
