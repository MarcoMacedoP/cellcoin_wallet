import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import FIcon from 'react-native-vector-icons/Feather';
import {colors} from 'shared/styles';
import {BackButton} from 'shared/components/BackButton';

interface TransfersStackOptions {
  transfer: StackNavigationOptions;
  send: StackNavigationOptions;
  setAddress: StackNavigationOptions;
  address: StackNavigationOptions;
  recieve: StackNavigationOptions;
}

export const transfersStackOptions: TransfersStackOptions = {
  transfer: {
    title: 'Transfers',
    headerTransparent: true,
    headerLeft: BackButton,
  },
  address: {},
  recieve: {},
  send: {},
  setAddress: {},
};
