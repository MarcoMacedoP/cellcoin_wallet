import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {Suspense} from 'react';
//screens
import {BalanceScreen} from 'screens/Balance';
import {TransfersRoutes} from 'screens/Transfers';

import {LayoutHeader} from 'shared/components/LayoutHeader';
import {NotificationsScreen} from 'screens/Notifications/Notifications';
const CreateWalletRoutes = React.lazy(() => import('screens/CreateWallet'));

import {StatusBar} from 'react-native';
import {colors} from 'shared/styles/variables';
import {useGlobalState} from 'globalState';
import {Loading} from 'shared/components';
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

export const commonScreenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {fontSize: 16, fontWeight: 'normal', color: colors.black},
  headerStyle: {elevation: 0, backgroundColor: colors.white},
};

const Router = () => {
  const [hasKeystore] = useGlobalState('keystore');
  return hasKeystore ? (
    <RouterContainer>
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
