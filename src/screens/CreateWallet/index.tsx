import React from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {WalkthroughScreen} from './screens/WalkthroughScreen';
import {TermsScreen} from './screens/TermsScreen';
const CreateWallet = createStackNavigator();

export const CreateWalletRoutes = () => {
  return (
    <CreateWallet.Navigator>
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
    </CreateWallet.Navigator>
  );
};

const termsScreenOptions: StackNavigationOptions = {
  title: 'User service Agreement',
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'normal',
  },
};
