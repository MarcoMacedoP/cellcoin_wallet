import {useGlobalState, adressType} from 'globalState';
import {useEffect, useState} from 'react';
import Wallet from 'erc20-wallet';

import Web3 from 'web3';
import HookedWeb3Provider from 'hooked-web3-provider';

export function useGetBalance(address: adressType) {
  const initialState = {tokenBalance: 0, ethBalance: 0, generalBalance: 0};
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const {ethBalance, tokenBalance} = await fetchBalance(
          '0xd353A3FD2A91dBC1fAeA041b0d1901a7A0978434',
        );
        setState({...state, ethBalance, tokenBalance});
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
    console.log({state});
    getPrices(state.ethBalance, state.tokenBalance);
  }, []);

  return state;
}

type fetchBalance = (address: adressType,) =>  Promise<{tokenBalance: 0; ethBalance: 0}>; // prettier-ignore

async function fetchBalance(address) {
  const tokenBalance = await Wallet.getTokenAddress(address);
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
async function getPrices(eth, token) {
  const body = new FormData();
  body.append('eth', eth);
  body.append('token', token);

  const response = await fetch('https://erc20.lomeli.xyz/agavecoin/prices', {
    body,
    method: 'post',
  });
  console.log(response.status);

  const data = await response.json();
  console.log({data});
  return data;
}
