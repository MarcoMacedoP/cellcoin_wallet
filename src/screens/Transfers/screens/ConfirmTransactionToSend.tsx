import React, {useState} from 'react';
import {
  Text,
  ScreenContainer,
  Title,
  Label,
  Subtitle,
  SmallText,
  Input,
} from 'shared/styled-components';
import {RouteProp} from '@react-navigation/core';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {gasPriceInGweiToWei} from 'shared/libs/Wallet/functions/conversions';
import {sendTokens, sendETH} from 'shared/libs/Wallet';
import {notificateTransaction} from 'shared/libs/Notifications';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import Toast from 'react-native-simple-toast';
import {StyleSheet, View, Image} from 'react-native';
import {Button} from 'shared/components';
import {colors, globalStyles} from 'shared/styles';
import {ScrollView} from 'react-native-gesture-handler';

type ConfirmTransactionToSendProps = {
  route: RouteProp<AuthRootStackParams, 'ConfirmTransactionToSend'>;
  navigation: StackNavigationProp<
    AuthRootStackParams,
    'ConfirmTransactionToSend'
  >;
};

export const ConfirmTransactionToSend: React.FC<
  ConfirmTransactionToSendProps
> = ({route, navigation}) => {
  const {
    currency,
    tokenQuantityToBeSended,
    gasPrice,
    gasLimit,
    from,
    to,
  } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const currencyData = getCurrencyInfo(currency.type);

  async function onSubmitTransaction() {
    console.log('triggered onSubmit');
    setIsLoading(true);
    const gasPriceInWei = gasPriceInGweiToWei(gasPrice);
    console.log('gasPriceInWEI doned');
    try {
      let hash = '';
      if (currency.type === 'ETH') {
        hash = await sendETH(
          password,
          from,
          to,
          tokenQuantityToBeSended,
          gasPriceInWei,
          gasLimit,
        );
      } else {
        hash = await sendTokens(
          password,
          from,
          to,
          tokenQuantityToBeSended,
          gasPriceInWei,
          gasLimit,
        );
      }
      handleSuccessTransaction(hash);
    } catch (error) {
      handleFailureTransaction(error);
    }
  }
  function handleCancel() {
    if (!isLoading) {
      navigation.goBack();
    }
  }
  /** Handles all the success transactions
   * @param hash the transaction hash
   */
  function handleSuccessTransaction(hash: string) {
    setIsLoading(false);
    notificateTransaction({
      amount: tokenQuantityToBeSended,
      from,
      to,
      token: getCurrencyInfo(currency.type).tokenName,
    });
    navigation.navigate('SuccessTransaction', {
      from,
      to,
      hash,
      quantity: tokenQuantityToBeSended,
      type: currency.type,
    });
  }
  /**
   *  Handles all failure transactions
   * @param error
   */
  function handleFailureTransaction(error: string) {
    setIsLoading(false);
    if (error === 'insufficient funds for gas * price + value') {
      Toast.show('Insufficient funds for gas', Toast.SHORT);
    } else {
      Toast.show('Error: ' + error, Toast.SHORT);
    }
  }
  return (
    <ScreenContainer light>
      <View style={[styles.row, styles.headerContainer]}>
        <Image source={currencyData.logo} style={styles.logo} />
        <Text color="black" isBold>
          {tokenQuantityToBeSended} {currencyData.tokenName}
        </Text>
        <Text color="blackLigth">≈{currency.value.usd} USD</Text>
        <Label style={{color: colors.black, fontSize: 13, marginTop: 10}}>
          Insert your password to continue{' '}
        </Label>
        <Input
          style={{marginVertical: 16}}
          secureTextEntry
          align="center"
          onChangeText={setPassword}
          onSubmitEditing={() => onSubmitTransaction}
        />
      </View>
      <View style={[styles.row, styles.buttonsContainer]}>
        <Button onClick={onSubmitTransaction} isLoading={isLoading}>
          Send
        </Button>
        <Button
          outline
          onClick={handleCancel}
          style={styles.cancelButton}
          isActivated={!isLoading}>
          Cancel
        </Button>
        <SmallText style={styles.informationText} color="blackLigth">
          This transaction is operated by {`\n`}
          Ethereum network.
        </SmallText>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: colors.white,
    flex: 1,
    minHeight: 190,
  },
  logo: {marginVertical: 16, width: 40, height: 40, resizeMode: 'contain'},
  buttonsContainer: {
    justifyContent: 'flex-end',
    position: 'relative',
    flex: 1,
    zIndex: 0,
  },
  informationText: {
    alignItems: 'center',
    textAlign: 'center',
  },
  cancelButton: {
    marginVertical: 12,
  },
});
