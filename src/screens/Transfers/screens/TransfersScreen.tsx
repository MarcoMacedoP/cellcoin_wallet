import React, {useState} from 'react';
import styled from 'styled-components/native';
//components

import {CurrencyType} from 'shared/types';
import {Button} from 'shared/components/Button';
import {ClipboardComponent} from 'shared/components/Clipboard';
import {PageContainer, Title, Subtitle} from 'shared/styled-components';
import {TransfersHistoryComponent} from '../components/History';
import {colors} from 'shared/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGlobalState} from 'globalState';
import {getCurrencyInfo} from '../components/Functions/getCurrencyInfo';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions, RefreshControl} from 'react-native';
import {useFetchHistory} from '../components/Hooks/useFetchHistory';

type TransfersScreenProps = {
  route: any;
  navigation: any;
};
export const TransfersScreen: React.FC<TransfersScreenProps> = props => {
  const {route, navigation} = props;
  const {currency}: {currency: CurrencyType} = route.params;
  const {value, type} = currency;
  const {logo} = getCurrencyInfo(type);

  const [mainAddress] = useGlobalState('mainAddress');
  const {history, fetchHistory, loading} = useFetchHistory(type, mainAddress);

  const onRefresh = React.useCallback(() => {
    fetchHistory();
  }, []);

  const navigateToSendTransfer = () => navigation.navigate('send', {currency});
  const navigateToRecieveTransfer = () =>
    navigation.navigate('recieve', {currency});

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}      
        contentContainerStyle={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('window').height,
        }}
        refreshControl={
          <RefreshControl
            size={35}
            tintColor={colors.white}
            refreshing={loading}
            style={{
              borderWidth: 0,
              backgroundColor: colors.primary,
            }}
            onRefresh={onRefresh}
          />
        }>
        <Container>
          <TransactionContainer>
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
          </TransactionContainer>

          <HistoryContainer>
            <TransfersHistoryComponent
              logo={logo}
              type={type}
              isEmpty={history.length === 0}
              history={history}
            />
          </HistoryContainer>
        </Container>
      </ScrollView>
    </>
  );
};
const Container = styled.View`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  background-color: ${colors.white};
`;
const TransactionContainer = styled(PageContainer)`
  height: 65%;
  background: ${colors.white};
  align-items: center;
`;

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
const HistoryContainer = styled(PageContainer)`
  background-color: ${colors.whiteDark};
  height: 35%;
`;
