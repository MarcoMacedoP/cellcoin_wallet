'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
export class ScanScreen extends Component {
  onSuccess = (e) => {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
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