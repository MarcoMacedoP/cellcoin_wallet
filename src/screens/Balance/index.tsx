import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {BalanceHeaderComponent} from './components/Header';
import {BalanceCurrencyComponent} from './components/Currency';
import {CurrencyType} from 'shared/types';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useGlobalState} from 'globalState';
import Wallet from 'erc20-wallet';
import {useGetBalance} from './hooks/useGetBalance';

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
  const {ethBalance, generalBalance, tokenBalance} = useGetBalance(mainAdress);

  const handleCurrencyClick = currency =>
    navigation.navigate('Transfers', {screen: 'home', params: {currency}});

  const goNotifications = () => navigation.navigate('Notifications');

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <>
      <GestureRecognizer
        onSwipeDown={goNotifications}
        onSwipeRight={goNotifications}
        config={config}
        style={{
          flex: 1,
        }}>
        <BalanceHeaderComponent assets={generalBalance} />
        <CurrencysContainer>
          {currencys.map((currency, index) => (
            <BalanceCurrencyComponent
              currency={currency}
              key={index}
              onClick={() => handleCurrencyClick(currency)}
            />
          ))}
        </CurrencysContainer>
      </GestureRecognizer>
    </>
  );
};

const CurrencysContainer = styled.View`
  padding: 22px;
  width: 100%;
  justify-content: center;
  position: relative;
  top: -70px;
`;
const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;
