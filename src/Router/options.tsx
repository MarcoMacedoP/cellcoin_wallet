import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors, spacings} from 'shared/styles';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import {IconContainer} from 'shared/styled-components';
import {Image} from 'react-native';
import {CurrencyType} from 'shared/types';
import {AuthRootStackParams} from 'Router';
import {RouteProp} from '@react-navigation/core';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';

const logoImage = require('assets/icons/logo_mini.png');

type SetFeeDestinationToSend = (props: {
  route: RouteProp<AuthRootStackParams, 'SetFeeDestinationToSend'>;
}) => StackNavigationOptions;

interface RootRouterOptions {
  balance: ({navigation}: {navigation: any}) => StackNavigationOptions;
  transfer: (props: {
    route: RouteProp<AuthRootStackParams, 'Transfers'>;
  }) => StackNavigationOptions;
  setQuantityToSend: (props: {
    route: RouteProp<AuthRootStackParams, 'SetQuantityToSend'>;
  }) => StackNavigationOptions;
  setFeeDestinationToSend: SetFeeDestinationToSend;
  confirmTransactionToSend: StackNavigationOptions;
  contactList: StackNavigationOptions;
  setAddress: StackNavigationOptions;
  address: StackNavigationOptions;
  recieve: (props: {
    route: RouteProp<AuthRootStackParams, 'Recieve'>;
  }) => StackNavigationOptions;
  mainAdressSelector: StackNavigationOptions;
  createWalletRoutes: StackNavigationOptions;
  successTransaction: StackNavigationOptions;
  news: StackNavigationOptions;
}
export const headerContainerStyles = {
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
      <IconContainer onPress={() => navigation.navigate('News')}>
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
  contactList: {
    title: 'Saved address',
  },
  mainAdressSelector: {
    headerTransparent: false,
    headerStyle: {
      backgroundColor: colors.lightGray,
    },
    headerTitleAlign: 'center',
    title: 'Select your wallet',
    ...headerContainerStyles,
  },
  setFeeDestinationToSend: ({route}) => ({
    title: `Send ${getCurrencyInfo(route.params.currency.type).tokenName}`,
    ...headerContainerStyles,
  }),
  setQuantityToSend: ({route}) => ({
    title: `Send ${getCurrencyInfo(route.params.type).tokenName}`,
  }),
  confirmTransactionToSend: {
    title: 'CONFIRM YOUR ORDER',
  },
  transfer: ({route}) => ({
    title: `${getCurrencyInfo(route.params.type).tokenName}`,
  }),
  address: {},
  recieve: ({route}) => {
    const {tokenName} = getCurrencyInfo(route.params.type);
    return {
      title: `Recieve ${tokenName}`,
      headerTintColor: colors.white,
      headerTransparent: true,
    };
  },
  setAddress: {},
  createWalletRoutes: {
    headerShown: false,
  },
  successTransaction: {
    headerTintColor: colors.white,
    title: '',
    headerLeft: null,
    headerStyle: {
      backgroundColor: colors.success,
      elevation: 0,
      borderWidth: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
  },
  news: {
    title: 'News',
  },
};
export const commonScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTintColor: colors.black,
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  headerBackImage: ({tintColor}) => (
    <FIcon name="arrow-left" size={24} color={tintColor} />
  ),
  headerLeftContainerStyle: {
    paddingLeft: 16,
  },
};
