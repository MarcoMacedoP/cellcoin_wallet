import Wallet from 'erc20-wallet';
import AsyncStorage from '@react-native-community/async-storage';

export async function createKeystore() {
  Wallet.numAddr = 10;
  const keystore = await Wallet.createdStored();
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
