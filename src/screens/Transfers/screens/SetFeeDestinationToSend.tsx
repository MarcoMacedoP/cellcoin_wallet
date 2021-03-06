import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import {Text} from 'shared/styled-components/Texts';
import {ScreenContainer} from 'shared/styled-components';
import {colors, globalStyles} from 'shared/styles';
import {ScrollView} from 'react-native';
import {Button} from 'shared/components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RouteProp} from '@react-navigation/native';
import {useGlobalState} from 'globalState';
import {
  AddressScanner,
  QrIcon,
  Input as InputComponent,
} from 'shared/components';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {useGasPrice} from 'shared/libs/Wallet';
import {useModal} from 'shared/hooks';
import {isAddress} from 'shared/validations';
import {GasPriceSelector} from '../components/GasPriceSelector';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {GasLimitSelector} from '../components/GasLimitSelector';

type SetAddressScreenProps = {
  route: RouteProp<AuthRootStackParams, 'SetFeeDestinationToSend'>;
  navigation: StackNavigationProp<
    AuthRootStackParams,
    'SetFeeDestinationToSend'
  >;
};
export const SetFeeDestinationToSend: React.FC<SetAddressScreenProps> = ({
  route: {params},
  navigation,
}) => {
  const addressModal = useModal();
  const {currency, tokenQuantityToBeSended, selectedAddress} = params;
  const [mainAddress] = useGlobalState('mainAddress');
  const [state, setState] = useState({
    amount: tokenQuantityToBeSended,
    to: selectedAddress || '',
    balance: parseFloat(currency.value.original),
  });
  const {values, onGasPriceChange, onGasLimitChange} = useGasPrice({
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

  const gasLimit =
    currency.type === 'ETH' ? values.gasLimit.eth : values.gasLimit.token;

  function handleAddressModalSelection(address: string) {
    setState(state => ({...state, to: address}));
    addressModal.close();
  }

  function handleNavigation() {
    navigation.navigate('ConfirmTransactionToSend', {
      currency,
      gasLimit: parseFloat(gasLimit.toFixed(2)),
      gasPrice: values.gasPrice,
      tokenQuantityToBeSended,
      from: mainAddress,
      to: state.to,
    });
  }

  const setAddressText = (text: string) => {
    setState({...state, to: text});
  };

  return (
    <ScreenContainer light justify="space-between">
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContentContainer}>
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
            <Icon name="address-book" size={20} color={colors.primary} />
          </TouchableOpacity>
        </InputComponent>
        <GasPriceSelector
          fee={values.fee}
          gasLimit={gasLimit}
          gasPrice={values.gasPrice}
          onChange={onGasPriceChange}
          isEnabled={isAddress(state.to)}
        />
        <GasLimitSelector
          isEnabled={isAddress(state.to)}
          value={gasLimit}
          onChange={onGasLimitChange}
          initialValue={values.initialGasLimit}
        />
      </ScrollView>

      <Button
        secondary
        isActivated={isAddress(state.to)}
        onClick={handleNavigation}>
        Confirm
      </Button>
      <AddressScanner
        onSubmit={handleAddressModalSelection}
        onClose={addressModal.close}
        isOpen={addressModal.isOpen}
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
