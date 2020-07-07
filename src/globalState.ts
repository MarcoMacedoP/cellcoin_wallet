import {createGlobalState} from 'react-hooks-global-state';

export type adressType = {
  address: string;
  eth: number;
  token: number;
};
export type balanceType = {
  tokenBalance: {original: string; usd: string};
  ethBalance: {original: string; usd: string};
  generalBalance: string | null;
  fetchBalance: () => Promise<void>;
  isLoading: boolean;
};
export type GasState = {
  initialGasLimit: number;
  gasLimit: {
    eth: number;
    token: number;
  };
  gasPrice: number;
  fee: string;
  status: 'error' | 'loading' | 'doned' | null;
  error?: null | string;
};

type globalState = {
  keystore: any;
  addresses: Array<adressType>;
  mainAddress: string;
  mainAddressAlias: string;
  balance: balanceType;
  onesignalKey: string;
  onesignalAppID: string;
  gasValues: GasState;
};

export const {useGlobalState} = createGlobalState<globalState>({
  keystore: {},
  onesignalKey: '',
  onesignalAppID: '',
  addresses: [],
  mainAddress: undefined,
  mainAddressAlias: 'main address',
  balance: null,
  gasValues: {
    fee: '0.000',
    initialGasLimit: 2100,
    gasLimit: {
      eth: 21000,
      token: 61000,
    },
    gasPrice: 30,
    status: null,
    error: null,
  },
});
