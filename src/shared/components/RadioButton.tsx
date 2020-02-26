import React from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';

type RadioButtonType = React.FC<{
  isActivated: boolean;
  onClick: () => void;
  text: string;
}>;
export const RadioButton: RadioButtonType = ({isActivated, onClick, text}) => (
  <Container onPress={onClick}>
    <DotContainer>
      <Dot isActivated={isActivated} />
    </DotContainer>
    <Text isActivated={isActivated}>{text}</Text>
  </Container>
);

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DotContainer = styled.View`
  border-width: 1px;
  border-color: #2fa0a8;
  border-radius: 150px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
const Dot = styled.View<{isActivated: boolean}>`
  background-color: ${props =>
    props.isActivated ? colors.accent : colors.gray};
  border-radius: 50px;
  margin: 8px;
  width: 10px;
  height: 10px;
`;
const Text = styled.Text<{isActivated: boolean}>`
  font-size: 15px;
  text-align: center;
  margin-left: 8px;
  color: ${props => (props.isActivated ? colors.accent : colors.gray)};
`;
