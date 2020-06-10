import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-simple-toast';
import {Loading, Button} from 'shared/components';
import {
  Label,
  ScreenContainer,
  H4 as BaseTitle,
} from 'shared/styled-components';

import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useCreateWallet} from '../hooks/useCreateWallet';
const check = require('assets/icons/check_icon.png');

export const LoadWalletScreen = () => {
  console.log('LoadWalletScreen');

  const navigation = useNavigation();
  const {isCreated, error} = useCreateWallet();
  const goBalance = () => navigation.navigate('Balance');
  const goBack = () => navigation.goBack();

  useEffect(() => {
    if (error) {
      Toast.show('Ups, someting goes wrong, try again later');
      setTimeout(goBack, 3000);
    }
    if (!error && isCreated) {
      setTimeout(goBalance, 2000);
    }
  }, [error, isCreated]);

  return (
    <ScreenContainer light>
      <BodyBox>
        {isCreated ? (
          <CreatedContainer>
            <Image source={check} />
            <ContainerText>
              <Title>Wallet loaded. </Title>
              <Label>
                Please secure your mnemonic words safety. Make sure you store
                them safely and do not leak information to others
              </Label>
            </ContainerText>
          </CreatedContainer>
        ) : (
          <Loading
            image={require('assets/images/agave_wallet_create.png')}
            text="Wallet is being loaded, please wait a moment"
          />
        )}
      </BodyBox>
    </ScreenContainer>
  );
};

const BodyBox = styled.View`
  margin-top: 32px;
  height: 100%;
  width: 100%;
`;
const CreatedContainer = styled.View`
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;
const ContainerText = styled.View`
  width: 100%;
  padding: 0 22px;
  margin-bottom: 35px;
  align-items: flex-start;
`;

const Title = styled(BaseTitle)`
  margin-bottom: 16px;
  font-size: 32px;
  position: relative;
  right: 8px;
  align-self: center;
`;
