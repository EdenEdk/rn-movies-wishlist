/*
  This is a module that will only be used inside your example project
  This will be used to mock interactions with the app that will happen outside the
  scope of your module, and to display data or whatever else you wish to be able
  to do or see when developing and testing your module, but not in the full app.
  For full documentation of the API, see here: https://bo.wix.com/one-app-engine-docs#/module-api
 */

import {Assets} from '@wix/wix-react-native-ui-lib';

export default class ExampleModule {

  // This initializes the login-state.
  // It is only allowed here because this is demo module. Real modules must not have an
  // inits here what-so-ever.
  __unsafe__initializeDemoModule() {
    const mockTools = require('wix-one-app-engine/lib/MockTools');

    const mockMode = mockTools.getLoginMode();
    //provide the mock data depending on what mock level the packager is running at
    switch (mockMode) {
      case 'quickLogin':
        // Takes configuration from file: one-app-engine.private.js
        mockTools.setLoginData({
          loginCredentials: {
            email: "woarest@test.com",
            password: "qqqq"
            // email: "dk2019@test.com",
            // password: "q2w3e4r5"
            // email: "restswoa1@test.com",
            // password: "restswoa11"
            // email: "woarestqa@test.com",
            // password: "bUbUtH3k!nG"
          }
        });
        break;
      case 'offline':
        // Should be set in e2e tests
        break;

      default:
        console.warn('Unhandled mock Mode: ' + mockMode);
    }
  }

  // returns an array of components that your example module provides
  // [{id: string, generator: () => Component, description: string}]
  components(){
    return [
      {
        id: 'demo.DemoTab',
        generator: () => require('./DemoTab').DemoTab,
        description: 'A demo tab used in the example project'
      }
    ];
  }

  // returns an array of methods that your example module provides
  // [{id: string, generator: () => function, description: string}]
  methods(){
    return [];
  }

  // returns a string that will be used as a prefix for your example module's exports
  prefix() {
    return 'demo';
  }

  // will be called whenever the app's state is changed with the new state
  onAppStateChanged(appState) {

  }

  // should return the tabs the example module wishes to display for a given app state
  tabs() {
    return [{
      id: 'demoTab', // this should match the tab id in the package.json oneAppEngine section
      label: 'DEMO',
      biLabel: 'demo',
      screen: 'demo.DemoTab',
      icon: Assets.icons.general.settings,
      selectedIcon: Assets.icons.general.settings,
      title: 'DEMO',
      testID: 'wix.edenfirstproject.BOTTOM_TAB_DEMO'
    }];
  }
}
