import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import * as api from 'shared/libs/api';

const ONESIGNAL_API_URL = 'https://onesignal.com/api/v1';

/**
 *  Sets the current address to the current device to enable push notifications.
 *
 * @param address the wallet address to be used
 */
export async function setUserAddress(address: string) {
  console.log('****** setting user-id with address: ', address);
  const userId = await AsyncStorage.getItem('uuid');
  const hasSended = await api.saveAddress(address, userId);
  if (hasSended) {
    OneSignal.sendTag('wallet_address', address);
  }
}

type NotificateTransactionParams = {
  /** The user address who is making the transaction*/
  from: string;
  /** The user who is receiving the transation*/
  to: string;
  /** The amount to be sended */
  amount: string;
  /**The token-type to be sended */
  token: string;
  /** The one signal key */
  key: string;
  /** The one signal appID */
  appId: string;
};
/**
 * Sends a push notification to all the parts involved in the transaction.
 */
export async function notificateTransaction({
  amount,
  from,
  to,
  token,
  key,
  appId,
}: NotificateTransactionParams) {
  const baseMessage = `A transaction of ${amount} ${token} is being`;
  const receiverMessage = `${baseMessage} recieved`;
  const emitterMessage = `${baseMessage} sended`;
  const notificationsUrl = `${ONESIGNAL_API_URL}/notifications/`;
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${key}`,
    },
  };

  const receiverRequest = fetch(notificationsUrl, {
    ...requestParams,
    body: makeBody(
      {
        headings: {
          en: 'Transaction received',
        },
        contents: {
          en: receiverMessage,
        },
        filters: [filterByWalletAddress(to)],
      },
      appId,
    ),
  }).then(response => response.json());

  const emmiterRequest = fetch(notificationsUrl, {
    ...requestParams,
    body: makeBody(
      {
        headings: {
          en: 'Transaction sended',
        },
        contents: {
          en: emitterMessage,
        },
        filters: [filterByWalletAddress(from)],
      },
      appId,
    ),
  }).then(response => response.json());

  try {
    await Promise.all([receiverRequest, emmiterRequest]);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Returs a valid objet filter for the client address stored in One Signal
 */
const filterByWalletAddress = (address: string) => ({
  field: 'tag',
  key: 'wallet_address',
  relation: '=',
  value: address,
});

/**
 * Makes a valid body to make a request to OneSignal API.
 * @param params an object to be serialized as string.
 */
function makeBody(params: object, appId: string) {
  return JSON.stringify({
    ...params,
    app_id: appId,
  });
}

export function useOneSignal() {
  const initializeOneSignal = (appID: string) => {
    OneSignal.init(appID, {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.addEventListener('ids', onIds);
  };
  const onIds = async device => {
    OneSignal.sendTag('slug', device.userId);
    await AsyncStorage.setItem('uuid', device.userId);
  };

  return {
    init: initializeOneSignal,
  };
}
