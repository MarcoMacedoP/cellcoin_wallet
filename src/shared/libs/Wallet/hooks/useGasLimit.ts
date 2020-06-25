import {useState, useEffect, useMemo, Reducer, useReducer} from 'react';
import {calculateGasLimitETH, calculateGasLimitToken} from 'shared/libs/Wallet';
import {TokenType} from 'shared/types';
import {gasPriceToEth} from '../functions/conversions';

export type UseGasLimitParams = {
  from: string;
  to: string;
  amount: string;
  type: TokenType;
};

type GasLimitState = {
  gasLimit: number;
  gasPrice: number;
  fee: string;
  status: 'error' | 'loading' | 'doned' | null;
  error?: null | string;
};

type GasLimitAction = {
  type: 'load-data' | 'error-on-fetch' | 'success-fetch' | 'range-change';
  payload?: {gasLimit?: number; gasPrice?: number; gasLimitInRange?: number};
  error?: string | null;
};
const initialState: GasLimitState = {
  fee: '0.0000',
  gasLimit: 21000,
  gasPrice: 30,
  status: null,
  error: null,
};
const gasLimitReducer: Reducer<GasLimitState, GasLimitAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'load-data':
      return {
        ...state,
        status: 'loading',
      };
    case 'success-fetch': {
      let {gasLimit, gasPrice} = action.payload;
      gasPrice = gasPrice / 10; // el gasPrice del JSON
      console.log('gas price / 10    ', gasPrice);
      const fee = (gasPrice / 1e9) * gasLimit;

      return {
        ...state,
        fee: fee.toFixed(5),
        status: 'doned',
        gasLimit,
        gasPrice: gasPrice,
        gasPriceInRange: gasPrice * 2,
      };
    }
    case 'range-change': {
      console.log(state);
      const {gasPrice} = action.payload;
      const fee = gasPriceToEth(gasPrice, state.gasLimit);
      return {
        ...state,
        gasPrice,
        fee: fee.toFixed(5),
      };
    }
    case 'error-on-fetch': {
      return {
        ...state,
        error: action.error,
        status: 'error',
      };
    }
    default:
      return state;
  }
};

/**
 *  @returns An object with the state and a function to change the value of the gas price.
 *
 */
export function useGasPrice({
  to,
  from,
  amount,
  type,
}: UseGasLimitParams): GasLimitState & {
  onGasPriceChange: (value: number) => void;
} {
  const [state, dispatch] = useReducer(gasLimitReducer, initialState);
  const calculateGas = async () => {
    const fetchGasPrice = async (): Promise<number> => {
      const response = await fetch(
        'https://ethgasstation.info/api/ethgasAPI.json',
      );
      const data = await response.json();
      return Number(data.fast);
    };
    if (type === 'ETH') {
      const [{gasLimit}, gasPrice] = await Promise.all([
        calculateGasLimitETH(from, to, amount),
        fetchGasPrice(),
      ]);
      return {gasLimit, gasPrice};
    } else {
      const [{gasLimit}, gasPrice] = await Promise.all([
        calculateGasLimitToken(from, to, amount),
        fetchGasPrice(),
      ]);
      return {gasLimit, gasPrice};
    }
  };

  useEffect(() => {
    async function handleCalculateGas() {
      dispatch({type: 'load-data'});
      try {
        const {gasLimit, gasPrice} = await calculateGas();
        console.log('gasPrice del JSON', gasPrice);
        dispatch({type: 'success-fetch', payload: {gasLimit, gasPrice}});
      } catch (e) {
        const error =
          typeof e === 'string'
            ? e
            : 'An error ocurred while getting gas prices, try again later.';
        dispatch({type: 'error-on-fetch', error});
      }
    }
    if (amount && to && from && state.status !== 'doned') {
      handleCalculateGas();
    }
  }, [to, from, amount, state.status]);

  const onGasPriceChange = (value: number) => {
    dispatch({
      type: 'range-change',
      payload: {
        gasPrice: value,
      },
    });
  };

  return {...state, onGasPriceChange};
}
