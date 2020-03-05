import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense} from 'react';
//screens
import {BalanceRoutes} from 'screens/Balance/Router';
import {TransfersRoutes} from 'screens/Transfers';
const CreateWalletRoutes = React.lazy(() =>
  import('screens/CreateWallet/Router'),
);

import {NotificationsScreen} from 'screens/Notifications/Notifications';
//components
import {StatusBar} from 'react-native';
import {useGlobalState} from 'globalState';
import {Loading} from 'shared/components';
//utils
import {commonScreenOptions} from 'Router/options';
const {Navigator, Screen} = createStackNavigator();

const Router = () => {
  const [hasKeystore] = useGlobalState('keystore');
  return (
    <Suspense fallback={<Loading />}>
      <RouterContainer>
        {hasKeystore ? (
          <Screen name="Balance" component={BalanceRoutes} />
        ) : (
          <Screen name="CreateWallet" component={CreateWalletRoutes} />
        )}
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
    </Suspense>
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
