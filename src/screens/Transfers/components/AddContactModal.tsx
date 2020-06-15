import React, {useState} from 'react';
import {Modal, Button, QrIcon, AddressScanner} from 'shared/components';
import {Input, Label} from 'shared/styled-components';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, spacings} from 'shared/styles';
import AsyncStorage from '@react-native-community/async-storage';
import {Contact} from 'shared/types/interfaces';
import {useModal} from 'shared/hooks';

type AddContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contact: Contact) => void;
};

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const addressModal = useModal();
  const [{alias, address}, setState] = useState({
    alias: '',
    address: '',
  });
  function handleAddressModalSubmit(address: string) {
    setState(state => ({...state, address}));
    addressModal.close();
  }
  return (
    <Modal isShowed={isOpen} icon={'x'} onClose={onClose} title="Save address">
      <View style={styles.inputContainer}>
        <Label style={styles.label}>Alias</Label>
        <Input
          align="left"
          value={alias}
          maxLength={15}
          keyboardAppearance={'dark'}
          onChangeText={(alias: string) =>
            setState(state => ({...state, alias}))
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={styles.label}>Address</Label>
        <View style={styles.qrContainer}>
          <Input
            style={styles.addresInput}
            align="left"
            value={address}
            keyboardAppearance={'dark'}
            onChangeText={(address: string) =>
              setState(state => ({...state, address}))
            }
          />
          <TouchableOpacity onPress={addressModal.open}>
            <QrIcon tintColor={colors.primary} onPress={addressModal.open} />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        isActivated={alias && address}
        width={'90%'}
        secondary
        onClick={() => onSubmit({address, alias})}>
        Add Address
      </Button>
      <AddressScanner
        onSubmit={handleAddressModalSubmit}
        onClose={addressModal.close}
        isOpen={addressModal.isOpen}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: spacings.right,
    width: '100%',
    marginBottom: 16,
    flex: 2,
  },
  label: {
    marginBottom: 4,
  },
  qrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addresInput: {
    flex: 4,
    marginRight: 8,
  },
});
