import {Navigation} from 'react-native-navigation';
import NavigationManager from './src/common/Navigation/NavigationManager';

NavigationManager.registerNavigatorScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  NavigationManager.initNavigator();
});
