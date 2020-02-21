import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-simple-toast';
import {Button, Loading} from 'shared/components';
import {Label, PageContainer, H4 as BaseTitle} from 'shared/styled-components';
import Wallet from 'erc20-wallet';

import {useGlobalState} from 'globalState';
import AsyncStorage from '@react-native-community/async-storage';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useCreateWallet} from '../hooks/useCreateWallet';

export const CreateAdressScreen = () => {
  const check = require('assets/icons/check_icon.png');
  const navigation = useNavigation();
  const {isCreated, error} = useCreateWallet();
  useEffect(() => {
    if (isCreated) {
      setTimeout(goBalance, 800);
    } else if (error) {
      Toast.show(error);
    }
  }, [isCreated, error]);
  const goBalance = () => navigation.navigate('Balance');

  return (
    <PageContainer light>
      <BodyBox>
        {isCreated ? (
          <CreatedContainer>
            <Image source={check} />
            <ContainerText>
              <Title>Wallet created. </Title>
              <Label>
                Please secure your mnemonic words safety. Make sure you store
                them safely and do not leak information to others
              </Label>
            </ContainerText>
          </CreatedContainer>
        ) : (
          <Loading
            image={require('assets/images/agave_wallet_create.png')}
            text="Wallet is being created, please wait a moment"
          />
        )}
      </BodyBox>
    </PageContainer>
  );
};

const BodyBox = styled.View`
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
