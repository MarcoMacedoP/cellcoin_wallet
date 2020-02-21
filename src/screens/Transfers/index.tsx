import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {TransfersScreen} from './screens/TransfersScreen';
import {SendTransferScreen} from './screens/SendScreen';
import {RecieveTransferScreen} from './screens/RecieveScreen';
import {commonScreenOptions} from 'Router';
import {colors} from 'shared/styles';
import {useGlobalState} from 'globalState';
import {LayoutHeader} from 'shared/components/LayoutHeader';
import { AddressBookScreen } from './screens/AddressBookScreen';

const Transfers = createStackNavigator();

const balanceOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: props => <LayoutHeader {...props} light titleColor={'black'} title={'Send'} leftIcon="back-black" rightIcon="address" />,
  headerBackTitleVisible: false,
  headerLeft: null,
};

const sendOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: () => (
    <LayoutHeader light={true} title={'Receive'} titleColor={'white'} leftIcon="back-white" rightIcon="shared" />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

const recieveOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: () => (
    <LayoutHeader light={true} title={'Receive'} titleColor={'white'} leftIcon="back-white" rightIcon="shared" />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

const addressOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitle: () => (
    <LayoutHeader light title={'Address Book'} titleColor={'black'} leftIcon="back-black" rightIcon="add" />
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
        component={SendTransferScreen}
        // options={sendOptions}
         options={({route}: {route: any}) => ({
           ...commonScreenOptions,
           title: `${route.params.currency.type} Send`,
            // headerShown: false,
           headerBackTitleVisible: false,
           headerStyle: {
             backgroundColor: colors.whiteDark,
             shadowColor: 'transparent',
             shadowRadius: 0,
             elevation: 0,
           },
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
