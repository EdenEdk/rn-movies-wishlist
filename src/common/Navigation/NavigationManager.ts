import {Navigation} from 'react-native-navigation';
import {createComponentWithStore} from './StoreWrapper';
import {HomeScreen} from '../../components/Screens/Home/Home';
import {MovieDetailsScreen} from '../../components/Screens/MovieDetails/MovieDetails';
import {WishlistScreen} from '../../components/Screens/Wishlist/Wishlist';
import {Screens} from '../../components/Screens/Screens';

const ScreensMap:Map<string, any> = new Map(
  [
    [Screens.Home, HomeScreen],
    [Screens.MovieDetails, MovieDetailsScreen],
    [Screens.Wishlist, WishlistScreen]
  ]
);

function registerNavigatorScreens() {
  ScreensMap.forEach((componentType, componentName) => {
    Navigation.registerComponent(componentName, () => createComponentWithStore(componentType));
  });
}

function pushToNavigator(componentId:string, componentName:string, passProps?:any):void {
  Navigation.push(componentId, {
    component:{
      name:componentName,
      id:componentName,
      passProps
    }
  });
}

function initNavigator():void {
  Navigation.setDefaultOptions({
    statusBar:{
      backgroundColor:'whitesmoke'
    },
    topBar:{
      title:{
        color:'black',
        alignment:'center'
      },
      backButton:{
        color:'black'
      },
      background:{
        color:'whitesmoke'
      }
    },
    bottomTabs:{
      elevation:1
    },
    bottomTab:{
      fontSize:20,
      selectedFontSize:20,
      selectedTextColor:'lightblue'
    }
  });

  Navigation.setRoot({
    root:{
      bottomTabs:{
        children:[
          {
            stack:{
              children:[
                {
                  component:{
                    name:Screens.Home
                  }
                }
              ]
            }
          },
          {
            stack:{
              children:[
                {
                  component:{
                    name:Screens.Wishlist
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
}

const NavigationManager = {registerNavigatorScreens, pushToNavigator, initNavigator};
export default NavigationManager;
