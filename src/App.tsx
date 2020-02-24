import 'react-native-gesture-handler';
import '../shim';
import Wallet from 'erc20-wallet';
import React, {useEffect, useState} from 'react';
import Router from './Router';
import {Splash} from 'shared/components/Splash';
import {useFindWalletInStorage} from 'shared/hooks/useFindWalletInStorage';
import {FadeInView} from 'shared/components';
import {useGlobalState} from 'globalState';
//declarations
declare var global: {HermesInternal: null | {}};
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
      return data;
    }
    async function setInitialization() {
      const initialization = await getInitialization();
      console.log({initialization});

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
