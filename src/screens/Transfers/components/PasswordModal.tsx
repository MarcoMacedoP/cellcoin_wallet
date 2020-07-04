import {Modal, Button} from 'shared/components';
import React, {useState} from 'react';
import {
  Text,
  Input,
  Label,
  SmallText,
  Subtitle,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {RawModal} from 'shared/components/RawModal';
import {colors} from 'shared/styles/variables';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyles} from 'shared/styles';

type PasswordModalType = React.FC<{
  onDoned: (password: string) => void;
  isShowed: boolean;
  onClose: () => void;
  transactionData: any;
}>;

export const PasswordModal: PasswordModalType = ({
  onDoned,
  isShowed,
  onClose,
  transactionData,
}) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onDoned(password);
  };

  return (
    <RawModal
      isShowed={isShowed}
      onClose={onClose}
      renderHeaderLine={false}
      contentContainerStyle={styles.modalContentContainer}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1, width: '100%'}}>
        <View style={[styles.row, styles.headerContainer]}>
          <Subtitle> Confirm your order </Subtitle>
          <Image
            source={
              transactionData.currency === 'AGVC'
                ? require('assets/icons/token_icon.png')
                : require('assets/icons/ethereum_icon.png')
            }
          />
          <Label style={{color: colors.black}}>
            {transactionData.amount} {transactionData.currency}
          </Label>
          <SmallText
            style={{
              textTransform: 'uppercase',
              color: colors.blackLigth,
              fontSize: 13,
            }}>
            ≈{transactionData.usd} USD
          </SmallText>
          <Label style={{color: colors.black, fontSize: 13, marginTop: 10}}>
            {' '}
            Insert your password to continue{' '}
          </Label>
          <InputBox
            style={{marginVertical: 16}}
            secureTextEntry
            align="center"
            onChangeText={text => setPassword(text)}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={[styles.row, styles.buttonsContainer]}>
          <Button onClick={handleSubmit}>Send</Button>
          <Button outline onClick={onClose} style={styles.cancelButton}>
            Cancel
          </Button>
          <SmallText style={styles.informationText} color="blackLigth">
            This transaction is operated by {`\n`}
            Ethereum network.
          </SmallText>
        </View>
      </KeyboardAvoidingView>
    </RawModal>
  );
};

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
  },
  scrollViewContentContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  row: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'red',
    flex: 2,
  },
  buttonsContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  informationText: {
    alignItems: 'center',
    textAlign: 'center',
  },
  cancelButton: {
    marginVertical: 12,
  },
});

const InputBox = styled(Input)`
  border-radius: 4px;
  background-color: ${colors.lightGray};
`;
const Image = styled.Image`
  width: 40px;
  height: 40px;
  margin: 15px 0;
`;
