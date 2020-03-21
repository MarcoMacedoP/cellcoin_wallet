import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BalanceScreen} from '../screens/BalanceScreen';
import {MainAddressSelector} from '../screens/MainAddressSelector';
import * as options from './options';

const Balance = createStackNavigator();
export function BalanceRoutes() {
  return (
    <>
      <Balance.Navigator>
        <Balance.Screen
          component={BalanceScreen}
          name="Balance"
          options={options.balanceScreen}
        />
        <Balance.Screen
          component={MainAddressSelector}
          name="MainAddressSelector"
          options={options.addressOptions}
        />
      </Balance.Navigator>
    </>
  );
}
