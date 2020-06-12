import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense} from 'react';
//screens
import {CreateWalletRoutes} from '../screens/CreateWallet/Router';
import {NotificationsScreen} from 'screens/Notifications/Notifications';
//components
import {StatusBar} from 'react-native';
import {useGlobalState} from 'globalState';
//utils
import {commonScreenOptions} from 'Router/options';
import {TransfersScreen} from 'screens/Transfers/screens/TransfersScreen';
import {SendScreen} from 'screens/Transfers/screens/Send';
import {getCurrencyInfo} from 'screens/Transfers/components/Functions/getCurrencyInfo';
import {SetAddressScreen} from 'screens/Transfers/screens/SetAddressScreen';
import {AddressBookScreen} from 'screens/Transfers/screens/AddressBookScreen';
import {RecieveTransferScreen} from 'screens/Transfers/screens/RecieveScreen';
import {BalanceScreen} from 'screens/Balance/screens/BalanceScreen';
import {MainAddressSelector} from 'screens/Balance/screens/MainAddressSelector';
import {rootRouterOptions as options} from './options';
import {CurrencyType} from 'shared/types';

export type AuthRootStackParams = {
  Balance: undefined;
  MainAddressSelector: undefined;
  Transfers: CurrencyType;
  Send: CurrencyType;
  Recieve: CurrencyType;
  /** Only avaivavle when user is not logged */
  CreateWalletRoutes: undefined;
};

export const RootStack = createStackNavigator<AuthRootStackParams>();

const Router = () => {
  const [hasKeystore] = useGlobalState('keystore');

  if (hasKeystore) {
    return (
      <RouterContainer>
        <RootStack.Screen
          component={BalanceScreen}
          name="Balance"
          options={options.balance}
        />
        <RootStack.Screen
          component={MainAddressSelector}
          name="MainAddressSelector"
          options={options.mainAdressSelector}
        />
        <RootStack.Screen
          name="Transfers"
          component={TransfersScreen}
          options={options.transfer}
        />
        <RootStack.Screen
          name="send"
          component={SendScreen}
          // options={({route}: {route: any}) => ({
          //   ...sendOptions,
          //   title:
          //     'Send ' +
          //     getCurrencyInfo(route.params.currency.type).tokenName,
          // })}
        />
        <RootStack.Screen
          name="setAddress"
          component={SetAddressScreen}
          // options={({route}: {route: any}) => ({
          //   ...setAddressOptions,
          //   title:
          //     'Send ' +
          //     getCurrencyInfo(route.params.currency.type).tokenName,
          // })}
        />
        <RootStack.Screen
          name="address"
          component={AddressBookScreen}
          // options={addressOptions}
        />
        <RootStack.Screen
          name="Recieve"
          component={RecieveTransferScreen}
          options={options.recieve}
        />
        <RootStack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{headerShown: true}}
        />
      </RouterContainer>
    );
  } else
    return (
      <RouterContainer>
        <RootStack.Screen
          name="CreateWalletRoutes"
          component={CreateWalletRoutes}
          options={options.createWalletRoutes}
        />
      </RouterContainer>
    );
};

function RouterContainer({children}) {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={commonScreenOptions} mode="card">
          {children}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Router;
