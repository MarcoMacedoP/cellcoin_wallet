import {Modal, Button} from 'shared/components';
import React, {useState} from 'react';
import {Text, Input} from 'shared/styled-components';
import styled from 'styled-components/native';

type PasswordModalType = React.FC<{
  onDoned: (password: string) => void;
  isShowed: boolean;
  onClose: () => void;
}>;

export const PasswordModal: PasswordModalType = ({
  onDoned,
  isShowed,
  onClose,
}) => {
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    onDoned(password);
    onClose();
  };
  return (
    <Modal
      isShowed={isShowed}
      onClose={onClose}
      icon="x"
      title="Enter your password to complete the transaction">
      <Container>
        <Input
          style={{marginVertical: 16}}
          secureTextEntry
          align="center"
          onChangeText={text => setPassword(text)}
          onSubmitEditing={handleSubmit}
        />
        <Button onClick={handleSubmit}>Ok</Button>
      </Container>
    </Modal>
  );
};
const Container = styled.View`
  padding: 16px;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
`;
