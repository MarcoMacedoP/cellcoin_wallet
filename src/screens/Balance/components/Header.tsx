import React from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {FadeInView} from 'shared/components';

const headerImage = require('assets/images/balance_background.png');

type BalanceHeaderComponentProps = {
  assets: string;
};

export const BalanceHeader: React.FC<BalanceHeaderComponentProps> = ({
  assets,
}) => {
  return (
    <Container source={headerImage} resizeMode="cover">
      {assets && (
        <FadeInView>
          <AssetsContainer>
            <Title lenght={assets.length}>{assets}</Title>
            <SmallText lenght={assets.length}>$</SmallText>
          </AssetsContainer>
        </FadeInView>
      )}
    </Container>
  );
};

const Container = styled.ImageBackground`
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 300px;
  margin-bottom: 16px;
  background-color: ${colors.primary};
  margin: -16px 0;
  overflow: hidden;
`;

const AssetsContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
`;
type BalanceTitleProps = {
  lenght?: number;
};
const Title = styled.Text<BalanceTitleProps>`
  font-size: ${props => (props.lenght > 10 ? '23px' : '48px')};
  font-weight: bold;
  color: ${colors.white};
  margin: ${props => (props.lenght > 10 ? '18px 8px' : '0 8px')};
`;
const SmallText = styled.Text<BalanceTitleProps>`
  font-size: ${props => (props.lenght > 10 ? '18px' : '24px')};
  color: ${colors.white};
  font-weight: normal;
  position: relative;
  top: 14px;
`;
