import React from 'react';
import {Modal, Button} from 'shared/components';
import {View, StyleSheet} from 'react-native';
import {styles as sharedStyles} from '../styles';
import {Text, Title} from 'shared/styled-components';
const webcam = require('assets/icons/webcam.png');

type MnemonicIntroModalProps = {
  isShowed: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const MnemonicIntroModal: React.FC<MnemonicIntroModalProps> = ({
  isShowed,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal isShowed={isShowed} image={webcam} onClose={onClose}>
      <View style={[styles.modalContainer]}>
        <View
          style={[sharedStyles.mnemonicTextContainer, styles.textContainer]}>
          <Title style={sharedStyles.mnemonicText}>
            Having the mnemonic phrases can have full control over assets. Users
            should be aware of the following matters
            {'\n'}
          </Title>
          <Text style={[sharedStyles.mnemonicLabel]}>
            Never take screenshots. Pay close attention to cameras around.
            {'\n\n'}
            Write down the words on paper and keep it in isolated from the
            internet, Prohibit the disclosure or publicity of mnemonics in any
            form or method.
            {'\n\n'}
            Please make sure to keep a paper copy of your mnemonic phrases.
            Agave Coin is not liable for the loss of digital assets resulting
            from the loss, damage or other loss of control over the paper copy
            of mnemonic phrases.
          </Text>
        </View>
        <Button onClick={onSubmit}>Continue</Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    paddingHorizontal: 22,
    flex: 1,
  },
  textContainer: {
    marginBottom: 20,
  },
});
