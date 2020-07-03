import { useGlobalState, adressType } from 'globalState';
import { useEffect, useState } from 'react';
import Wallet from 'erc20-wallet';
import { Alert } from "react-native";
import { getPrices, fetchGasPrice } from 'shared/libs/api';
import { getBalanceEth, calculateGasLimitToken, calculateGasLimitETH } from 'shared/libs/Wallet';
const defaultAddress = '0x0000000000000000000000000000000000000000';

export function useGetBalance() {
  const initialState = {
    tokenBalance: { original: '0', usd: '0' },
    ethBalance: { original: '0', usd: '0' },
    generalBalance: null,
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const [mainAddress] = useGlobalState('mainAddress');
  const [, setBalance] = useGlobalState('balance');
  const [, setGasValues] = useGlobalState('gasValues');
  

  const getBalance = async () => {
    try {
      setState({ ...state, isLoading: true });
      const { ethBalance, tokenBalance } = await fetchBalance(mainAddress);
      const [{ token, eth }, gasPrice, {gasLimit: gasLimitEth}, {gasLimit: gasLimitToken}] = await Promise.all([
        getPrices(ethBalance, tokenBalance),
        fetchGasPrice(),
        calculateGasLimitETH(mainAddress, defaultAddress, 0.2),
        calculateGasLimitToken(mainAddress, defaultAddress, 0.2)
      ])
      const totalUsd = eth + token;
      setGasValues({
        fee: '0.000',
        gasLimit: {
          eth: gasLimitEth,
          token: gasLimitToken * 2
        },
        gasPrice,
        status : 'doned',
        initialGasLimit: 0,
        error: null,
      })
      setState({
        ...state,
        isLoading: false,
        tokenBalance: {
          original: tokenBalance.toFixed(8),
          usd: token.toFixed(2),
        },
        generalBalance: totalUsd.toFixed(2),
        ethBalance: {
          original: ethBalance.toFixed(8),
          usd: eth.toFixed(2),
        },
      });
      setBalance({ ...state , fetchBalance: getBalance});
    } catch (error) {
      console.log(error);
      console.log(error.message)
      Alert.alert('Error getting balances', error?.message ? error.message : error)
      setState({ ...state, isLoading: false });
    }
  };
  useEffect(() => {
    getBalance();
  }, []);
  return { ...state, fetchBalance: getBalance };
}

type fetchBalance = (address: adressType, ) => Promise<{ tokenBalance: 0; ethBalance: 0 }>;

async function fetchBalance(address: string) {
  let tokenBalance = 0, ethBalance = 0;
    try {
      tokenBalance = await Wallet.getTokenAddress(address);
    } catch (error) {
     console.log('error in tokenBalance', error) 
    }
    try {
      ethBalance = await getBalanceEth(address);
      
    } catch (error) {
      console.log('error in ethBalance', error)  
    }
    return { tokenBalance, ethBalance };
}



