import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors, spacings} from 'shared/styles';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import {IconContainer} from 'shared/styled-components';
import {Image} from 'react-native';
const logoImage = require('assets/icons/logo_mini.png');

interface RootRouterOptions {
  balance: ({navigation}: {navigation: any}) => StackNavigationOptions;
  transfer: StackNavigationOptions;
  send: StackNavigationOptions;
  setAddress: StackNavigationOptions;
  address: StackNavigationOptions;
  recieve: StackNavigationOptions;
  mainAdressSelector: StackNavigationOptions;
  createWalletRoutes: StackNavigationOptions;
}
const headerContainerStyles = {
  headerLeftContainerStyle: {
    paddingHorizontal: spacings.right,
  },
  headerRightContainerStyle: {
    paddingHorizontal: spacings.right,
  },
};
export const rootRouterOptions: RootRouterOptions = {
  balance: ({navigation}) => ({
    title: 'AgaveCoin',
    headerTitleAlign: 'center',
    headerTransparent: true,
    ...headerContainerStyles,
    headerLeft: () => (
      <IconContainer onPress={() => navigation.navigate('Notifications')}>
        <MIcon
          name="ios-notifications-outline"
          size={24}
          color={colors.white}
        />
      </IconContainer>
    ),
    headerRight: () => (
      <IconContainer onPress={() => navigation.navigate('MainAddressSelector')}>
        <SimpleIcon name="wallet" size={18} color={colors.white} />
      </IconContainer>
    ),
    headerTitle: () => (
      <Image
        source={logoImage}
        resizeMode="contain"
        resizeMethod="scale"
        style={{
          marginVertical: 0,
          marginHorizontal: 'auto',
          width: 110,
        }}
      />
    ),
  }),
  mainAdressSelector: {
    headerTransparent: false,
    headerStyle: {
      backgroundColor: colors.lightGray,
    },
    headerTitleAlign: 'center',
    title: 'Select your wallet',
    ...headerContainerStyles,
  },

  transfer: {
    title: 'Transfers',
    headerTransparent: true,
  },
  address: {},
  recieve: {},
  send: {},
  setAddress: {},
  createWalletRoutes: {
    headerShown: false,
  },
};
export const commonScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
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
