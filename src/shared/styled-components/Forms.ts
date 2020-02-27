import styled from 'styled-components/native';
import {Text} from './Texts';
import {colors} from 'shared/styles';

type InputProps = {
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
export const Label = styled(Text).attrs(() => ({
  color: 'ligth',
}))`
  text-align: ${props => (props.center ? 'center' : 'justify')};
  text-transform: none;
`;
export const TextArea = styled.TextInput`
  height: 150px;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  padding: 16px;
  background-color: ${colors.whiteDark};
  border-radius: 15px;
`;
