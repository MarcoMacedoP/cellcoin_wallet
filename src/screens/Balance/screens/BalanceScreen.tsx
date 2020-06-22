import React, {useEffect, useState} from 'react';
import {BalanceHeader} from '../components/Header';
import {Currency} from '../components/Currency';
import {CurrencyType} from 'shared/types';
import {useGetBalance} from '../hooks/useGetBalance';
import {colors} from 'shared/styles/variables';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { FlatList, StyleSheet, View, StatusBar } from "react-native"

const CURRENCYS: Array<CurrencyType> = [
  {
    name: 'Agave coin',
    type: 'TOKEN',
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
interface BalanceScreenProps {
  navigation: StackNavigationProp<AuthRootStackParams, 'Balance'>;
  route: RouteProp<AuthRootStackParams, 'Balance'>;
}

type BalanceScreenComponent = React.FC<BalanceScreenProps>;

export const BalanceScreen: BalanceScreenComponent = ({navigation, route: {params}}) => { 
  const [currencys, setCurrencys] = useState<Array<CurrencyType>>([ ...CURRENCYS, ]); 
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
  
  useEffect(()=> {
    if(params?.action === 'update'){
      onRefresh();
    }
  }, [params])
  
  const handleCurrencyClick = currency =>
    navigation.navigate('Transfers', currency);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <FlatList
        refreshing={balance.isLoading}
        onRefresh={onRefresh}
        ListHeaderComponent={({})=> <BalanceHeader assets={generalBalance}/>} 
        data={currencys} 
        keyExtractor={({type})=>type}
        renderItem={({item, index})=>
        <View style={[styles.currencyContainer, {top: index === 0 ? -56 : -100 }]}>
          <Currency 
             isLoading={balance.isLoading} 
             currency={item} 
             key={index} 
             onClick={()=> handleCurrencyClick(item)}/>
        </View>
        }/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteDark,
    flex: 1,
  },
  currencyContainer:{
    padding: 22,
    width: '100%',
    position: 'relative'
  }
})

