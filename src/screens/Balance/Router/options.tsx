import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from 'shared/styles';
import {LayoutHeader} from 'shared/components';

const balanceScreen: StackNavigationOptions = {
  title: 'Wallet',
  headerTitleAlign: 'center',
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTransparent: true,
  headerTitle: props => <LayoutHeader {...props} />,
  headerBackTitleVisible: false,
  headerLeft: null,
};

export {balanceScreen};
