import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {StatusBar, RefreshControl} from 'react-native';
import {BalanceHeaderComponent} from './components/Header';
import {BalanceCurrencyComponent} from './components/Currency';
import {CurrencyType} from 'shared/types';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useGlobalState} from 'globalState';
import Wallet from 'erc20-wallet';
import {useGetBalance} from './hooks/useGetBalance';
import {colors} from 'shared/styles/variables';

const CURRENCYS: Array<CurrencyType> = [
  {
    name: 'Agave coin',
    type: 'AGVC',
    value: {original: '0.0', usd: '0.0'},
    image: 'assets/icons/agave_coin_icon.png',
  },
  {
    type: 'ETH',
    value: {original: '0.00', usd: '0.0'},
    name: 'Ethereum',
    image: 'assets/icons/ethereum_icon.png',
  },
];

export const BalanceScreen = ({navigation}) => {
  const [currencys, setCurrencys] = useState<Array<CurrencyType>>([
    ...CURRENCYS,
  ]);
  const [mainAdress] = useGlobalState('mainAddress');
  console.log({mainAdress});

  const {
    ethBalance,
    generalBalance,
    tokenBalance,
    fetchBalance,
  } = useGetBalance(mainAdress);
  useEffect(() => {
    if (ethBalance && tokenBalance) {
      const [token, ethereum] = currencys;
      token.value = tokenBalance;
      ethereum.value = ethBalance;
      setCurrencys([token, ethereum]);
    }
  }, [ethBalance, tokenBalance]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBalance().then(() => setRefreshing(false));
  }, [refreshing]);

  const handleCurrencyClick = currency =>
    navigation.navigate('Transfers', {screen: 'home', params: {currency}});

  return (
    <>
      <BalanceHeaderComponent assets={generalBalance} />
      <CurrencysContainer
        contentContainerStyle={{justifyContent: 'center'}}
        refreshControl={
          <RefreshControl
            colors={[colors.accent, colors.primary]}
            progressBackgroundColor={'white'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
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
