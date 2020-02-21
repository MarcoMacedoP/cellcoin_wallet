import {useGlobalState} from 'globalState';
import Wallet from 'erc20-wallet';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export function useCreateWallet() {
  const [, setKeyStore] = useGlobalState('keystore');
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function createWallet() {
      console.log('Creating wallet...');
      try {
        const keystore = await createKeystore();
        await createAddress();
        await encodeKeystore();
        setKeyStore(keystore);
        setIsCreated(true);
        setError(null);
      } catch (error) {
        setIsCreated(false);
        setError(error);
      }
    }
    !isCreated && createWallet();
  }, []);

  return {error, isCreated};
}
async function createKeystore() {
  Wallet.numAddr = 10;
  const keystore = await Wallet.createdStored();
  Wallet.keystore = keystore;
  console.log({keystore: true});
  return keystore;
}
async function createAddress() {
  const address = await Wallet.generateAddress();
  const mainAddress = address[0].address;
  Wallet.address = address;
  await AsyncStorage.setItem('addresses', JSON.stringify(address));
  await AsyncStorage.setItem('mainAddress', JSON.stringify(mainAddress));
  console.log({mainAddress});
}
async function encodeKeystore() {
  const json = await Wallet.encodeJson();
  await AsyncStorage.setItem('keystore', json);
  console.log({storaged: true});
}
