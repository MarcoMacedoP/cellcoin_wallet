import React, {useState, useMemo, useReducer, Reducer} from 'react';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {colors} from 'shared/styles/variables';
import {Label} from 'shared/styled-components';
import {Button, ScreenContainer, NumericKeyboard} from 'shared/components';
import Toast from 'react-native-simple-toast';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from 'shared/styles';
import {AuthRootStackParams} from 'Router';
import {TokenType, CurrencyType} from 'shared/types';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {View, StyleSheet} from 'react-native';
import {NOT_ENOUGHT_BALANCE_MESSAGE} from 'shared/constants';
import {StackNavigationProp} from '@react-navigation/stack';

type SendScreenProps = {
  route: RouteProp<AuthRootStackParams, 'SetQuantityToSend'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'SetQuantityToSend'>;
};
const initialState: QuantityState = {
  token: '0',
  usd: '0',
};

export const SetQuantityToSend: React.FC<SendScreenProps> = ({
  route: {params: currency},
  navigation,
}) => {
  const [{token, usd}, dispatch] = useReducer(quantityReducer, initialState);

  const [activeCurrency, setActiveCurrency] = useState<'USD' | TokenType>(
    'USD',
  );

  const changeCurrentCurrency = () => {
    if (activeCurrency === currency.type) setActiveCurrency('USD');
    else setActiveCurrency(currency.type);
  };

  const handleQuantityChange = (value: string) => {
    const payload = {value, currency};
    if (activeCurrency === currency.type) {
      dispatch({type: 'set-token', payload});
    } else {
      dispatch({type: 'set-usd', payload});
    }
  };

  const setMaximun = () => {
    if (activeCurrency === currency.type)
      handleQuantityChange(currency.value.original);
    else handleQuantityChange(currency.value.usd);
  };

  function handleSubmit() {
    navigation.navigate('SetFeeDestinationToSend', {
      currency,
      tokenQuantityToBeSended: token,
    });
  }

  return (
    <ScreenContainer light>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}>
        <TouchableOpacity
          onPress={changeCurrentCurrency}
          style={styles.currencyContainer}>
          <LabelCurrency active={activeCurrency === 'USD'}>
            {parseFloat(usd).toFixed(2) || '0.00'} USD
          </LabelCurrency>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={changeCurrentCurrency}
          style={styles.currencyContainer}>
          <LabelCurrency active={activeCurrency === currency.type}>
            {token || '0.00'} {getCurrencyInfo(currency.type).tokenName}
          </LabelCurrency>
        </TouchableOpacity>
        <Button onClick={setMaximun} outline>
          <Label>
            Use maximun available:{' '}
            {activeCurrency === currency.type
              ? parseFloat(currency.value.original).toFixed(2)
              : parseFloat(currency.value.usd).toFixed(2)}
          </Label>
        </Button>
        <NumericKeyboard
          value={activeCurrency === 'USD' ? usd : token}
          onPress={handleQuantityChange}
        />
      </ScrollView>
      <Button
        secondary
        isActivated={isValidQuantity(token, currency.value.original)}
        onClick={handleSubmit}>
        Send
      </Button>
    </ScreenContainer>
  );
};

type QuantityState = {
  token: string | null;
  usd: string | null;
};
type QuantityAction = {
  type: 'set-token' | 'set-usd';
  payload: {
    value: string;
    currency: CurrencyType;
  };
};

const quantityReducer: Reducer<QuantityState, QuantityAction> = (
  state = initialState,
  {type, payload},
) => {
  const {currency} = payload;
  console.log(currency);
  const tokenValueInUSD =
    parseFloat(currency.value.usd) / parseFloat(currency.value.original);
  switch (type) {
    case 'set-usd': {
      if (!isValidQuantity(payload.value, currency.value.usd)) {
        return initialState;
      }
      //convert usd value to token value
      const usd = parseFloat(payload.value);
      const tokenValueFromUSD = (usd / tokenValueInUSD).toFixed(2);
      return {
        token: tokenValueFromUSD,
        usd: String(usd),
      };
    }
    case 'set-token': {
      //convert token value to USD
      if (!isValidQuantity(payload.value, currency.value.original)) {
        return initialState;
      }
      const token = parseFloat(payload.value);
      const usdValueFromToken = (token * tokenValueInUSD).toFixed(2);
      return {
        token: String(token),
        usd: usdValueFromToken,
      };
    }
    default:
      return state;
  }
};

function isValidQuantity(quantity: string, maxQuantity: string) {
  if (!quantity || quantity === '' || quantity === '0') {
    return false;
  }
  const parsedQuantity = parseFloat(quantity);
  const firstAreGreater = areFirstQuantityGreater(
    parsedQuantity,
    parseFloat(maxQuantity),
  );
  console.log({
    quantity,
    maxQuantity,
    firstAreGreater,
  });
  if (isNaN(parsedQuantity)) {
    return false;
  } else if (firstAreGreater) {
    Toast.show(NOT_ENOUGHT_BALANCE_MESSAGE);
  } else {
    return true;
  }
}

/**
 *  Deep compare two floats to determinate wich one is greater.
 * @param first
 * @param second
 */
function areFirstQuantityGreater(first: number, second: number) {
  const [firstFixed, secondFixed] = [first.toFixed(9), second.toFixed(9)];
  const [firstParsed, secondParsed] = [
    parseFloat(firstFixed),
    parseFloat(secondFixed),
  ];
  return firstParsed > secondParsed;
}

type LabelCurrencyProps = {
  active?: boolean;
};
const LabelCurrency = styled(Label)<LabelCurrencyProps>`
  font-size: ${props => (props.active ? '25px' : '15px')};
  color: ${props => (props.active ? colors.black : colors.blackLigth)};
`;

const styles = StyleSheet.create({
  scrollContentContainer: {
    alignItems: 'center',
  },
  currencyContainer: {
    margin: 15,
  },
  line: {
    borderWidth: 1,
    opacity: 0.2,
    borderColor: colors.blackLigth,
    width: '100%',
  },
});
