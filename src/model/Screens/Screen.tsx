import {ComponentType} from 'react';

export interface ScreenOptions {
  name:string;
  component:ComponentType;
  options?:any;
}
