import React, {useState, useEffect} from 'react';
import {TextArea, PageContainer, Text} from 'shared/styled-components';
import {Button} from 'shared/components';
import Wallet from 'erc20-wallet';

import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from 'shared/styles';

import {isValid} from 'bitcore-mnemonic';

export function MnemonicImport({navigation}) {
  const [text, setText] = useState(null);

  const [hasError, setError] = useState(null);
  useEffect(
    () => (text && text.length > 0 ? setError(!isValid(text)) : setError(null)),
    [text],
  );

  function handleClick() {
    Wallet.seed = text;
    navigation.navigate('LoadWalletScreen');
  }
  function handleChangeText(txt: string) {
    const normalizedText = txt.toLowerCase();
    setText(normalizedText);
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <PageContainer light justify="space-between" align="center">
        <TextContainer>
          <Label hasError={hasError}>
            {hasError
              ? 'Your menemonic phrases seems to be wrong 🤐'
              : 'Please enter your mnemonic phrases'}
          </Label>
          <TextArea
            hasError={hasError}
            autoFocus
            keyboardType="name-phone-pad"
            style={{marginBottom: 32}}
            onChangeText={handleChangeText}
            multiline={true}
            value={text}
            placeholder="Please separate the english words by space"
          />
        </TextContainer>

        <Button
          onClick={handleClick}
          isActivated={text ? (text.length > 0 ? !hasError : false) : false}>
          Import wallet
        </Button>
      </PageContainer>
    </ScrollView>
  );
}
const TextContainer = styled.View`
  width: 100%;
  margin-top: 16px;
`;
const Label = styled(Text)<{hasError: boolean}>`
  color: ${props => (props.hasError ? colors.error : colors.black)};
  margin-bottom: 12px;
  padding-left: 4px;
  text-transform: none;
`;
