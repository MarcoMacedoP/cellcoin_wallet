import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {TransfersScreen} from './screens/TransfersScreen';
import {SetAddressScreen} from './screens/SetAddressScreen';

import { SendScreen } from './screens/Send';
import {RecieveTransferScreen} from './screens/RecieveScreen';
import Router, {commonScreenOptions} from 'Router';
import {colors} from 'shared/styles';
import {useGlobalState} from 'globalState';
import {LayoutHeader} from 'shared/components/LayoutHeader';
import {AddressBookScreen} from './screens/AddressBookScreen';

const Transfers = createStackNavigator();

const balanceOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: props => (
    <LayoutHeader
      {...props}
      light
      titleColor={'black'}
      title={'Send'}
      leftIcon="back-black"
      rightIcon="address"
    />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

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
    <LayoutHeader
      {...props}
      light
      titleColor={'black'}
      leftIcon="x"
    />
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
    shadowRadius: 0,
    shadowOffset: {
        height: 0,
    },
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
    <Transfers.Navigator
      initialRouteName="Transfers"
      screenOptions={commonScreenOptions}>
      <Transfers.Screen
        name="home"
        component={TransfersScreen}
        options={balanceOptions}
      />
      <Transfers.Screen
        name="send"
        component={SendScreen}
        options={({route}: {route: any}) => ({
          ...sendOptions,
          title: 'Send ' + route.params.currency.type,
        })}
      />
      <Transfers.Screen
        name="setAddress"
        component={SetAddressScreen}
        options={({route}: {route: any}) => ({
          ...setAddressOptions,
          title: 'Send ' + route.params.currency.type,
        })}
      />
      <Transfers.Screen
        name="address"
        component={AddressBookScreen}
        options={addressOptions}
      />
      <Transfers.Screen
        name="recieve"
        component={RecieveTransferScreen}
        options={recieveOptions}
      />
    </Transfers.Navigator>
  );
}
