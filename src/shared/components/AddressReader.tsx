import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import {colors} from 'shared/styles';
import {FadeInView} from './FadeInView';
import FIcon from 'react-native-vector-icons/Feather';

type AddressScannerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void;
};

export const AddressScanner: React.FC<AddressScannerProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  function handleSubmit(e: any) {
    if (e.data.indexOf(':')) {
      const address = e.data.split(':');
      onSubmit(address[1]);
    } else {
      onSubmit(e.data);
    }
  }

  return (
    <Modal visible={isOpen} onRequestClose={onClose} transparent={true}>
      <StatusBar backgroundColor={colors.blackTransparent} animated />
      <View style={styles.container}>
        <View style={styles.scannerContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={onClose}>
            <FIcon name="x" size={32} color={colors.white} />
          </TouchableOpacity>
          <QRCodeScanner
            showMarker={true}
            containerStyle={{flexDirection: 'row', alignItems: 'center'}}
            cameraStyle={styles.cameraStyle}
            onRead={handleSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransparent,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 99,
    top: 16,
    right: 16,
  },
  scannerContainer: {
    height: '50%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  cameraStyle: {
    flex: 1,
  },
});
