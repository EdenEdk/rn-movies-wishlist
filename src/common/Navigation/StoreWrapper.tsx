import React, {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {store} from '../../store/store';
import {NavigationFunctionComponent} from 'react-native-navigation';

export function createComponentWithStore<T>(WrappedComponent: NavigationFunctionComponent<T>): ComponentType {
  const componentContainer = (props:any)=>{
    return (
      <Provider store={store}>
        <WrappedComponent {...props}/>
      </Provider>
    );
  }
  componentContainer.options = WrappedComponent.options;
  return componentContainer;
}
