import {ONESIGNAL_APP_ID, ONESIGNAL_API_KEY} from 'react-native-dotenv';
import OneSignal from 'react-native-onesignal';
import {useGlobalState} from 'globalState';

const ONESIGNAL_API_URL = 'https://onesignal.com/api/v1';

/**
 *  Sets the current address to the current device to enable push notifications.
 *
 * @param address the wallet address to be used
 */
export function setUserAddress(address: string) {
  console.log('****** setting user-id with address: ', address);
  OneSignal.sendTag('wallet_address', address);
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
};
/**
 * Sends a push notification to all the parts involved in the transaction.
 */
export async function notificateTransaction({
  amount,
  from,
  to,
  token,
}: NotificateTransactionParams) {
  const baseMessage = `A transaction of ${amount} ${token} is being`;
  const receiverMessage = `${baseMessage} recieved`;
  const emitterMessage = `${baseMessage} sended`;
  const notificationsUrl = `${ONESIGNAL_API_URL}/notifications/`;
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${ONESIGNAL_API_KEY}`,
    },
  };

  const receiverRequest = fetch(notificationsUrl, {
    ...requestParams,
    body: makeBody({
      headings: {
        en: 'Transaction received',
      },
      contents: {
        en: receiverMessage,
      },
      filters: [filterByWalletAddress(to)],
    }),
  }).then(response => response.json());

  const emmiterRequest = fetch(notificationsUrl, {
    ...requestParams,
    body: makeBody({
      headings: {
        en: 'Transaction sended',
      },
      contents: {
        en: emitterMessage,
      },
      filters: [filterByWalletAddress(from)],
    }),
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
function makeBody(params: object) {
  return JSON.stringify({
    ...params,
    app_id: ONESIGNAL_APP_ID,
  });
}

export function useOneSignal() {
  const [uuid, setUuid] = useGlobalState('uuid');

  const initializeOneSignal = () => {
    console.log('initializing onesignal :)');
    OneSignal.init(ONESIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
    OneSignal.setLogLevel(6, 0);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
  };
  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };
  const onIds = device => {
    // console.log('Device info: ', device);
    if (!uuid || uuid !== device.userId) {
      setUuid(device.userId);
      OneSignal.sendTag('slug', device.userId);
    }
  };

  const onReceived = notification => {
    console.log('Notification received: ', notification);
  };
  return {
    init: initializeOneSignal,
  };
}
