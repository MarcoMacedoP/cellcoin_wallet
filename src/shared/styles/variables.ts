import { Dimensions } from 'react-native';

export type Color = "primary" | "primaryLigth" | "primaryDark" | "white" | "blackLigth" | "black";

export const colors = {
  primary: '#2fa0a8',
  primaryLigth: '#50cdd5',
  primaryDark: '#2330d7',
  accent: '#05c2ae',
  accentLight: '#E2F9FB',
  white: '#ffffff',
  whiteDark: '#eceff1',
  black: '#575555',
  blackLigth: '#c9c5c5',
  blackTransparent: 'rgba(0,0,0,0.8)',
  blackTransparentLight: 'rgba(0,0,0,0.3)',
  gray: '#cfd8dc',
  lightGray: '#eceff1',
  error: 'rgba(221, 44, 0, 0.87)',
};

export const borderRadius = (percentage: number) =>
  `${(Dimensions.get('window').width * percentage) / 100}px`;
