import styled from 'styled-components/native';
import { colors, Color } from '../styles';


export const H4 = styled.Text`
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  color: ${colors.black};
`;

type TextProps = {
  isBold?: boolean;
  center?: boolean;
  color?: Color;
  upperCase?: boolean;
};
export const Text = styled.Text<TextProps>`
  text-transform: ${props => (props.upperCase ? 'uppercase' : 'none')};
  font-weight: ${props => (props.isBold ? 'bold' : '400')};
  font-size: 16px;
  color: ${props => props.color ? colors.hasOwnProperty(props.color) ? colors[props.color] : colors.black : colors.black};
  text-align: ${props => (props.center ? 'center' : 'left')};
`;
export const SmallText = styled(Text)`
  font-size: 12px;
`;
export const Title = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 30px;
`;
export const Subtitle = styled(Title)`
  font-size: 24px;
  font-weight: 600;
`;