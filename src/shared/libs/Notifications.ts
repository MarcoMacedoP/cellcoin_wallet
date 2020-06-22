import {ONESIGNAL_APP_ID} from 'react-native-dotenv';
import OneSignal from 'react-native-onesignal';
import {useGlobalState} from 'globalState';

/**
 *  Sets the current address to the current device to enable push notifications.
 *
 * @param address the wallet address to be used
 */
export function setUserAddress(address: string) {
  console.log('****** setting user-id with address: ', address);
  OneSignal.sendTag('wallet_address', address);
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
