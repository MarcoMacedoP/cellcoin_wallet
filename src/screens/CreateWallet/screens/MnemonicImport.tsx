import React, {useState, useEffect, useMemo} from 'react';
import {TextArea, ScreenContainer, Text} from 'shared/styled-components';
import {Button} from 'shared/components';
import Wallet from 'erc20-wallet';

import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from 'shared/styles';

import {isValid} from 'bitcore-mnemonic';
import {useValidation} from 'shared/hooks';
import {validations} from 'shared/validations';

export function MnemonicImport({navigation}) {
  // digital cargo wing output welcome lens burst choice funny seed rain jar
  const [text, setText] = useState('');

  const [isValidInput] = useValidation({
    validation: validations.walletSeed,
    text,
  });

  const [hasError, setError] = useState(null);

  const canSubmit = text.split(/ /g).length >= 12;

  function handleClick() {
    Wallet.seed = text;
    const isValidSeed = isValid(text);
    const hasError = isValidInput ? !isValidSeed : true;
    setError(hasError);
    if (!hasError) {
      navigation.navigate('LoadWalletScreen');
    }
  }
  function handleChangeText(txt: string) {
    const normalizedText = txt.toLowerCase();
    setText(normalizedText);
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <ScreenContainer light justify="space-between" align="center">
        <TextContainer>
          <Label hasError={hasError}>
            {hasError
              ? 'Your Mnemonic phrase does not match with any wallet.'
              : 'Please enter your mnemonic phrase.'}
          </Label>
          <TextArea
            hasError={hasError}
            autoFocus
            keyboardType="name-phone-pad"
            style={{
              marginBottom: 32,
            }}
            onChangeText={handleChangeText}
            multiline={true}
            value={text}
            placeholder="Use a space between each word."
          />
        </TextContainer>

        <Button onClick={handleClick} isActivated={canSubmit}>
          Import wallet
        </Button>
      </ScreenContainer>
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
