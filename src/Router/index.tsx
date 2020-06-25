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
import {SetQuantityToSend} from 'screens/Transfers/screens/SetQuantityToSend';
import {SetFeeDestinationToSend} from 'screens/Transfers/screens/SetFeeDestinationToSend';
import {ContactList} from 'screens/Transfers/screens/ContactList';
import {RecieveTransferScreen} from 'screens/Transfers/screens/RecieveScreen';
import {BalanceScreen} from 'screens/Balance/screens/BalanceScreen';
import {MainAddressSelector} from 'screens/Balance/screens/MainAddressSelector';
import {rootRouterOptions as options} from './options';
import {CurrencyType, TokenType} from 'shared/types';
import {SuccessTransaction} from 'screens/Transfers/screens/SuccessTransaction';
import {ConfirmTransactionToSend} from 'screens/Transfers/screens/ConfirmTransactionToSend';

type SendTransactionParams = {
  currency: CurrencyType;
  tokenQuantityToBeSended: string;
};

export type AuthRootStackParams = {
  Balance: {
    action?: 'update';
  };
  MainAddressSelector: undefined;
  Transfers: CurrencyType;
  Recieve: CurrencyType;
  SetQuantityToSend: CurrencyType;
  SetFeeDestinationToSend: SendTransactionParams & {
    selectedAddress?: string;
  };
  ConfirmTransactionToSend: SendTransactionParams & {
    gasPrice: number;
    gasLimit: number;
    from: string;
    to: string;
  };
  ContactsList: SendTransactionParams;
  SuccessTransaction: {
    from: string;
    to: string;
    hash: string;
    quantity: string;
    type: TokenType;
  };
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
          name="SetQuantityToSend"
          component={SetQuantityToSend}
          options={options.setQuantityToSend}
        />
        <RootStack.Screen
          name="SetFeeDestinationToSend"
          component={SetFeeDestinationToSend}
          options={options.setFeeDestinationToSend}
        />
        <RootStack.Screen
          name="ConfirmTransactionToSend"
          component={ConfirmTransactionToSend}
          options={options.confirmTransactionToSend}
        />
        <RootStack.Screen
          name="ContactsList"
          component={ContactList}
          options={options.contactList}
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
        <RootStack.Screen
          name="SuccessTransaction"
          component={SuccessTransaction}
          options={options.successTransaction}
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
