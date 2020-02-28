import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-simple-toast';
import {Loading} from 'shared/components';
import {Label, PageContainer, H4 as BaseTitle} from 'shared/styled-components';

import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useCreateWallet} from '../hooks/useCreateWallet';

export const LoadWalletScreen = () => {
  const check = require('assets/icons/check_icon.png');
  const navigation = useNavigation();
  const {isCreated, error} = useCreateWallet();
  useEffect(() => {
    if (isCreated) {
      const goBalance = () => navigation.navigate('Balance');
      setTimeout(goBalance, 800);
    } else if (error) {
      console.log(error);
      Toast.show('Ups, someting goes wrong, try again later');
      const goBack = () => navigation.goBack();
      setTimeout(goBack, 1000);
    }
  }, [isCreated, error]);

  return (
    <PageContainer light>
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
    </PageContainer>
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
