import {createGlobalState} from 'react-hooks-global-state';

export type adressType = {
  address: string;
  eth: number;
  token: number;
};
export type balanceType = {
  tokenBalance: {original: string; usd: number};
  ethBalance: {original: string; usd: number};
  generalBalance: string | null;
  fetchBalance: () => Promise<void>;
  isLoading: boolean;
};
type globalState = {
  keystore: any;
  modalAdd: boolean;
  modalQR: boolean;
  addresses: Array<adressType>;
  mainAddress: string;
  balance: balanceType;
  contactsQuantity: 0;
};

export const {useGlobalState} = createGlobalState<globalState>({
  keystore: {},
  modalAdd: false,
  modalQR: false,
  addresses: [],
  contactsQuantity: 0,
  mainAddress: undefined,
  balance: null,
});
