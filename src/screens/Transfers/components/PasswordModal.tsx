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
  const handleSubmit = async () => {
    try {
    } catch (error) {}
    onDoned(password);
    // onClose();
  };
  return (
    <RawModal isShowed={isShowed} onClose={onClose}>
      <Subtitle> Confirm your order </Subtitle>
      <Image
        source={
          transactionData.currency === 'AGVC'
            ? require('assets/icons/agave_coin_icon.png')
            : require('assets/icons/ethereum_icon.png')
        }
      />
      <Label style={{color: colors.black}}>
        {' '}
        {transactionData.amount} {transactionData.currency}{' '}
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
      <Button onClick={handleSubmit}>Send</Button>
      <SmallText style={{color: colors.blackLigth, marginTop: 15}}>
        This transaction is operated by
      </SmallText>
      <SmallText style={{color: colors.blackLigth}}>
        Ethereum network.
      </SmallText>
    </RawModal>
  );
};
const InputBox = styled(Input)`
  border-radius: 4px;
  background-color: ${colors.lightGray};
`;
const Image = styled.Image`
  width: 40px;
  height: 40px;
  margin: 15px 0;
`;
