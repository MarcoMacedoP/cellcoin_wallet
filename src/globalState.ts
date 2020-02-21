import {createGlobalState} from 'react-hooks-global-state';

export type adressType = {
  address: string;
  eth: number;
  token: number;
};

type globalState = {
  keystore: any;
  modalAdd: boolean;
  modalQR: boolean;
  addresses: Array<adressType>;
  mainAddress: adressType;
  contactsQuantity: 0;
};

export const {useGlobalState} = createGlobalState<globalState>({
  keystore: {},
  modalAdd: false,
  modalQR: false,
  addresses: [],
  contactsQuantity: 0,
  mainAddress: undefined,
});
