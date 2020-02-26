import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {useEffect} from 'react';
//screens
import {BalanceScreen} from 'screens/Balance';
import {TransfersRoutes} from 'screens/Transfers';

import {MnemonicRoutes} from 'screens/Mnemonic';
import {ImportWalletRoutes} from 'screens/Import';
import {CreateScreen} from 'screens/Create';

import {LayoutHeader} from 'shared/components/LayoutHeader';
import {StatusBar} from 'react-native';
import {NotificationsScreen} from 'screens/Notifications/Notifications';

import {colors} from 'shared/styles/variables';
import {useGlobalState} from 'globalState';
import {CreateWalletRoutes} from 'screens/CreateWallet';
const {Navigator, Screen} = createStackNavigator();

const balanceOptions: StackNavigationOptions = {
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

const walkthroughOptions: StackNavigationOptions = {
  headerShown: false,
};

export const commonScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {fontSize: 24, fontWeight: 'bold', color: colors.black},
  headerStyle: {elevation: 0, backgroundColor: colors.white},
};

const Router = () => {
  const [hasKeystore] = useGlobalState('keystore');

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Navigator
          screenOptions={{...commonScreenOptions, headerShown: false}}
          mode="card">
          <Screen name="CreateWallet" component={CreateWalletRoutes} />

          <Screen
            name="Balance"
            component={BalanceScreen}
            options={balanceOptions}
          />

          <Screen
            name="Transfers"
            component={TransfersRoutes}
            options={{headerShown: false}}
          />

          <Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              title: 'Notification Center',
              gestureDirection: 'horizontal-inverted',
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'normal',
              },
            }}
          />

          <Screen
            name="Create"
            component={CreateScreen}
            options={({route}: {route: any}) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'normal',
              },
            })}
          />
          <Screen name="Import" component={ImportWalletRoutes} />

          <Screen
            name="Mnemonic"
            component={MnemonicRoutes}
            options={{
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'normal',
              },
            }}
          />
        </Navigator>
      </NavigationContainer>
    </>
  );
};
export default Router;
