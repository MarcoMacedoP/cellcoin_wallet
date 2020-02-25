import React, {useState} from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';

type BalanceHeaderComponentProps = {
  assets: string;
};
export const BalanceHeaderComponent: React.FC<BalanceHeaderComponentProps> = ({
  assets,
}) => {
  const [isHiddenValues, setIsHiddenValues] = useState(false);

  return (
    <Container source={require('assets/images/agave_background.png')}>
      <AssetsContainer>
        <Title lenght={assets ? assets.length : 0} >{assets || '----'}</Title>
        <SmallText lenght={assets ? assets.length : 0} >$</SmallText>
      </AssetsContainer>
    </Container>
  );
};

const Container = styled.ImageBackground`
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 35.6%;
  margin-bottom: 16px;
  resize-mode: cover;
  background-color: ${colors.primary};
  margin: -16px 0;
`;

const AssetsContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
type BalanceTitleProps = {
  lenght?: number
};
const Title = styled.Text<BalanceTitleProps>`
  font-size: ${props => props.lenght > 10 ? '23px': '48px'};
  font-weight: bold;
  color: ${colors.white};
  margin: ${props => props.lenght > 10 ? '18px 8px' : '0 8px'};
`;
const SmallText = styled.Text<BalanceTitleProps>`
  font-size: ${props => props.lenght > 10 ? '18px' : '24px'};
  color: ${colors.white};
  font-weight: normal;
  position: relative;
  top: 14px;
`;
