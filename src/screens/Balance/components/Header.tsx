import React, {useState} from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';

type BalanceHeaderComponentProps = {
  assets: number;
};
export const BalanceHeaderComponent: React.FC<BalanceHeaderComponentProps> = ({
  assets,
}) => {
  const [isHiddenValues, setIsHiddenValues] = useState(false);

  return (
    <Container source={require('assets/images/agave_background.png')}>
      <AssetsContainer>
        <Title>{assets}</Title>
        <SmallText>$</SmallText>
      </AssetsContainer>
    </Container>
  );
};

const Container = styled.ImageBackground`
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  height: 35%;
  margin-bottom: 16px;
  resize-mode: cover;
  background-color: ${colors.primary};
`;

const AssetsContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const Title = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${colors.white};
  margin: 0 8px;
`;
const SmallText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
  font-weight: normal;
  position: relative;
  top: 14px;
`;
