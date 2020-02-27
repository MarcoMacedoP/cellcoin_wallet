import React from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {WalkthroughScreen} from './screens/WalkthroughScreen';
import {TermsScreen} from './screens/TermsScreen';
import {SetPasswordScreen} from './screens/SetPasswordScreen';
import {commonScreenOptions} from 'Router';
import {MnemonicBackup} from './screens/MnemonicBackup';
import {MnemonicIntro} from './screens/MnemonicIntro';
const CreateWallet = createStackNavigator();

export const CreateWalletRoutes = () => {
  return (
    <CreateWallet.Navigator screenOptions={commonScreenOptions}>
      <CreateWallet.Screen
        name="Walkthrough"
        component={WalkthroughScreen}
        options={{
          headerShown: false,
        }}
      />
      <CreateWallet.Screen
        name="Terms"
        component={TermsScreen}
        options={termsScreenOptions}
      />
      <CreateWallet.Screen
        name="SetPassword"
        component={SetPasswordScreen}
        options={setPasswordScreenOptions}
      />
      <CreateWallet.Screen name="MnemonicBackup" component={MnemonicBackup} />
      <CreateWallet.Screen name="MnemonicIntro" component={MnemonicIntro} />
    </CreateWallet.Navigator>
  );
};

const termsScreenOptions: StackNavigationOptions = {
  title: 'User service agreement',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'normal',
  },
};
const setPasswordScreenOptions = props => ({
  ...termsScreenOptions,
  title: props.route.params.name,
});
