import {ComponentProvider} from 'react-native';

export interface ScreenOptions {
  name:string;
  componentProvider:ComponentProvider;
  options?:any;
}
