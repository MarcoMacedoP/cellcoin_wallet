import React from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {View} from 'react-native';
import {CurrencyType} from 'shared/types';
import {Text, SmallText} from 'shared/styled-components';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';

type BalanceCurrencyComponentProps = {
  onClick: () => void;
  currency: CurrencyType;
};
export const BalanceCurrencyComponent: React.FC<
  BalanceCurrencyComponentProps
> = props => {
  const {
    onClick,
    currency: {name, type, value},
  } = props;
  const {logo, tokenName} = getCurrencyInfo(type);

  return (
    <Container onPress={onClick} underlayColor={colors.whiteDark}>
      <InfoContainer>
        <TitleContainer>
          <Image source={logo} />
          <View style={{marginLeft: 3, paddingLeft: 8}}>
            <Text upperCase> {type === 'TOKEN' ? 'AGVC' : type}</Text>
            <SmallText style={{marginLeft: 4}}>{name}</SmallText>
          </View>
        </TitleContainer>
        <View>
          <CurrencyStatus>{value.original}</CurrencyStatus>
          <CurrencyInLocal>$={String(value.usd)}</CurrencyInLocal>
        </View>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.TouchableHighlight`
  background-color: ${colors.white};
  margin-bottom: 16px;
  padding: 16px;
  border-bottom-width: 1.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
const InfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  width: 30px;
  height: 30px;
`;
const CurrencyStatus = styled(Text)`
  font-weight: bold;
  text-align: right;
`;
const CurrencyInLocal = styled.Text`
  font-size: 12px;
  text-align: right;
  color: ${colors.blackLigth};
`;
