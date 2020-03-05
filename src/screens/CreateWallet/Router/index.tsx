import React from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {WalkthroughScreen} from '../screens/WalkthroughScreen';
import {TermsScreen} from '../screens/TermsScreen';
import {SetPasswordScreen} from '../screens/SetPasswordScreen';
import {commonScreenOptions} from 'Router/options';
import {MnemonicImport} from '../screens/MnemonicImport';
import {MnemonicIntro} from '../screens/MnemonicIntro';
import {MnemonicBackup} from '../screens/MnemonicBackup';
import {LoadWalletScreen} from '../screens/LoadWalletScreen';
const CreateWallet = createStackNavigator();

export const CreateWalletRoutes = () => {
  return (
    <CreateWallet.Navigator
      screenOptions={commonScreenOptions}
      initialRouteName="Walkthrough">
      <CreateWallet.Screen
        name="LoadWalletScreen"
        options={{title: 'Loading Wallet'}}
        component={LoadWalletScreen}
      />
      <CreateWallet.Screen
        name="MnemonicBackup"
        component={MnemonicBackup}
        options={{title: 'Create Wallet'}}
      />
      <CreateWallet.Screen
        name="MnemonicImport"
        component={MnemonicImport}
        options={{title: 'Import Wallet'}}
      />
      <CreateWallet.Screen
        name="MnemonicIntro"
        component={MnemonicIntro}
        options={{title: 'Create Wallet'}}
      />
      <CreateWallet.Screen
        name="SetPassword"
        component={SetPasswordScreen}
        options={setPasswordScreenOptions}
      />

      <CreateWallet.Screen
        name="Terms"
        component={TermsScreen}
        options={termsScreenOptions}
      />

      <CreateWallet.Screen
        name="Walkthrough"
        component={WalkthroughScreen}
        options={{
          headerShown: false,
        }}
      />
    </CreateWallet.Navigator>
  );
};
export default CreateWalletRoutes;

const termsScreenOptions: StackNavigationOptions = {
  title: 'User service agreement',
};
const setPasswordScreenOptions = (props): StackNavigationOptions => ({
  title: props.route.params.name,
});
