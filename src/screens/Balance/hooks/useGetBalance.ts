import {useGlobalState, adressType} from 'globalState';
import {useEffect, useState} from 'react';
import Wallet from 'erc20-wallet';

import Web3 from 'web3';
import HookedWeb3Provider from 'hooked-web3-provider';

export function useGetBalance() {
  const initialState = {
    tokenBalance: {original: '0', usd: '0'},
    ethBalance: {original: '0', usd: '0'},
    generalBalance: null,
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const [mainAddress] = useGlobalState('mainAddress');
  const [, setBalance] = useGlobalState('balance');

  const getBalance = async () => {
    try {
      setState({...state, isLoading: true});
      const {ethBalance, tokenBalance} = await fetchBalance(mainAddress);
      const {token, eth} = await getPrices(
        ethBalance,
        tokenBalance,
      );
      const totalUsd = eth + token;
      
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
      setBalance({...state, fetchBalance: getBalance});
    } catch (error) {
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
      {
        try {
          let toWei = Wallet.web3.fromWei(result)
          resolve(toWei.toNumber());
        } catch (error) {
          reject(error);
        }
        
      }
      // error ? reject(error) : resolve(result.toNumber()),
    ),
  );
}
async function getPrices(eth, token): Promise<{eth; token}> {
  const requestOptions = {
    method: 'post',
    body: `eth=${eth}&token=${token}`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  };

  const response = await fetch(
    'https://erc20.lomeli.xyz/agavecoin/prices',
    requestOptions,
  );
  const {data} = await response.json();
  return data;
}
