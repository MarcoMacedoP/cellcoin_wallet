import React, {useState, useEffect} from 'react';
import {
  TextArea,
  PageContainer,
  Text,
  Subtitle,
} from 'shared/styled-components';
import {Button, Loading} from 'shared/components';
import Toast from 'react-native-simple-toast';
import Wallet from 'erc20-wallet';
import {useGlobalState} from 'globalState';
import AsyncStorage from '@react-native-community/async-storage';

export function SetMnemonicScreen({navigation}) {
  const [, setKeystore] = useGlobalState('keystore');
  const [, setMainAddress] = useGlobalState('mainAddress');
  const [, setAddress] = useGlobalState('addresses');
  const [text, setText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  async function createAddresasds() {
    const address = await Wallet.generateAddress();
    const mainAddress = address[0].address;
    Wallet.address = address;
    await AsyncStorage.setItem('addresses', JSON.stringify(address)).then( async (res) => {
      await AsyncStorage.setItem('mainAddress', JSON.stringify(mainAddress)).then( (res) => {
        setMainAddress(address[0].address);
        setAddress(address);
        return address;
      }).catch((err) => {
      });
    }).catch((err) => {
    });
  }

  async function createKeystore() {
    Wallet.numAddr = 10;
    const keystore = await Wallet.createdStored();
    Wallet.keystore = keystore;
    return keystore;
  }
  async function createAddress() {
    const address = await Wallet.generateAddress();
    const mainAddress = address[0].address;
    Wallet.address = address;
    await AsyncStorage.setItem('addresses', JSON.stringify(address));
    await AsyncStorage.setItem('mainAddress', JSON.stringify(mainAddress));
    return address;
  }
  async function encodeKeystore() {
    const json = await Wallet.encodeJson();
    await AsyncStorage.setItem('keystore', json);
  }


  const handleClick = async () => {
    const __testingSeed =
      'digital cargo wing output welcome lens burst choice funny seed rain jar';
    Wallet.seed = __testingSeed;
    setIsLoading(true);
    Wallet.seed = text;
    try {
      const keystore = await createKeystore();
      const address = await createAddress();
      await encodeKeystore();
      setKeystore(keystore);
      setMainAddress(address[0].address);
      setAddress(address);
      setError(null);
    } catch (error) {
      setError(error);
    }
    navigation.navigate('Balance');
  };

  useEffect(() => {
    if (error) {
      Toast.show(error);
      setError(null);
    }
  }, [error]);

  return isLoading ? (
    <Loading
      image={require('assets/images/agave_wallet_create.png')}
      text="Wallet is being created, please wait a moment"
    />
  )
  :(
    <PageContainer light align="center">
      <Text style={{marginBottom: 32, alignSelf:'flex-start',}}>Please enter your mnemonic phrases</Text>
      <TextArea
        style={{marginBottom: 32}}
        onChangeText={text => setText(text)}
        multiline={true}
        value={text}
        placeholder="Please separate the English words by space"
      />
      <Button onClick={handleClick} isLoading={isLoading}>
        Import wallet
      </Button>
    </PageContainer>
  );
}
