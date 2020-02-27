import React from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {WalkthroughScreen} from './screens/WalkthroughScreen';
import {TermsScreen} from './screens/TermsScreen';
import {SetPasswordScreen} from './screens/SetPasswordScreen';
import {commonScreenOptions} from 'Router';
import {MnemonicImport} from './screens/MnemonicImport';
import {MnemonicIntro} from './screens/MnemonicIntro';
import {MnemonicBackup} from './screens/MnemonicBackup';
import {LoadWalletScreen} from './screens/LoadWalletScreen';
const CreateWallet = createStackNavigator();

export const CreateWalletRoutes = () => {
  return (
    <CreateWallet.Navigator
      screenOptions={commonScreenOptions}
      initialRouteName="Walkthrough">
      <CreateWallet.Screen
        name="LoadWalletScreen"
        component={LoadWalletScreen}
      />
      <CreateWallet.Screen name="MnemonicBackup" component={MnemonicBackup} />
      <CreateWallet.Screen
        name="MnemonicImport"
        component={MnemonicImport}
        options={MnemonicImportOptions}
      />
      <CreateWallet.Screen
        name="MnemonicIntro"
        component={MnemonicIntro}
        options={MnemonicIntroOptions}
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

const termsScreenOptions: StackNavigationOptions = {
  title: 'User service agreement',
};
const setPasswordScreenOptions = props => ({
  title: props.route.params.name,
});
const MnemonicIntroOptions: StackNavigationOptions = {
  headerShown: false,
};
const MnemonicImportOptions: StackNavigationOptions = {
  title: 'Import Wallet',
};
