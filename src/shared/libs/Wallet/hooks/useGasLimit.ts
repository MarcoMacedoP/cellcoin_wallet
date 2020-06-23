import {useState, useEffect, useMemo} from 'react';
import {calculateGasLimitETH, calculateGasLimitToken} from 'shared/libs/Wallet';
import {TokenType} from 'shared/types';

export type UseGasLimitParams = {
  from: string;
  to: string;
  amount: string;
  type: TokenType;
};

export function useGasLimit({to, from, amount, type}: UseGasLimitParams) {
  const [gasLimit, setGasLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [intervals, setIntervals] = useState({
    min: 21000,
    max: 81000,
    recomended: 21000,
  });

  const [prices, setPrices] = useState({
    gasLimitInEth: 0,
    gasPrice: 0,
  });

  useMemo(() => {
    setPrices({...prices, gasLimitInEth: gasLimit / prices.gasPrice});
  }, [prices.gasPrice, gasLimit]);

  const [isEnabled, setIsEnabled] = useState(false);

  const calculateGas = () =>
    type === 'ETH'
      ? calculateGasLimitETH(from, to, amount)
      : calculateGasLimitToken(from, to, amount);

  useEffect(() => {
    async function handleCalculateGas() {
      setIsLoading(true);
      try {
        const {gasLimit, gasPrice} = await calculateGas();
        setPrices({
          gasLimitInEth: gasLimit / gasPrice,
          gasPrice,
        });
        setGasLimit(gasLimit);
        setIntervals({
          recomended: gasLimit,
          min: gasLimit / 2,
          max: gasLimit * 2,
        });
        setIsLoading(false);
      } catch (e) {
        const error =
          typeof e === 'string'
            ? e
            : 'An error ocurred while getting gas prices, try again later.';
        setIsLoading(false);
        setError(error);
      }
    }
    if (amount && to && from) {
      setIsEnabled(true);
      handleCalculateGas();
    } else {
      setIsEnabled(false);
    }
  }, [to, from, amount]);

  return {
    status: {
      isLoading,
      error,
    },
    gasLimit,
    prices,
    setGasLimit,
    isEnabled,
    intervals,
  };
}
