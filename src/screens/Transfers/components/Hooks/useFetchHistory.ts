import {useState, useEffect} from 'react';
import {TokenType} from 'shared/types';
import Wallet from 'erc20-wallet';
import api from 'etherscan-api';

function initEtherScan() {
  const etherscan = api.init(
    'NF3VM2RDBRJMAXCGPDIBX2KMX8W5ED8SF9',
    this.networkEtherScan,
    3000,
  );
  this.etherscan = etherscan;
  return etherscan;
}
Wallet.initEtherScan = initEtherScan;

export function useFetchHistory(type: TokenType, address: string) {
  const [transactions, setTransactions] = useState([]);

  const initialStatus = {
    loading: false,
    error: null,
  };
  const [status, setStatus] = useState(initialStatus);
  useEffect(() => {
    fetchHistory();
  }, []);
  async function fetchHistory() {
    setStatus({
      loading: true,
      error: null,
    });
    try {
      const transactions =
        type === 'TOKEN'
          ? await Wallet.getTxtTokens(address)
          : await Wallet.getTxtEth(address);
      setTransactions(transactions || []);
      setStatus({
        error: null,
        loading: false,
      });
    } catch (error) {
      setStatus({
        error,
        loading: false,
      });
    }
  }
  return {history: transactions, ...status, fetchHistory};
}
