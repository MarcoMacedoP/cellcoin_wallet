import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {WalkthroughScreen} from './screens/WalkthroughScreen';
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
    </CreateWallet.Navigator>
  );
};
