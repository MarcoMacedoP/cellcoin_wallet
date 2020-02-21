import 'react-native-gesture-handler';
import '../shim';
import Wallet from 'erc20-wallet';
import React, {useEffect, useState} from 'react';
import Router from './Router';
import {Splash} from 'shared/components/Splash';
import {useFindWalletInStorage} from 'shared/hooks/useFindWalletInStorage';
import {FadeInView} from 'shared/components';
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
      setHasInitilization(true);
    }
    setInitialization();
  }, []);
  console.log(Wallet.provider);
  return hasInitialized;
}
const App = () => {
  const {isLoading} = useFindWalletInStorage();
  const hasInitialized = useInitilizeApp();
  useEffect(() => console.log({isLoading}), [isLoading]);
  return isLoading || !hasInitialized ? (
    <Splash />
  ) : (
    <FadeInView style={{flex: 1}}>
      <Router />
    </FadeInView>
  );
};
export default App;
