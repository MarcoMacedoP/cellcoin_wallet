import {useGlobalState} from 'globalState';
import {useState, useEffect} from 'react';
import {
  createKeystore,
  createAddress,
  encodeKeystore,
} from 'shared/libs/Wallet';

export function useCreateWallet() {
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
        setKeyStore(keystore);
        setMainAddress(address[0].address);
        setAddress(address);
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
