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
  primary: '#FF8000',
  primaryLigth: '#FEB037',
  primaryDark: '#2330d7',
  accent: '#FEB037',
  accentLight: '#E1E5E9',
  white: '#FFFFFF',
  whiteDark: '#E6E9EF',
  black: '#272727',
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
