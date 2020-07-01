import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import {Text} from 'shared/styled-components/Texts';
import {ScreenContainer} from 'shared/styled-components';
import {colors, globalStyles} from 'shared/styles';
import {View, ScrollView} from 'react-native';
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
//SetQuantityForSend SetFeeDestinationSend ConfirmTransactionSend
export const SetFeeDestinationToSend: React.FC<SetAddressScreenProps> = ({
  route: {params},
  navigation,
}) => {
  const addressModal = useModal();
  const passwordModal = useModal();
  const {currency, tokenQuantityToBeSended, selectedAddress} = params;
  const [mainAddress] = useGlobalState('mainAddress');

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

  function handleNavigation() {
    navigation.navigate('ConfirmTransactionToSend', {
      currency,
      gasLimit,
      gasPrice,
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
            <Icon name="address-book" size={20} color={colors.accent} />
          </TouchableOpacity>
        </InputComponent>
        <GasPriceSelector
          fee={fee}
          isLoading={status === 'loading'}
          error={error}
          gasLimit={gasLimit}
          gasPrice={gasPrice}
          onChange={onGasPriceChange}
          isEnabled={isAddress(state.to)}
        />
        <GasLimitSelector value={gasLimit} />
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
