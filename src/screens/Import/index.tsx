import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SetPasswordScreen} from './screens/SetPasswordScreen';
import {commonScreenOptions} from 'Router';
import {SetMnemonicScreen} from './screens/SetMnemonicScreen';

const ImportWallet = createStackNavigator();

export function ImportWalletRoutes({route}) {
  return (
    <ImportWallet.Navigator
      initialRouteName="ImportWallet"
      screenOptions={{...commonScreenOptions, headerShown: false}}>
      <ImportWallet.Screen name="ImportWallet" component={SetPasswordScreen} />
      <ImportWallet.Screen
        name="SetMnemonicScreen"
        component={SetMnemonicScreen}
      />
    </ImportWallet.Navigator>
  );
}
