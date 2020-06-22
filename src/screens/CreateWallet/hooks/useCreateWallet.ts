import {useGlobalState} from 'globalState';
import {useState, useEffect} from 'react';
import {
  createKeystore,
  createAddress,
  encodeKeystore,
} from 'shared/libs/Wallet';
import * as Notifications from 'shared/libs/Notifications';

export function useCreateWallet() {
  // const addressTest = '0x08bd09310a970f68e01c8848785fd589dbccc77e';
  const [, setKeyStore] = useGlobalState('keystore');
  const [, setMainAddress] = useGlobalState('mainAddress');
  const [, setAddress] = useGlobalState('addresses');
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function createWallet() {
      console.log('creating wallet');
      try {
        const keystore = await createKeystore();
        const address = await createAddress();
        const mainAddress = address[0].address;
        await encodeKeystore();
        Notifications.setUserAddress(mainAddress);
        setMainAddress(mainAddress);
        setAddress(address);
        setKeyStore(keystore);
        setIsCreated(true);
        setError(null);
      } catch (error) {
        setIsCreated(false);
        setError(error);
      }
    }
    if (!isCreated) {
      createWallet();
    }
  }, [isCreated]);

  return {error, isCreated};
}
