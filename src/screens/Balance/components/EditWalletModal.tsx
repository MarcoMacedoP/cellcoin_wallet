import React, {useState, useEffect} from 'react';
import {RawModal} from 'shared/components/RawModal';
import {WalletListItem} from 'shared/types/interfaces';
import {Title} from 'shared/styled-components';
import {StyleSheet} from 'react-native';
import {Input, Button} from 'shared/components';
import {colors} from 'shared/styles';

type EditWalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedAddress: WalletListItem) => void;
  onDelete: (wallet: WalletListItem) => void;
  wallet: WalletListItem;
};
export const EditWalletModal: React.FC<EditWalletModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  wallet,
  onDelete,
}) => {
  const [updatedName, setUpdatedName] = useState(wallet?.alias || "");
  const handleSubmit = () => {
    onSubmit({...wallet, alias: updatedName});
  };
  useEffect(() => {
      if(wallet?.alias){
          setUpdatedName(wallet.alias);
      }
  }, [wallet]);
  return (
    <RawModal
      isShowed={isOpen}
      onClose={onClose}
      renderHeaderLine>
      <Title style={styles.title}>Edit wallet</Title>
      <Input
        label="Wallet name"
        value={updatedName}
        onChangeText={setUpdatedName}
        align="left"
      />
      <Button style={styles.submitButton} onClick={handleSubmit}>
        Save
      </Button>
      <Button style={styles.deleteButton} onClick={onDelete}>
        Delete
      </Button>
    </RawModal>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 6,
  },
  deleteButton: {
    backgroundColor: colors.error,
    marginBottom: 6,
  },
});
