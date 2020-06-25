import React from 'react';
import styled from 'styled-components/native';
import {colors, globalStyles} from 'shared/styles';
import {View, StyleSheet} from 'react-native';
import {CurrencyType} from 'shared/types';
import {Text, SmallText} from 'shared/styled-components';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {LoadingCurrency} from 'shared/components';
import {TouchableHighlight} from 'react-native-gesture-handler';

type CurrencyProps = {
  onClick: () => void;
  currency: CurrencyType;
  isLoading: boolean;
};
export const Currency: React.FC<CurrencyProps> = props => {
  const {
    onClick,
    isLoading,
    currency: {name, type, value},
  } = props;
  const {logo, tokenName} = getCurrencyInfo(type);

  return isLoading ? (
    <LoadingCurrency />
  ) : (
    <TouchableHighlight
      style={styles.container}
      onPress={onClick}
      underlayColor={colors.whiteDark}>
      <InfoContainer>
        <TitleContainer>
          <Image source={logo} />
          <View style={styles.textContainer}>
            <Text upperCase> {tokenName}</Text>
            <SmallText style={{marginLeft: 4}}>{name}</SmallText>
          </View>
        </TitleContainer>
        <View>
          <CurrencyStatus>{value.original}</CurrencyStatus>
          <CurrencyInLocal>${value.usd}</CurrencyInLocal>
        </View>
      </InfoContainer>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.cardShadow,
    backgroundColor: colors.white,
    padding: 16,
  },
  textContainer: {
    marginLeft: 3,
    paddingLeft: 8,
  },
});

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
