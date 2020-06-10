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
//declarations
declare var global: {HermesInternal: null | {}};
const API_URL = 'https://erc20.lomeli.xyz/agavecoin';
//Wallet initializations
Wallet.mySeed = 'mipalabraalfanumerica8989';

function useOneSignal() {
  const [uuid, setUuid] = useGlobalState('uuid');

  const initializeOneSignal = async () => {
    OneSignal.init('bcaa9a41-21f9-4bdf-b693-2d906840fc27', {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
  };
  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };
  const onIds = device => {
    // console.log('Device info: ', device);
    if (!uuid || uuid !== device.userId) {
      setUuid(device.userId);
      OneSignal.sendTag('slug', device.userId);
    }
  };

  const onReceived = notification => {
    // console.log("Notification received: ", notification);
  };
  useEffect(() => {
    initializeOneSignal();
  }, []);
}

/**
 * Hook that initializes the app.
 */
function useInitilizeApp() {
  const [hasInitialized, setHasInitilization] = useState(false);
  const [hasSetInitialization, setHasSetInitialization] = useState(false);
  const [hasKeystore] = useGlobalState('keystore');
  useOneSignal();
  const wallet = useFindWalletInStorage();

  useEffect(() => {
    if (hasSetInitialization && !wallet.isLoading) {
      setHasInitilization(true);
    }
  }, [hasSetInitialization, wallet.isLoading]);

  useEffect(() => {
    async function getInitialization() {
      const response = await fetch(`${API_URL}/data-general`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      });
      const {data} = await response.json();
      console.log({data});
      return data;
    }
    async function setInitialization() {
      const initialization = await getInitialization();

      for (const prop in initialization) {
        const walletHasProp = initialization.hasOwnProperty(prop) && Wallet.hasOwnProperty(prop); // prettier-ignore
        if (walletHasProp) Wallet[prop] = initialization[prop];
      }
      setHasSetInitialization(true);
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
