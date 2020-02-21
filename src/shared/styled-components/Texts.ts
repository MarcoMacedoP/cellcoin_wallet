import styled from 'styled-components/native';
import {colors} from '../styles';

export const Title = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 40px;
  color: ${colors.black};
  margin-left: 8px;
`;
export const H4 = styled.Text`
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: ${colors.black};
`;
export const Subtitle = styled(Title)`
  font-size: 24px;
  text-transform: capitalize;
  color: ${colors.blackLigth};
  font-weight: 600;
`;
type TextProps = {
  isBold?: boolean;
  center?: boolean;
  color?: 'ligth' | 'normal';
  upperCase?: boolean;
};
export const Text = styled.Text<TextProps>`
  text-transform: ${props => (props.upperCase ? 'uppercase' : 'capitalize')};
  font-weight: ${props => (props.isBold ? 'bold' : '400')};
  font-size: 16px;
  color: ${props =>
    props.color === 'ligth' ? colors.blackLigth : colors.black};

  text-align: ${props => (props.center ? 'center' : 'justify')};
`;
export const SmallText = styled(Text)`
  font-size: 12px;
`;
