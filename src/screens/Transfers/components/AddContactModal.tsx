import React, {useState} from 'react';
import {Modal, Button, QrIcon, AddressScanner} from 'shared/components';
import {Input, Label} from 'shared/styled-components';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, spacings} from 'shared/styles';
import {Contact} from 'shared/types/interfaces';
import {useModal} from 'shared/hooks';
import {isAddress} from 'shared/validations';
import Toast from 'react-native-simple-toast';

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
  const initalState = {
    alias: '',
    address: '',
  };
  const [{alias, address}, setState] = useState(initalState);
  function handleAddressModalSubmit(address: string) {
    setState(state => ({...state, address}));
    addressModal.close();
  }
  function handleSubmit() {
    if (isAddress(address)) {
      onSubmit({address, alias});
      setState(initalState);
    } else {
      Toast.show('Invalid address');
      setState({alias, address: ''});
    }
  }
  return (
    <Modal isShowed={isOpen} icon={'x'} onClose={onClose} title="Save address">
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Label style={styles.label} color="primary">
            Alias
          </Label>
          <Input
            align="left"
            value={alias}
            placeholder="John Doe"
            maxLength={15}
            keyboardAppearance={'dark'}
            onChangeText={(alias: string) =>
              setState(state => ({...state, alias}))
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Label style={styles.label} color="primary">
            Address
          </Label>
          <View style={styles.qrContainer}>
            <Input
              style={styles.addresInput}
              align="left"
              placeholder="0xFFFFFFFFFFFFFFFFFFFFF"
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
      </View>
      <Button
        isActivated={alias && address && true}
        width={'90%'}
        secondary
        onClick={handleSubmit}>
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
    paddingVertical: 16,
    backgroundColor: colors.whiteDark,
    width: '100%',
    marginBottom: 16,
    flex: 2,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: spacings.right,
  },
  label: {
    marginBottom: 4,
  },
  qrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  addresInput: {
    flex: 4,
    overflow: 'hidden',
    marginRight: 8,
    paddingBottom: 16,
  },
});
