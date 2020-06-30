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
type globalState = {
  keystore: any;
  addresses: Array<adressType>;
  mainAddress: string;
  mainAddressAlias: string;
  balance: balanceType;
};

export const {useGlobalState} = createGlobalState<globalState>({
  keystore: {},
  addresses: [],
  mainAddress: undefined,
  mainAddressAlias: 'main address',
  balance: null,
});
