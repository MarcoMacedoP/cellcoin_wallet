import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import {Text} from 'shared/styled-components/Texts';
import {ScreenContainer} from 'shared/styled-components';
import {colors} from 'shared/styles';
import {View} from 'react-native';
import {Button} from 'shared/components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RouteProp} from '@react-navigation/native';
import {useGlobalState} from 'globalState';
import {
  AddressScanner,
  QrIcon,
  Input as InputComponent,
} from 'shared/components';
import Toast from 'react-native-simple-toast';
import {PasswordModal} from '../components/PasswordModal';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {sendETH, sendTokens, useGasPrice} from 'shared/libs/Wallet';
import {useModal} from 'shared/hooks';
import {isAddress} from 'shared/validations';
import {notificateTransaction} from 'shared/libs/Notifications';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {GasFeeSelector} from '../components/GasFeeSelector';
import {gasPriceInGweiToWei} from 'shared/libs/Wallet/functions/conversions';
import {TouchableOpacity, StyleSheet} from 'react-native';

type SetAddressScreenProps = {
  route: RouteProp<AuthRootStackParams, 'ConfirmSend'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'ConfirmSend'>;
};

export const ConfirmSend: React.FC<SetAddressScreenProps> = ({
  route: {params},
  navigation,
}) => {
  const addressModal = useModal();
  const passwordModal = useModal();
  const {currency, tokenQuantityToBeSended, selectedAddress} = params;
  const [mainAddress] = useGlobalState('mainAddress');
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    amount: tokenQuantityToBeSended,
    to: selectedAddress || '',
    balance: parseFloat(currency.value.original),
  });

  const {
    fee,
    error,
    gasLimit,
    gasPrice,
    status,
    onGasPriceChange,
  } = useGasPrice({
    from: mainAddress,
    amount: state.amount,
    to: state.to,
    type: currency.type,
  });

  useEffect(() => {
    if (selectedAddress) {
      setState(state => ({...state, to: selectedAddress}));
    }
  }, [selectedAddress]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <QrIcon
          tintColor={tintColor}
          onPress={addressModal.open}
          style={styles.qrIcon}
        />
      ),
    });
  }, []);

  function handleAddressModalSelection(address: string) {
    setState(state => ({...state, to: address}));
    addressModal.close();
  }

  async function onSubmitTransaction(password: string) {
    passwordModal.close();
    const gasPriceInWei = gasPriceInGweiToWei(gasPrice);
    try {
      let hash = '';
      if (currency.type === 'ETH') {
        hash = await sendETH(
          password,
          mainAddress,
          state.to,
          state.amount,
          gasPriceInWei,
          gasLimit,
        );
      } else {
        hash = await sendTokens(
          password,
          mainAddress,
          state.to,
          state.amount,
          gasPriceInWei,
          gasLimit,
        );
      }
      handleSuccessTransaction(hash);
    } catch (error) {
      handleFailureTransaction(error);
    }
  }

  /** Handles all the success transactions
   * @param hash the transaction hash
   */
  function handleSuccessTransaction(hash: string) {
    setIsLoading(false);
    notificateTransaction({
      amount: tokenQuantityToBeSended,
      from: mainAddress,
      to: selectedAddress,
      token: getCurrencyInfo(currency.type).tokenName,
    });
    navigation.navigate('SuccessTransaction', {
      from: mainAddress,
      to: state.to,
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
    console.log({error});
    setIsLoading(false);
    if (error === 'insufficient funds for gas * price + value') {
      Toast.show('Insufficient funds for gas', Toast.SHORT);
    } else {
      Toast.show('Error: ' + error, Toast.SHORT);
    }
  }

  const setAddressText = (text: string) => {
    setState({...state, to: text});
  };

  return (
    <ScreenContainer light justify="space-between">
      <View style={styles.form}>
        <Text isBold style={styles.amountToSend}>
          Amount to send: {state.amount}
        </Text>
        <InputComponent
          align="left"
          label="To"
          value={state.to}
          onChangeText={setAddressText}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ContactsList', {
                currency: params.currency,
                tokenQuantityToBeSended: params.tokenQuantityToBeSended,
              })
            }>
            <Icon name="address-book" size={20} color={colors.accent} />
          </TouchableOpacity>
        </InputComponent>
        <GasFeeSelector
          fee={fee}
          isLoading={status === 'loading'}
          error={error}
          gasLimit={gasLimit}
          gasPrice={gasPrice}
          onChange={onGasPriceChange}
          isEnabled={isAddress(state.to)}
        />
      </View>

      <Button
        secondary
        // isActivated={isAddress(state.to)}
        onClick={passwordModal.open}
        isLoading={isLoading}>
        Confirm
      </Button>
      <AddressScanner
        onSubmit={handleAddressModalSelection}
        onClose={addressModal.close}
        isOpen={addressModal.isOpen}
      />
      <PasswordModal
        transactionData={{
          currency: currency.type,
          amount: state.amount,
          usd:
            (parseFloat(currency.value.usd) /
              parseFloat(currency.value.original)) *
            parseFloat(state.amount),
        }}
        isShowed={passwordModal.isOpen}
        onClose={passwordModal.close}
        onDoned={onSubmitTransaction}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  qrIcon: {
    padding: 8,
  },
  amountToSend: {
    marginTop: 8,
    textAlign: 'left',
    marginBottom: 12,
  },
  form: {
    width: '100%',
    flex: 1,
    marginBottom: 12,
    maxHeight: '70%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
