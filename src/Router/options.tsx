import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from 'shared/styles';
import FIcon from 'react-native-vector-icons/Feather';

export const commonScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.black,
  },
  headerStyle: {
    elevation: 0,
    backgroundColor: colors.white,
    shadowRadius: 0,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerBackTitle: null,
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <FIcon name="arrow-left" size={24} color={colors.black} />
  ),
  headerLeftContainerStyle: {
    paddingLeft: 16,
  },
};
