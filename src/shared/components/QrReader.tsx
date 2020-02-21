'use strict';

import React, { Component } from 'react';

import {} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
type QRprops = {
  closeModal: any,
};
export class ScanScreen extends Component<QRprops> {
  onSuccess = (e) => {
    if (e.data.indexOf(':')) {
      var address = e.data.split(':')
      console.log( 'Direccion parseada', address[1]);
      this.props.closeModal(address[1]);
    } else {
      this.props.closeModal(e.data);
    }
    
  }
  render() {
    return (
      <QRCodeScanner
        fadeIn={true}
        showMarker={true}
        containerStyle={{ flexDirection: 'row', alignItems: 'center',}}
        cameraStyle={{width: 300, height: 300}}
        onRead={this.onSuccess}
      />
    );
  }
}