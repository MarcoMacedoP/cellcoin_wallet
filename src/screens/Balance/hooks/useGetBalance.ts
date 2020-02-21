import {useGlobalState, adressType} from 'globalState';
import {useEffect, useState} from 'react';
import Wallet from 'erc20-wallet';

export function useGetBalance(address: adressType) {
  const initialState = {tokenBalance: 0, ethBalance: 0, generalBalance: 0};
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getBalance = async () => {
      const {ethBalance, tokenBalance} = await fetchBalance(address);
      setState({...state, ethBalance, tokenBalance});
    };
    getBalance();
  }, []);

  return state;
}

type fetchBalance = (address: adressType,) => Promise<{tokenBalance: 0; ethBalance: 0}>; // prettier-ignore

async function fetchBalance(address) {
  //   const tokenBalance = await Wallet.getTokenAddress(address);
  //   const ethBalance = await Wallet.getBalanceAddress(address);

  return {tokenBalance: 0, ethBalance: 0};
}
