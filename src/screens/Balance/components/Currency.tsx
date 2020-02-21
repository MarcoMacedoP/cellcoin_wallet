import React from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {View} from 'react-native';
import {CurrencyType} from 'shared/types';
import {Text, SmallText} from 'shared/styled-components';

type BalanceCurrencyComponentProps = {
  onClick: () => void;
  currency: CurrencyType;
};
export const BalanceCurrencyComponent: React.FC<BalanceCurrencyComponentProps> = props => {
  const {
    onClick,
    currency: {name, type, value},
  } = props;
  return (
    <Container onPress={onClick} underlayColor={colors.whiteDark}>
      <InfoContainer>
        <TitleContainer>
          <Image
            source={
              type === 'AGVC'
                ? require('assets/icons/agave_coin_icon.png')
                : require('assets/icons/ethereum_icon.png')
            }
          />
          <View style={{marginLeft: 3, paddingLeft: 8}}>
            <Text upperCase> {type}</Text>
            <SmallText style={{marginLeft: 4}}>{name}</SmallText>
          </View>
        </TitleContainer>
        <View>
          <CurrencyStatus>{value}</CurrencyStatus>
          <CurrencyInLocal>$={value}</CurrencyInLocal>
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
`;
const Image = styled.Image`
  width: 30px;
  height: 30px;
`;
const CurrencyStatus = styled(Text)`
  font-weight: bold;
`;
const CurrencyInLocal = styled.Text`
  font-size: 12px;
  color: ${colors.blackLigth};
`;
