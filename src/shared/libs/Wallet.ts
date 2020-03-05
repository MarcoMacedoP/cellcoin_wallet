import Wallet from 'erc20-wallet';
import AsyncStorage from '@react-native-community/async-storage';
import lightwallet from 'eth-lightwallet';

function createdStored() {
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault(
      {
        password: Wallet.password,
        seedPhrase: Wallet.seed,
        hdPathString: Wallet.hdPathString,
      },
      (error, keystore) => {
        console.log('created keystore');

        if (error) {
          reject(error.message);
        } else {
          keystore.keyFromPassword(Wallet.password, (error, pwDerivedKey) => {
            console.log('keyFromPassword callback');
            if (error) {
              reject(error.message);
            } else {
              keystore.generateNewAddress(pwDerivedKey, Wallet.numAddr);
              resolve(keystore);
            }
          });
        }
      },
    );
  });
}

export function createKeystore() {
  Wallet.numAddr = 10;
  return createdStored().then(keystore => {
    Wallet.keystore = keystore;
    return keystore;
  });
}
export async function createAddress() {
  const address = await Wallet.generateAddress();
  const mainAddress = address[0].address;
  Wallet.address = address;
  await AsyncStorage.setItem('addresses', JSON.stringify(address));
  await AsyncStorage.setItem('mainAddress', JSON.stringify(mainAddress));
  return address;
}
export async function encodeKeystore() {
  const json = await Wallet.encodeJson();
  await AsyncStorage.setItem('keystore', json);
}
