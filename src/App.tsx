import 'react-native-gesture-handler';
import '../shim';
import Wallet from 'erc20-wallet';
import React, {useEffect, useState} from 'react';
import Router from './Router';
import {Splash} from 'shared/components/Splash';
import {useFindWalletInStorage} from 'shared/hooks/useFindWalletInStorage';
import {FadeInView} from 'shared/components';
import {useGlobalState} from 'globalState';
import OneSignal from 'react-native-onesignal';
import SimpleToast from 'react-native-simple-toast';
import {Alert, Platform} from 'react-native';
import {useOneSignal} from 'shared/libs/Notifications';

//declarations
const API_URL = 'https://erc20.lomeli.xyz/agavecoin';
//Wallet initializations
Wallet.mySeed = 'mipalabraalfanumerica8989';

/**
 * Hook that initializes the app.
 */
function useInitilizeApp() {
  const [hasInitialized, setHasInitilization] = useState(false);
  const [hasSetInitialization, setHasSetInitialization] = useState(false);
  const [hasKeystore] = useGlobalState('keystore');
  const onesignal = useOneSignal();
  const wallet = useFindWalletInStorage();
  useEffect(() => {
    if (hasSetInitialization && !wallet.isLoading) {
      setHasInitilization(true);
    }
  }, [hasSetInitialization, wallet.isLoading]);

  useEffect(() => {
    async function getInitialization() {
      try {
        const response = await fetch(`${API_URL}/data-general`, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
        const {data} = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log('Error on getInitialization() line 81 App.tsx', error);
        return null;
      }
    }
    async function setInitialization() {
      const initialization = await getInitialization();
      if (initialization) {
        for (const prop in initialization) {
          const walletHasProp =
            initialization.hasOwnProperty(prop) && Wallet.hasOwnProperty(prop);
          if (walletHasProp) Wallet[prop] = initialization[prop];
        }

        onesignal.init();
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
  return !hasInitialized ? (
    <Splash />
  ) : (
    <FadeInView style={{flex: 1}}>
      <Router />
    </FadeInView>
  );
};
export default App;

// NOTAS: BORRAR
// const getGasNow = async () => {
//   await $.getJSON(
//     'https://ethgasstation.info/api/ethgasAPI.json',
//     async data => {
//      let gas = (parseFloat(data["fastest"]) / 10) * (10 ** 9);
//      fee_eth = gasLimit * ((parseFloat(data['fastest']) / 10) * 10 ** 9);
//      user = fastest / 10
//      console.log(gas);
//     },
//   );
// };
