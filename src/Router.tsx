import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {Suspense} from 'react';
//screens
import {BalanceRoutes} from 'screens/Balance/Router';
import {TransfersRoutes} from 'screens/Transfers';
const CreateWalletRoutes = React.lazy(() => import('screens/CreateWallet'));

import {NotificationsScreen} from 'screens/Notifications/Notifications';

import {StatusBar} from 'react-native';
import {colors} from 'shared/styles/variables';
import {useGlobalState} from 'globalState';
import {Loading} from 'shared/components';
const {Navigator, Screen} = createStackNavigator();

export const commonScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {fontSize: 16, fontWeight: 'normal', color: colors.black},
  headerStyle: {elevation: 0, backgroundColor: colors.white},
};

const Router = () => {
  const [hasKeystore] = useGlobalState('keystore');
  return hasKeystore ? (
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
  ) : (
    <Suspense fallback={() => <Loading />}>
      <RouterContainer>
        <Screen name="CreateWallet" component={CreateWalletRoutes} />
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
