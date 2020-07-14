import 'react-native-gesture-handler';
import '../shim';
import Wallet from 'erc20-wallet';
import React, {useEffect, useState} from 'react';
import Router from './Router';
import {Splash} from 'shared/components/Splash';
import {useFindWalletInStorage} from 'shared/hooks/useFindWalletInStorage';
import {FadeInView} from 'shared/components';
import {useGlobalState} from 'globalState';
import {Alert} from 'react-native';
import {useOneSignal} from 'shared/libs/Notifications';
import {getInitialization} from 'shared/libs/api';

//Wallet initializations
Wallet.mySeed = 'mipalabraalfanumerica8989';

/**
 * Hook that initializes the app.
 */
function useInitilizeApp() {
  const [hasInitialized, setHasInitilization] = useState(false);
  const [hasSetInitialization, setHasSetInitialization] = useState(false);
  const [hasKeystore] = useGlobalState('keystore');
  const [, setOnesignalKey] = useGlobalState('onesignalKey');
  const [, setOnsesignalAppId] = useGlobalState('onesignalAppID');
  const onesignal = useOneSignal();
  const wallet = useFindWalletInStorage();
  useEffect(() => {
    if (hasSetInitialization && !wallet.isLoading) {
      setHasInitilization(true);
    }
  }, [hasSetInitialization, wallet.isLoading]);

  useEffect(() => {
    async function setInitialization() {
      const initialization = await getInitialization();
      if (initialization) {
        console.log('inicializacion', initialization);
        for (const prop in initialization) {
          const walletHasProp =
            initialization.hasOwnProperty(prop) && Wallet.hasOwnProperty(prop);
          if (walletHasProp) Wallet[prop] = initialization[prop];
        }

        onesignal.init(initialization.oneSignal_appID);
        setOnsesignalAppId(initialization.oneSignal_appID);
        setOnesignalKey(initialization.oneSignal_secret);
        setHasSetInitialization(true);
      } else {
        Alert.alert(
          'There was an error initializing the app',
          'Please check your internet connection and try again.',
          [
            {
              onPress: async () => await setInitialization(),
              text: 'Try again',
            },
          ],
        );
      }
    }
    setInitialization();
  }, []);
  return {hasInitialized, hasKeystore};
}
const App = () => {
  const {hasInitialized} = useInitilizeApp();
  console.log(hasInitialized);
  return !hasInitialized ? (
    <Splash />
  ) : (
    <FadeInView style={{flex: 1}}>
      <Router />
    </FadeInView>
  );
};
export default App;
