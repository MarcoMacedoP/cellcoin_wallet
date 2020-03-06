import React from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import moment from 'moment';
import {Text, Label} from 'shared/styled-components';
import {getCurrencyInfo} from './Functions/getCurrencyInfo';
import {TokenType} from 'shared/types';
type TransactionCardProps = {
  type: TokenType;
  timestamp: number;
  action: 'send' | 'recieved';
  value: number;
};
export const TransactionCard: React.FC<TransactionCardProps> = props => {
  const {timestamp, type, action, value} = props;
  const date = new Date(timestamp * 1000);
  const {logo, tokenName} = getCurrencyInfo(type);
  return (
    <Container>
      <Row>
        <LogoContainer>
          <Logo source={logo} />
        </LogoContainer>
        <InfoContainer>
          <Value>
            {value.toFixed(2)} {tokenName}
          </Value>
          <DateLabel>
            {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
          </DateLabel>
        </InfoContainer>
      </Row>
      <InfoContainer align="flex-end">
        <Action>{action}</Action>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${colors.white};
  padding: 8px;
  margin-bottom: 4px;
  height: 60px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const InfoContainer = styled.View<{align?: 'flex-start' | 'flex-end'}>`
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: ${props => (props.align ? props.align : 'flex-start')};
`;
const Action = styled(Label)`
  color: ${colors.white};
  font-size: 12px;
  background-color: ${colors.accent};
  border-radius: 8px;
  padding: 2px 12px;
`;
const DateLabel = styled(Label)`
  font-size: 12px;
`;
const LogoContainer = styled.View`
  height: 100%;
  width: 12%;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

const Value = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;
