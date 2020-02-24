import {useGlobalState, adressType} from 'globalState';
import {useEffect, useState} from 'react';
import Wallet from 'erc20-wallet';

import Web3 from 'web3';
import HookedWeb3Provider from 'hooked-web3-provider';

export function useGetBalance(address) {
  const initialState = {
    tokenBalance: {original: '0', usd: '0'},
    ethBalance: {original: '0', usd: '0'},
    generalBalance: null,
    fetchBalance: () => {},
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const [mainAddress] = useGlobalState('mainAddress');
  const __addressTest = '0xd353A3FD2A91dBC1fAeA041b0d1901a7A0978434';

  const getBalance = async () => {
    try {
      setState({...state, isLoading: true});
      console.log('updated balance!');
      const {ethBalance, tokenBalance} = await fetchBalance(mainAddress);
      const {token, eth} = await getPrices(
        state.ethBalance,
        state.tokenBalance,
      );
      const ethUsd = parseFloat((eth * ethBalance * 1).toFixed(4));
      const tokenUsd = parseFloat((token * tokenBalance * 1).toFixed(4));
      const totalUsd = ethUsd + tokenUsd;
      setState({
        ...state,
        isLoading: false,
        tokenBalance: {
          original: tokenBalance.toFixed(8),
          usd: tokenUsd.toFixed(2),
        },
        generalBalance: totalUsd.toFixed(2),
        ethBalance: {
          original: ethBalance.toFixed(8),
          usd: ethUsd.toFixed(2),
        },
      });
    } catch (error) {
      console.log(error);
      setState({...state, isLoading: false});
    }
  };
  useEffect(() => {
    getBalance();
  }, []);

  return {...state, fetchBalance: getBalance};
}

type fetchBalance = (address: adressType,) =>  Promise<{tokenBalance: 0; ethBalance: 0}>; // prettier-ignore

async function fetchBalance(address) {
  const tokenBalance: number = await Wallet.getTokenAddress(address);
  const ethBalance: any = await getBalanceEth(address);
  return {tokenBalance, ethBalance};
}
async function getBalanceEth(address) {
  const web3 = new Web3();
  const web3Provider = new HookedWeb3Provider({
    host: Wallet.provider,
  });
  web3.setProvider(web3Provider);

  return new Promise((resolve, reject) =>
    web3.eth.getBalance(address, (error, result) =>
      error ? reject(error) : resolve(result.toNumber()),
    ),
  );
}
async function getPrices(eth, token): Promise<{eth; token}> {
  const requestOptions = {
    method: 'post',
    body: `eth=1&token=1`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  };

  const response = await fetch(
    'https://erc20.lomeli.xyz/agavecoin/prices',
    requestOptions,
  );
  const {data} = await response.json();
  return data;
}
