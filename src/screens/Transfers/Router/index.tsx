import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {TransfersScreen} from '../screens/TransfersScreen';
import {SetAddressScreen} from '../screens/SetAddressScreen';

import {SendScreen} from '../screens/Send';
import {RecieveTransferScreen} from '../screens/RecieveScreen';
import {commonScreenOptions} from 'Router/options';
import {LayoutHeader} from 'shared/components/LayoutHeader';
import {AddressBookScreen} from '../screens/AddressBookScreen';
import {colors} from 'shared/styles/variables';
import {getCurrencyInfo} from '../components/Functions/getCurrencyInfo';
import {transfersStackOptions as options} from './options';
import {RootStack} from 'Router';
const Transfers = createStackNavigator();

const sendOptions: StackNavigationOptions = {
  headerTransparent: false,
  headerStyle: {
    elevation: 0,
    backgroundColor: colors.white,
    shadowRadius: 0,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerTitle: props => (
    <LayoutHeader {...props} light titleColor={'black'} leftIcon="x" />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

const recieveOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: () => (
    <LayoutHeader
      light={true}
      title={'Receive'}
      titleColor={'white'}
      leftIcon="back-white"
      rightIcon="shared"
    />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

const addressOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: () => (
    <LayoutHeader
      light
      title={'Address Book'}
      titleColor={'black'}
      leftIcon="back-black"
      rightIcon="add"
    />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

const setAddressOptions: StackNavigationOptions = {
  headerTransparent: false,
  headerStyle: {
    elevation: 0,
    backgroundColor: colors.white,
    shadowRadius: 0,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerTitle: props => (
    <LayoutHeader
      {...props}
      light
      titleColor={'black'}
      leftIcon="x"
      rightIcon="qr"
    />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

export function TransfersRoutes() {
  return (
    <>
      <RootStack.Screen
        name="home"
        component={TransfersScreen}
        options={options.transfer}
      />
      <RootStack.Screen
        name="send"
        component={SendScreen}
        options={({route}: {route: any}) => ({
          ...sendOptions,
          title:
            'Send ' + getCurrencyInfo(route.params.currency.type).tokenName,
        })}
      />
      <RootStack.Screen
        name="setAddress"
        component={SetAddressScreen}
        options={({route}: {route: any}) => ({
          ...setAddressOptions,
          title:
            'Send ' + getCurrencyInfo(route.params.currency.type).tokenName,
        })}
      />
      <RootStack.Screen
        name="address"
        component={AddressBookScreen}
        options={addressOptions}
      />
      <RootStack.Screen
        name="recieve"
        component={RecieveTransferScreen}
        options={recieveOptions}
      />
    </>
  );
}
