import styled from 'styled-components/native';
import { Text } from './Texts';
import { colors } from 'shared/styles';

export type InputProps = {
  align: 'left' | 'center' | 'right';
};
export const Input = styled.TextInput<InputProps>`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  text-align: ${props => props.align || 'center'};
  font-size: 15px;
  background-color: ${colors.whiteDark};
  padding: 0 16px;
`;
export const Label = styled(Text)`
  text-align: ${props => (props.center ? 'center' : 'justify')};
  text-transform: none;
`;
type TextAreaProps = {
  hasError?: boolean;
};
export const TextArea = styled.TextInput<TextAreaProps>`
  height: 150px;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  padding: 16px;
  background-color: ${colors.whiteDark};
  border-radius: 15px;
  color: ${props => (props.hasError ? colors.error : colors.black)};
  border: ${props => (props.hasError ? `1px ${colors.error}` : 'none')};
`;
