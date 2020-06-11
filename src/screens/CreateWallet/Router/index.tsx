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
import {createWalletStackOptions as options} from './options';

export type CreateWalletStack = {
  Walkthrough: undefined;
  LoadWalletScreen: undefined;
  MnemonicBackup: undefined;
  MnemonicImport: undefined;
  MnemonicIntro: undefined;
  SetPassword: undefined;
  Terms: undefined;
};

const CreateWallet = createStackNavigator<CreateWalletStack>();

export const CreateWalletRoutes = () => {
  return (
    <CreateWallet.Navigator
      screenOptions={commonScreenOptions}
      initialRouteName="Walkthrough">
      <CreateWallet.Screen
        name="LoadWalletScreen"
        options={options.loadWalletScreen}
        component={LoadWalletScreen}
      />
      <CreateWallet.Screen
        name="MnemonicBackup"
        component={MnemonicBackup}
        options={options.mnemonicBackup}
      />
      <CreateWallet.Screen
        name="MnemonicImport"
        component={MnemonicImport}
        options={options.mnemonicImport}
      />
      <CreateWallet.Screen
        name="MnemonicIntro"
        component={MnemonicIntro}
        options={options.mnemonicIntro}
      />
      <CreateWallet.Screen
        name="SetPassword"
        component={SetPasswordScreen}
        options={setPasswordScreenOptions}
      />

      <CreateWallet.Screen
        name="Terms"
        component={TermsScreen}
        options={options.terms}
      />

      <CreateWallet.Screen
        name="Walkthrough"
        component={WalkthroughScreen}
        options={options.walkthrough}
      />
    </CreateWallet.Navigator>
  );
};
export default CreateWalletRoutes;

const setPasswordScreenOptions = (props): StackNavigationOptions => ({
  title: props.route.params.name,
});
