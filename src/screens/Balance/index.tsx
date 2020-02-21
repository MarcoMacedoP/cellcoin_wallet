import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {StatusBar, RefreshControl} from 'react-native';
import {BalanceHeaderComponent} from './components/Header';
import {BalanceCurrencyComponent} from './components/Currency';
import {CurrencyType} from 'shared/types';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useGlobalState} from 'globalState';
import Wallet from 'erc20-wallet';
import {useGetBalance} from './hooks/useGetBalance';
import { colors } from 'shared/styles/variables';

const CURRENCYS: Array<CurrencyType> = [
  {
    name: 'Agave coin',
    type: 'AGVC',
    value: '0.00',
    image: 'assets/icons/agave_coin_icon.png',
  },
  {
    type: 'ETH',
    value: '0.00',
    name: 'Ethereum',
    image: 'assets/icons/ethereum_icon.png',
  },
];

export const BalanceScreen = ({navigation, currencys = CURRENCYS}) => {
  const [mainAdress] = useGlobalState('mainAddress');
  console.log({mainAdress
  });
  
  const {ethBalance, generalBalance, tokenBalance} = useGetBalance(mainAdress);

  const [refreshing, setRefreshing] = React.useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const handleCurrencyClick = currency =>
    navigation.navigate('Transfers', {screen: 'home', params: {currency}});

  const goNotifications = () => navigation.navigate('Notifications');

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <>
      
        <BalanceHeaderComponent assets={generalBalance} />
        <CurrencysContainer 
          contentContainerStyle={{ justifyContent: 'center',}} 
          refreshControl={
            <RefreshControl colors={[colors.accent, colors.primary]} progressBackgroundColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {currencys.map((currency, index) => (
            <BalanceCurrencyComponent
              currency={currency}
              key={index}
              onClick={() => handleCurrencyClick(currency)}
            />
          ))}
        </CurrencysContainer>
      
    </>
  );
};

const CurrencysContainer = styled.ScrollView`
  padding: 22px;
  width: 100%;
  position: relative;
  top: -70px;
`;
const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;
