import React, {Component} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

type QRprops = {
  /**
   * A function to be called when the modal is closed with the selected address
   */
  closeModal: (seletedAddress: string) => void;
};
export const ScanScreen: React.FC<QRprops> = ({closeModal}) => {
  const onSuccess = e => {
    if (e.data.indexOf(':')) {
      const address = e.data.split(':');
      closeModal(address[1]);
    } else {
      closeModal(e.data);
    }
  };
  return (
    <QRCodeScanner
      fadeIn={true}
      showMarker={true}
      containerStyle={{flexDirection: 'row', alignItems: 'center'}}
      cameraStyle={{width: 300, height: 300}}
      onRead={onSuccess}
    />
  );
};
