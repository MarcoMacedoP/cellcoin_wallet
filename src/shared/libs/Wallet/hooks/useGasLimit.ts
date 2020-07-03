import {useEffect, Reducer, useReducer} from 'react';
import {calculateGasLimitETH, calculateGasLimitToken} from 'shared/libs/Wallet';
import {TokenType} from 'shared/types';
import {gasPriceToEth} from '../functions/conversions';
import {GasState, useGlobalState} from 'globalState';
import {fetchGasPrice} from 'shared/libs/api';

export type UseGasLimitParams = {
  type: TokenType;
};

type GasLimitAction = {
  type: 'set-fee' | 'gas-price-change' | 'gas-limit-change';
  payload?: {
    gasLimit?: number;
    gasPrice?: number;
    gasLimitInRange?: number;
    token: TokenType;
  };
  error?: string | null;
};
const initialState: GasState = {
  fee: '0.0000',
  initialGasLimit: 21000,
  gasLimit: {
    eth: 21000,
    token: 31161 * 2,
  },
  gasPrice: 30,
  status: null,
  error: null,
};
const gasLimitReducer: Reducer<GasState, GasLimitAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'set-fee': {
      let {gasLimit, gasPrice, token} = action.payload;
      gasPrice = gasPrice / 10; // el gasPrice del JSON
      const fee = (gasPrice / 1e9) * gasLimit;

      return {
        ...state,
        fee: fee.toFixed(5),
        gasLimit:
          token === 'ETH'
            ? {
                ...state.gasLimit,
                eth: gasLimit,
              }
            : {
                ...state.gasLimit,
                token: gasLimit,
              },
        gasPrice: gasPrice,
        initialGasLimit: gasLimit,
        gasPriceInRange: gasPrice * 2,
      };
    }
    case 'gas-price-change': {
      const {gasPrice, gasLimit} = action.payload;
      const fee = gasPriceToEth(gasPrice, gasLimit);
      return {
        ...state,
        gasPrice,
        fee: fee.toFixed(5),
      };
    }
    case 'gas-limit-change': {
      const {token} = action.payload;
      const gasLimit = Math.floor(action.payload.gasLimit);
      const fee = gasPriceToEth(state.gasPrice, gasLimit);
      return {
        ...state,
        gasLimit:
          token === 'ETH'
            ? {
                ...state.gasLimit,
                eth: gasLimit,
              }
            : {
                ...state.gasLimit,
                token: gasLimit,
              },
        fee: fee.toFixed(5),
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
  type,
}: UseGasLimitParams): {
  values: GasState;
  onGasPriceChange: (value: number) => void;
  onGasLimitChange: (value: number) => void;
} {
  const [state, dispatch] = useReducer(gasLimitReducer, initialState);
  const [gasValues] = useGlobalState('gasValues');

  useEffect(() => {
    dispatch({
      type: 'set-fee',
      payload: {
        token: type,
        gasLimit:
          type === 'ETH' ? gasValues.gasLimit.eth : gasValues.gasLimit.token,
        gasPrice: gasValues.gasPrice,
      },
    });
  }, []);

  const onGasPriceChange = (value: number) => {
    const gasLimit =
      type === 'ETH' ? gasValues.gasLimit.eth : gasValues.gasLimit.token;
    dispatch({
      type: 'gas-price-change',
      payload: {
        token: type,
        gasPrice: value,
        gasLimit,
      },
    });
  };

  const onGasLimitChange = (value: number) => {
    dispatch({
      type: 'gas-limit-change',
      payload: {
        token: type,
        gasLimit: value,
      },
    });
  };

  return {values: state, onGasPriceChange, onGasLimitChange};
}
