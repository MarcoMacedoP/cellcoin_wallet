import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BalanceScreen} from '../screens/BalanceScreen';
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
      </Balance.Navigator>
    </>
  );
}
