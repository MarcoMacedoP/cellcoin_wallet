import React, {useState, useEffect} from 'react';
import {
  TextArea,
  PageContainer,
  Text,
  Subtitle,
} from 'shared/styled-components';
import {Button} from 'shared/components';
import Toast from 'react-native-simple-toast';
import Wallet from 'erc20-wallet';
import {useGlobalState} from 'globalState';

export function SetMnemonicScreen({navigation}) {
  const [, setKeystore] = useGlobalState('keystore');
  const [text, setText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    const __testingSeed =
      'hobby survey company beauty cry bachelor absorb home keen crop pink lunar';
    Wallet.seed = __testingSeed;
    setIsLoading(true);
    console.log(text);
    Wallet.createdStored()
      .then(keystore => {
        setError(null);
        setIsLoading(false);
        Wallet.keystore = keystore;
        setKeystore(keystore);
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

  return (
    <PageContainer light align="flex-start">
      <Text style={{marginBottom: 32}}>Please enter your mnemonic phrases</Text>
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
