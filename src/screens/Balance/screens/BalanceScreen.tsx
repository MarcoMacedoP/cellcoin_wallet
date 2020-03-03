import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RefreshControl, Dimensions} from 'react-native';
import {BalanceHeaderComponent} from '../components/Header';
import {BalanceCurrencyComponent} from '../components/Currency';
import {CurrencyType} from 'shared/types';
import {useGetBalance} from '../hooks/useGetBalance';
import {colors} from 'shared/styles/variables';
import {ScrollView} from 'react-native-gesture-handler';

const CURRENCYS: Array<CurrencyType> = [
  {
    name: 'Agave coin',
    type: 'AGVC',
    value: {original: '---', usd: '---'},
    image: 'assets/icons/agave_coin_icon.png',
  },
  {
    type: 'ETH',
    value: {original: '---', usd: '---'},
    name: 'Ethereum',
    image: 'assets/icons/ethereum_icon.png',
  },
];

export const BalanceScreen = ({navigation}) => {
  const [currencys, setCurrencys] = useState<Array<CurrencyType>>([
    ...CURRENCYS,
  ]);

  const balance = useGetBalance();
  const {ethBalance, generalBalance, tokenBalance, fetchBalance} = balance;
  useEffect(() => {
    if (ethBalance && tokenBalance) {
      const [token, ethereum] = currencys;
      token.value = tokenBalance;
      ethereum.value = ethBalance;
      setCurrencys([token, ethereum]);
    }
  }, [ethBalance, tokenBalance]);

  const onRefresh = React.useCallback(() => {
    fetchBalance();
  }, []);

  const handleCurrencyClick = currency =>
    navigation.navigate('Transfers', {screen: 'home', params: {currency}});

  return (
    <ScrollView
      contentContainerStyle={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('window').height,
      }}
      refreshControl={
        <RefreshControl
          size={35}
          tintColor={colors.white}
          refreshing={balance.isLoading}
          style={{
            borderWidth: 0,
            backgroundColor: colors.primary,
          }}
          onRefresh={onRefresh}
        />
      }>
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
    </ScrollView>
  );
};

const CurrencysContainer = styled.View`
  padding: 22px;
  width: 100%;
  position: relative;
  top: -56px;
`;
