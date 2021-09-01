import React, {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {store} from '../../store/store';

export function createComponentWithStore<T>(WrappedComponent: ComponentType<T>): ComponentType {
  const componentContainer = (props:any)=>{
    return (
      <Provider store={store}>
        <WrappedComponent {...props}/>
      </Provider>
    );
  }
  return componentContainer;
}
