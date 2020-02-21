import React from 'react';
import styled from 'styled-components/native';
import BaseIcon from 'react-native-vector-icons/FontAwesome';

export const PasswordLabelBox = ({isValid, text}) => (
  <LabelBox>
    <Icon
      name={isValid ? 'check' : 'exclamation-circle'}
      size={15}
      isValid={isValid}
    />
    <LabelAlert isValid={isValid}>{text}</LabelAlert>
  </LabelBox>
);
const Icon = styled(BaseIcon)`
  color: ${props => (props.isValid ? 'green' : 'red')};
  margin-right: 12px;
`;
const LabelAlert = styled.Text`
  font-size: 15px;
  color: ${props => (props.isValid ? 'green' : 'red')};
  text-align: justify;
`;

const LabelBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  padding: 8px 2px;
`;
