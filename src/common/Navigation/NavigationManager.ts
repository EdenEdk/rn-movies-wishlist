import {ComponentType} from 'react';
import {Navigation} from 'react-native-navigation';
import {createComponentWithStore} from './StoreWrapper';
import {HomeScreen, HomeScreenName} from '../../components/Screens/Home/Home';
import {
  MovieDetailsProps,
  MovieDetailsScreen,
  MovieDetailsScreenName
} from '../../components/Screens/MovieDetails/MovieDetails';
import {WishlistScreen, WishlistScreenName} from '../../components/Screens/Wishlist/Wishlist';

const ScreensMap:Map<string, ComponentType> = new Map(
  [
    [HomeScreenName, createComponentWithStore(HomeScreen)],
    [MovieDetailsScreenName, createComponentWithStore<MovieDetailsProps>(MovieDetailsScreen)],
    [WishlistScreenName, createComponentWithStore(WishlistScreen)]
  ]
);

export function registerNavigatorScreens() {
  ScreensMap.forEach((componentType, componentName) => {
    Navigation.registerComponent(componentName, () => componentType);
  });
}

export function pushToNavigator(componentId:string, componentName:string, passProps?:any):void {
  Navigation.push(componentId, {
    component:{
      name:componentName,
      id:componentName,
      passProps
    }
  });
}

export function initNavigator():void {
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
    },
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
                    name:HomeScreenName
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
                    name:WishlistScreenName
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
