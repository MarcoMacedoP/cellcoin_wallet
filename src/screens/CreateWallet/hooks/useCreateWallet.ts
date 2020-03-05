import {useGlobalState} from 'globalState';
import {useState, useEffect} from 'react';
import {
  createKeystore,
  createAddress,
  encodeKeystore,
} from 'shared/libs/Wallet';

export function useCreateWallet() {
  const addressTest = '0x08bd09310a970f68e01c8848785fd589dbccc77e';
  const [, setKeyStore] = useGlobalState('keystore');
  const [, setMainAddress] = useGlobalState('mainAddress');
  const [, setAddress] = useGlobalState('addresses');
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function createWallet() {
      try {
        const keystore = await createKeystore();
        const address = await createAddress();
        await encodeKeystore();
        setMainAddress(address[0].address);
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
