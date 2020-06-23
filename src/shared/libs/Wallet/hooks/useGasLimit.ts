import {useState, useEffect, useMemo} from 'react';
import {calculateGasLimitETH} from 'shared/libs/Wallet';

export type UseGasLimitParams = {
  from: string;
  to: string;
  amount: string;
};

export function useGasLimit({to, from, amount}: UseGasLimitParams) {
  const [gasLimit, setGasLimit] = useState(0);

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

  useEffect(() => {
    async function handleCalculateGas() {
      const {gasLimit, gasPrice} = await calculateGasLimitETH(from, to, amount);
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
    }
    if (amount && to && from) {
      setIsEnabled(true);
      handleCalculateGas();
    } else {
      setIsEnabled(false);
    }
  }, [to, from, amount]);

  return {
    gasLimit,
    prices,
    setGasLimit,
    isEnabled,
    intervals,
  };
}
