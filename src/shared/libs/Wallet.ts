import Wallet from 'erc20-wallet';
import AsyncStorage from '@react-native-community/async-storage';
import lightwallet from 'eth-lightwallet';

export async function createKeystore() {
  Wallet.numAddr = 10;
  const keystore = await createdStored().catch(error => {
    console.log(error);
  });
  Wallet.keystore = keystore;
  return keystore;
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

export function createdStored() {
  const keystoreOptions = {
    password: Wallet.password,
    seedPhrase: Wallet.seed,
    hdPathString: Wallet.hdPathString,
  };

  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault(keystoreOptions, (err, ks) => {
      if (!err) {
        ks.keyFromPassword(Wallet.password, async (err, pwDerivedKey) => {
          if (!err) {
            try {
              ks.generateNewAddress(pwDerivedKey, Wallet.numAddr);
            } catch (error) {
              reject(error);
            }
            resolve(ks);
          } else {
            reject('Jaja asi es');
          }
        });
      } else {
        reject('HERE');
      }
    });
  });
}
