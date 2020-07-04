import {Dimensions} from 'react-native';

export type Color =
  | 'primary'
  | 'primaryLigth'
  | 'primaryDark'
  | 'white'
  | 'blackLigth'
  | 'black'
  | 'success'
  | 'whiteDark'
  | 'accent';

export const colors = {
  primary: '#3E79F8',
  primaryLigth: '#DA7220',
  primaryDark: '#2330d7',
  accent: '#DA7220',
  accentLight: '#EEF6FF',
  white: '#ffffff',
  whiteDark: '#eceff1',
  black: '#575555',
  blackLigth: '#c9c5c5',
  blackTransparent: 'rgba(0,0,0,0.8)',
  blackTransparentLight: 'rgba(0,0,0,0.3)',
  gray: '#cfd8dc',
  lightGray: '#eceff1',
  error: 'rgba(221, 44, 0, 0.87)',
  success: '#4BB543',
};

export const borderRadius = (percentage: number) =>
  `${(Dimensions.get('window').width * percentage) / 100}px`;
