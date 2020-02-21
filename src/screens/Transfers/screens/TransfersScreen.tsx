import React from 'react';
import styled from 'styled-components/native';
//components

import {CurrencyType} from 'shared/types';
import {Button} from 'shared/components/Button';
import {ClipboardComponent} from 'shared/components/Clipboard';
import {PageContainer, Title, Subtitle} from 'shared/styled-components';
import {TransfersHistoryComponent} from '../components/History';
import {colors} from 'shared/styles';
import { BalanceHeaderComponent } from 'screens/Balance/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';


type TransfersScreenProps = {
  route: any;
  navigation: any;
};
export const TransfersScreen: React.FC<TransfersScreenProps> = props => {
  const {route, navigation} = props;
  const {currency}: {currency: CurrencyType} = route.params;
  const {value, type} = currency;

  const navigateToSendTransfer = () => navigation.navigate('send', {currency});
  const navigateToRecieveTransfer = () =>
    navigation.navigate('recieve', {currency});

  return (
    <>
      <Container>
        <TransactionContainer>
          <Header>
            <Image
              source={
                type === 'AGVC'
                  ? require('assets/icons/agave_coin_icon.png')
                  : require('assets/icons/ethereum_icon.png')
              }
            />
            <Title>{value}</Title>
            <Subtitle>{'= $' + value}</Subtitle>
          </Header>
          <ClipboardContainer>
            <ClipboardComponent text="e0d123e5f316bef78bfdf5a008837577" />
          </ClipboardContainer>
          <ButtonsContainer>
            <Button
              accent
              width="50%"
              margin="0 4px 0 0"
              onClick={navigateToSendTransfer}>
              <Icon name="send" size={15} color="white"/> Send
            </Button>
            <Button
              secondary
              width="50%"
              margin="0 0 0 4px"
              onClick={navigateToRecieveTransfer}>
              <Icon name="qrcode" size={15} color="white"/> Receive
            </Button>
          </ButtonsContainer>
        </TransactionContainer>
        <HistoryContainer>
          <TransfersHistoryComponent />
        </HistoryContainer>
      </Container>
    </>
  );
};
const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  background-color: ${colors.white}
`;
const TransactionContainer = styled(PageContainer)`
  height: 70%;
  background: ${colors.white};
  align-items: center;
`;

const Header = styled.View`
  width: 100%;
  height: 60%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Image = styled.Image`
  width: 30px;
  height: 30px;
`;
const IconsBox = styled.View`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;
const Icons = styled.Image`
  width: 20px;
  height: 20px;
  margin-top: 15px;
`;
const ClipboardContainer = styled.View`
  margin: 16px 0 16px;
  width: 95%;
  border-radius: 15px;
  background-color: ${colors.whiteDark}
`;
const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 100%;
`;

const HistoryContainer = styled(PageContainer)`
  background-color: ${colors.whiteDark};
  height: 40%;
`;
