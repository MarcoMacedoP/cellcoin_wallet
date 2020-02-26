import {useState, useEffect} from 'react';
import Wallet from 'erc20-wallet';

export function useCalculateGasLimit({
  localDirection,
  destDirection,
  quantity,
}) {
  useEffect(() => {
    fetchGasLimit(localDirection, destDirection, quantity);
  }, []);
}

async function fetchGasLimit(localDirection, destDirection, quantity) {
  const response = await Wallet.calculateGasLimitToken(
    localDirection,
    destDirection,
    quantity,
  );
}
