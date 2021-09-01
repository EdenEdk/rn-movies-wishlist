import React from 'react';
import HomeScreen from '../../components/Screens/Home/Home';
import {Navigation} from 'react-native-navigation';
import {ScreenOptions} from '../../model/Screens/Screen';
import {createComponentWithStore} from './StoreWrapper';
import MovieDetailsScreen, {MovieDetailsProps} from '../../components/Screens/MovieDetails/MovieDetails';
import WishlistScreen from '../../components/Screens/Wishlist/Wishlist';
import MovieDetails from '../../components/Screens/MovieDetails/MovieDetails';

type ScreensName = 'Home'|'MovieDetails'|'Wishlist';

export const ScreensDictionary: any = {
  Home: 'Home',
  MovieDetails: 'MovieDetails',
  Wishlist: 'Wishlist'
};

const ScreensMap: Map<ScreensName, ScreenOptions> = new Map(
  [
    [
      ScreensDictionary.Home,
      {
        name: ScreensDictionary.Home,
        options: {
          topBar: {
            title: {
              text: ScreensDictionary.Home
            }
          },
          bottomTab: {
            text: ScreensDictionary.Home
          }
        },
        component: createComponentWithStore(HomeScreen)
      }
    ],
    [
      ScreensDictionary.MovieDetails,
      {
        name: ScreensDictionary.MovieDetails,
        options: {
          topBar: {
            title: {
              text: ScreensDictionary.MovieDetails
            }
          }
        },
        component: createComponentWithStore<MovieDetailsProps>(MovieDetailsScreen)
      }
    ],
    [
      ScreensDictionary.Wishlist,
      {
        name: ScreensDictionary.Wishlist,
        options: {
          topBar: {
            title: {
              text: ScreensDictionary.Wishlist
            }
          },
          bottomTab: {
            text: ScreensDictionary.Wishlist
          }
        },
        component: createComponentWithStore(WishlistScreen)
      }
    ]
  ]
);

export function registerNavigatorScreens() {
  ScreensMap.forEach((screenOptions, componentName) => {
    Navigation.registerComponent(componentName,
      () => screenOptions.component);
  });
}

export function pushToNavigator(componentId: string, componentName: ScreensName, passProps?: any): void {
  const screenOptions: ScreenOptions = ScreensMap.get(componentName) as ScreenOptions;
  Navigation.push(componentId, {
    component: {
      name: screenOptions.name,
      id: screenOptions.name,
      options: screenOptions.options,
      passProps
    }
  });
}

export function updateScreenProps(componentName: string, newProps: any) {
  Navigation.updateProps(componentName, newProps);
}

export function initNavigator(): void {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    ...ScreensMap.get(ScreensDictionary.Home) as ScreenOptions
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    ...ScreensMap.get(ScreensDictionary.Wishlist) as ScreenOptions
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a'
    },
    topBar: {
      title: {
        color: 'white'
      },
      backButton: {
        color: 'white'
      },
      background: {
        color: '#4d089a'
      }
    },
    bottomTab: {
      fontSize: 20,
      selectedFontSize:20,
      selectedTextColor:'lightblue'
    }
  });
}
