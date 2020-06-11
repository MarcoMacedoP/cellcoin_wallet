import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense} from 'react';
//screens
import {BalanceRoutes} from 'screens/Balance/Router';
import {TransfersRoutes} from 'screens/Transfers';
import {CreateWalletRoutes} from '../screens/CreateWallet/Router';
import {NotificationsScreen} from 'screens/Notifications/Notifications';
//components
import {StatusBar} from 'react-native';
import {useGlobalState} from 'globalState';
//utils
import {commonScreenOptions} from 'Router/options';
const {Navigator, Screen} = createStackNavigator();

const Router = () => {
  const [hasKeystore] = useGlobalState('keystore');

  if (hasKeystore) {
    return (
      <RouterContainer>
        <Screen name="Balance" component={BalanceRoutes} />
        <Screen
          name="Transfers"
          component={TransfersRoutes}
          options={{headerShown: false}}
        />
        <Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{headerShown: true}}
        />
      </RouterContainer>
    );
  } else
    return (
      <RouterContainer>
        <Screen name="CreateWalletRoutes" component={CreateWalletRoutes} />
      </RouterContainer>
    );
};

function RouterContainer({children}) {
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
          {children}
        </Navigator>
      </NavigationContainer>
    </>
  );
}

export default Router;
