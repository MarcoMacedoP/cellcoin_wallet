import React, {useState} from 'react';
import styled from 'styled-components/native';
//components
import {Button} from 'shared/components/Button';
import {ClipboardComponent} from 'shared/components/Clipboard';
import {ScreenContainer, Title, Subtitle} from 'shared/styled-components';
import {TransfersHistoryComponent} from '../components/History';
import {colors} from 'shared/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGlobalState} from 'globalState';
import {getCurrencyInfo} from '../components/Functions/getCurrencyInfo';
import {StyleSheet, View} from 'react-native';
import {AuthRootStackParams} from 'Router';
import {RouteProp} from '@react-navigation/core';

type TransfersScreenProps = {
  route: RouteProp<AuthRootStackParams, 'Transfers'>;
  navigation: any;
};
export const TransfersScreen: React.FC<TransfersScreenProps> = props => {
  console.log(props.route.params);
  const {route, navigation} = props;
  const {params: currency} = route;
  const {value, type} = currency;
  const {logo} = getCurrencyInfo(type);

  const [mainAddress] = useGlobalState('mainAddress');

  const navigateToSendTransfer = () => navigation.navigate('send', {currency});
  const navigateToRecieveTransfer = () =>
    navigation.navigate('recieve', {currency});

  return (
    <ScreenContainer light>
      <View style={styles.transactionsContainer}>
        <Header>
          <Image source={logo} />
          <Title>{value.original}</Title>
          <Subtitle>{'= $' + value.usd}</Subtitle>
        </Header>
        <ClipboardContainer>
          <ClipboardComponent text={mainAddress} />
        </ClipboardContainer>
        <ButtonsContainer>
          <Button
            accent
            width="50%"
            margin="0 4px 0 0"
            onClick={navigateToSendTransfer}>
            <Icon name="send" size={15} color="white" /> Send
          </Button>
          <Button
            secondary
            width="50%"
            margin="0 0 0 4px"
            onClick={navigateToRecieveTransfer}>
            <Icon name="qrcode" size={15} color="white" /> Receive
          </Button>
        </ButtonsContainer>
      </View>
      <TransfersHistoryComponent
        logo={logo}
        type={type}
        address={mainAddress}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 2,
    width: '100%',
  },
});

const Header = styled.View`
  margin-top: 20px;
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
const ClipboardContainer = styled.View`
  margin: 16px 0;
  width: 100%;
  border-radius: 15px;
  background-color: ${colors.whiteDark};
`;
const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 100%;
`;
const HistoryContainer = styled(ScreenContainer)`
  height: 35%;
`;
