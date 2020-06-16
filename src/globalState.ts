import { createGlobalState } from 'react-hooks-global-state';

export type adressType = {
  address: string;
  eth: number;
  token: number;
};
export type balanceType = {
  tokenBalance: { original: string; usd: number };
  ethBalance: { original: string; usd: number };
  generalBalance: string | null;
  fetchBalance: () => Promise<void>;
  isLoading: boolean;
};
type globalState = {
  keystore: any;
  addresses: Array<adressType>;
  mainAddress: string;
  uuid: string;
  balance: balanceType;
};

export const { useGlobalState } = createGlobalState<globalState>({
  keystore: {},
  addresses: [],
  mainAddress: undefined,
  uuid: undefined,
  balance: null,
});
