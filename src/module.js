/*
  This is the class that defines your module.
  For full documentation, see here: https://bo.wix.com/one-app-engine-docs#/module-api
 */

// NOTICE - no imports in this file! Any external code is required on demand.

import {createComponentWithStore} from './common/Navigation/StoreWrapper';
import {PREFIX, Screens} from './components/Screens/Screens';
import {Assets} from '@wix/wix-react-native-ui-lib';

export default class EdenFirstProjectModule {
  // returns an array of components that your module provides
  // [{id: string, generator: () => Component, description: string}]
  components() {
    return [
      {
        id: Screens.Home,
        generator: () => createComponentWithStore(require('./components/Screens/Home/Home').HomeScreen),
        description: 'Home Screen',
      },
      {
        id: Screens.MovieDetails,
        generator: () => createComponentWithStore(require('./components/Screens/MovieDetails/MovieDetails').MovieDetailsScreen),
        description: 'Movie Details Screen',
      },
      {
        id: Screens.Wishlist,
        generator: () => createComponentWithStore(require('./components/Screens/Wishlist/Wishlist').WishlistScreen),
        description: 'Wishlist Screen',
      },
    ];
  }

  // returns an array of methods that your module provides
  // [{id: string, generator: () => function, description: string}]
  methods() {
    return [];
  }

  // returns a string that will be used as a prefix for your module's exports
  prefix() {
    return PREFIX;
  }

/*  consumedServices() {
    const homeScreen = {
      id: 'homeScreen',
      label: 'Home',
      description: 'Home Screen',
      screenId: Screens.Home,
      testID: `wix.${PREFIX}.HOME_SCREEN`,
      icon: Assets.icons.general.search,
      dashboardIcon: Assets.icons.apps.search,
      dashboardLargeIcon: Assets.icons.apps.search,
    };
    return {
      managerApps: (business) => {
        let managerApps = [];
        if (engine.state.businesses.isServiceActiveForBusinessId(business.id, orders)) {
          managerApps.push(homeScreen);
        }
        return managerApps;
      },
    };
  }*/

  tabs() {
    return [
      {
        id: 'homeTab', // this should match the tab id in the package.json oneAppEngine section
        label: 'Home',
        biLabel: 'Home',
        screen: Screens.Home,
        title: 'HOME',
        testID: `wix.${PREFIX}.HOME_TAB`,
      },
      {
        id: 'wishlistTab', // this should match the tab id in the package.json oneAppEngine section
        label: 'Wishlist',
        biLabel: 'Wishlist',
        screen: Screens.Wishlist,
        title: 'WISHLIST',
        testID: `wix.${PREFIX}.WISHLIST_TAB`,
      },
    ];
  }
}
