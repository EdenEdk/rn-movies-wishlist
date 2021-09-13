/*
  This is the class that defines your module.
  For full documentation, see here: https://bo.wix.com/one-app-engine-docs#/module-api
 */

// NOTICE - no imports in this file! Any external code is required on demand.

const PREFIX = 'edenfirstproject';
export default class EdenFirstProjectModule {
  // returns an array of components that your module provides
  // [{id: string, generator: () => Component, description: string}]
  components() {
    return [
      {
        id: `${PREFIX}.Home`,
        generator: () => require('./components/Screens/Home/Home').HomeScreen,
        description: 'Home Screen',
      }
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
}
