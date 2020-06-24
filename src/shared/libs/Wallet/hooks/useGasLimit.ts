import {useState, useEffect, useMemo, Reducer, useReducer} from 'react';
import {calculateGasLimitETH, calculateGasLimitToken} from 'shared/libs/Wallet';
import {TokenType} from 'shared/types';
import {
  convertValueToGasPrice,
  convertValueToETH,
} from '../functions/conversions';

export type UseGasLimitParams = {
  from: string;
  to: string;
  amount: string;
  type: TokenType;
};

type GasLimitState = {
  gasLimit: number;
  gasPrice: number;
  gasPriceInRange: number;
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
  gasPriceInRange: 50,
  gasPrice: 0,
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
      const {gasLimit, gasPrice} = action.payload;
      return {
        ...state,
        status: 'doned',
        gasLimit,
        gasPrice,
      };
    }
    case 'range-change': {
      console.log(state);
      const  gasPriceInRange = action.payload?.gasLimitInRange;
      const gasPrice = convertValueToGasPrice(gasPriceInRange);
      const fee = convertValueToETH(gasPriceInRange, state.gasLimit);
      return {
        ...state,
        gasPrice,
        gasPriceInRange,
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
  const calculateGas = () =>
    type === 'ETH'
      ? calculateGasLimitETH(from, to, amount)
      : calculateGasLimitToken(from, to, amount);

  useEffect(() => {
    async function handleCalculateGas() {
      dispatch({type: 'load-data'});
      try {
        const {gasLimit, gasPrice} = await calculateGas();
        console.log({gasLimit, gasPrice});
        dispatch({type: 'success-fetch', payload: {gasLimit, gasPrice}});
      } catch (e) {
        const error =
          typeof e === 'string'
            ? e
            : 'An error ocurred while getting gas prices, try again later.';
        dispatch({type: 'error-on-fetch', error});
      }
    }
    if (amount && to && from && state.status !== 'doned' ) {
      handleCalculateGas();
    }
  }, [to, from, amount, state.status]);

  const onGasPriceChange = (value: number) => {
    dispatch({
      type: 'range-change',
      payload: {
        gasLimitInRange: value,
      },
    });
  };

  return {...state, onGasPriceChange};
}
