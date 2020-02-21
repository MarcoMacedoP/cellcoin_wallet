import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'globalState';
import Wallet from 'erc20-wallet';

/**
 * Custom hook for checking if mobile storage has already a wallet created;
 *  Connects to global state and then loads there the keystore.
 *
 */
export function useFindWalletInStorage() {
  const [isLoading, setLoading] = useState(false);
  const [, setKeystore] = useGlobalState<any>('keystore');
  const [mainAddress, setMainAddress] = useGlobalState('mainAddress');
  const [, setAddresses] = useGlobalState('addresses');
  useEffect(() => {
    console.log({mainAddress});

    async function getWallet() {
      try {
        setLoading(true);
        const keystore = await getDecodedWallet();
        const {adresses, mainAddress} = await getAdress();
        setAddresses(adresses);
        setMainAddress(mainAddress);
        setKeystore(keystore);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setKeystore(null);
      }
    }
    getWallet();
  }, []);
  return {isLoading};
}
async function getDecodedWallet() {
  const decodedKeystore = await AsyncStorage.getItem('keystore');
  Wallet.keystoreJson = JSON.parse(decodedKeystore);
  try {
    const undecodedKeystore = await Wallet.decodeJson();
    Wallet.keystore = undecodedKeystore;

    return undecodedKeystore;
  } catch (error) {}
}
async function getAdress() {
  const adresses = JSON.parse(await AsyncStorage.getItem('addresses'));
  const mainAddress = JSON.parse(await AsyncStorage.getItem('mainAddress'));
  console.log({mainAddress});

  return {adresses, mainAddress};
}
