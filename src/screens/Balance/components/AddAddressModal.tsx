import React from 'react';
import {Modal, Button} from 'shared/components';
import {StyleSheet, View} from 'react-native';
import {Label, Input} from 'shared/styled-components';
import {colors} from 'shared/styles';

type AddAddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  alias: string;
  onAliasChange: (alias: string) => void;
  onSubmit: () => void;
};

/**
 *  Shows a modal to add an address
 * @param props
 */
export const AddAddressModal: React.FC<AddAddressModalProps> = props => {
  return (
    <Modal isShowed={props.isOpen} icon={'x'} onClose={props.onClose}>
      <View style={styles.inputContainer}>
        <Label>Wallet name</Label>
        <Input
          align="left"
          value={props.alias}
          maxLength={15}
          keyboardAppearance={'dark'}
          onChangeText={props.onAliasChange}
        />
      </View>
      <Button
        isActivated={props.alias ? true : false}
        width={'90%'}
        onClick={props.onSubmit}>
        Add Wallet
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    paddingVertical: 8,
    width: '90%',
    backgroundColor: colors.whiteDark,
    borderRadius: 4,
  },
});
