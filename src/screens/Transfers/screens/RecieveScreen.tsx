import React from 'react';
import {Text} from 'shared/styled-components/Texts';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {ClipboardComponent} from 'shared/components/Clipboard';
import {useGlobalState} from 'globalState';
import {RouteProp} from '@react-navigation/core';
import {AuthRootStackParams} from 'Router';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {ScreenContainer} from 'shared/components';

type RecieveTransferScreenProps = {
  route: RouteProp<AuthRootStackParams, 'Recieve'>;
};

export const RecieveTransferScreen: React.FC<RecieveTransferScreenProps> = ({
  route,
}) => {
  const {params: currency} = route;
  const [mainAddress] = useGlobalState('mainAddress');
  const {logo} = getCurrencyInfo(currency.type);
  return (
    <LinearGradient
      colors={['#26777D', '#26777D', '#50CDD5', '#50CDD5']}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box>
        <ImageBox>
          <Image source={logo} style={{width: 35, height: 35}} />
          <Image
            source={{
              uri: `https://chart.googleapis.com/chart?chs=300x300&chld=L|1&cht=qr&chl=ethereum:${mainAddress}`,
            }}
          />
        </ImageBox>
        <AddressBox>
          <ClipboardComponent text={mainAddress} />
        </AddressBox>
      </Box>

      <TextBox>
        <SmallText>
          {' '}
          Attention: please do not deposit any digital assets other than{' '}
          {currency.type} to the above address
        </SmallText>
        <Logo source={require('assets/icons/logo_mini.png')} />
      </TextBox>
    </LinearGradient>
  );
};

const Box = styled.View`
  background-color: ${colors.white};
  justify-content: space-around;
  align-items: center;
  width: 80%;
  padding-top: 10px;
  border-radius: 25px;
`;

const ImageBox = styled.View`
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 150px;
  height: 150px;
`;
const Logo = styled.Image`
  width: 150px;
  height: 150px;
  resize-mode: contain;
`;

const SmallText = styled.Text`
  color: rgba(255, 255, 255, 5);
  text-align: center;
`;
const AddressBox = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-top-width: 0.5px;
`;
const TextBox = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 80%;
`;
