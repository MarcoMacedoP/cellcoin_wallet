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


  async function createAddress() {
    const address = await Wallet.generateAddress();
    const mainAddress = address[0].address;
    Wallet.address = address;
    await AsyncStorage.setItem('addresses', JSON.stringify(address));
    await AsyncStorage.setItem('mainAddress', JSON.stringify(mainAddress));
    console.log({mainAddress});
    return address;
  }

  const handleClick = () => {
    // const __testingSeed =
    //   'digital cargo wing output welcome lens burst choice funny seed rain jar';
    // Wallet.seed = __testingSeed;
    Wallet.numAddr = 10;
    setIsLoading(true);
    console.log(text);
    Wallet.seed = text;
    Wallet.createdStored()
      .then(async (keystore) => {
        setError(null);
        Wallet.keystore = keystore;
        setKeystore(keystore);
        const address = await createAddress();
        setMainAddress(address[0].address);
        setAddress(address);
        setIsLoading(false);
        navigation.navigate('Balance');
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
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
