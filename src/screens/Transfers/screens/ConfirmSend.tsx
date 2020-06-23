import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import {Text, SmallText, Subtitle} from 'shared/styled-components/Texts';
import {
  ScreenContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors, globalStyles} from 'shared/styles';
import {TouchableOpacity, ScrollView, StatusBar, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Button} from 'shared/components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RouteProp} from '@react-navigation/native';
import {useGlobalState} from 'globalState';
import {ScanScreen} from 'shared/components/QrReader';
import {
  Modal,
  AddressScanner,
  QrIcon,
  Input as InputComponent,
} from 'shared/components';
import Toast from 'react-native-simple-toast';
import {PasswordModal} from '../components/PasswordModal';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  calculateGasLimitToken,
  calculateGasLimitETH,
  sendETHE,
  sendTokens,
} from 'shared/libs/Wallet';
import {useModal} from 'shared/hooks';
import {StyleSheet} from 'react-native';
import {isAddress} from 'shared/validations';
import {notificateTransaction} from 'shared/libs/Notifications';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {GasFeeSelector} from '../components/GasFeeSelector';

type SetAddressScreenProps = {
  route: RouteProp<AuthRootStackParams, 'ConfirmSend'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'ConfirmSend'>;
};

export const ConfirmSend: React.FC<SetAddressScreenProps> = ({
  route: {params},
  navigation,
}) => {
  const addressModal = useModal();
  const {currency, tokenQuantityToBeSended, selectedAddress} = params;
  const recomendation = 1;
  const [modalIsShowed, setModalIsShowed] = useState(false);
  const [mainAddress] = useGlobalState('mainAddress');
  const [gasLimit, setGasLimit] = useState(21000);
  const [isLoading, setIsLoading] = useState(false);
  const [minerFee, setMinerFee] = useState(21000);

  const [state, setState] = useState({
    amount: tokenQuantityToBeSended,
    to: selectedAddress || '',
    balance: parseFloat(currency.value.original),
    password: '',
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
  /**
   * Open the modal for enter the user password
   */
  function handleSubmit() {
    setModalIsShowed(true);
  }
  /**
   * Set the password and calls send the crypto
   */
  function onPasswordFilled(password: string) {
    setState({...state, password});
    currency.type == 'ETH'
      ? getGasLimitETH(password)
      : getGasLimitToken(password);
  }

  const getGasLimitToken = async (password: string) => {
    setIsLoading(true);
    await calculateGasLimitToken(mainAddress, state.to, state.amount)
      .then(response => {
        sendTokenss(response, password);
      })
      .catch(error => {
        Toast.show('Insufficient funds for gas', Toast.SHORT);
        setIsLoading(false);
      });
  };

  const getGasLimitETH = async pass => {
    setModalIsShowed(false);
    setIsLoading(true);
    await calculateGasLimitETH(mainAddress, state.to, state.amount)
      .then(response => {
        console.log('getGasLitmitETH', {response});
        sendETH(response, pass);
      })
      .catch(error => {
        if (
          (error =
            'invalid argument 0: hex string has length 0, want 40 for common.Address')
        ) {
          Toast.show(
            'Please insert a valid Ethereum address to continue',
            Toast.SHORT,
          );
        }
        setIsLoading(false);
      });
  };

  function handleNavigation(hash: string) {
    navigation.navigate('SuccessTransaction', {
      from: mainAddress,
      to: state.to,
      hash,
      quantity: tokenQuantityToBeSended,
      type: currency.type,
    });
  }

  const sendETH = async function(gass, pass) {
    await sendETHE(
      pass,
      mainAddress,
      state.to,
      state.amount,
      gass.gasPrice,
      gass.gasLimit,
    )
      .then(handleSuccessTransaction)
      .catch(error => {
        console.log({error});
        if (error === 'insufficient funds for gas * price + value') {
          Toast.show('Insufficient funds for gas', Toast.SHORT);
        } else {
          Toast.show('Error: ' + error, Toast.SHORT);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendTokenss = async function(gass, pass) {
    await sendTokens(
      pass,
      mainAddress,
      state.to,
      state.amount,
      gass.gasPrice,
      gass.gasLimit,
    )
      .then((hash: string) => {
        setModalIsShowed(false);
        setIsLoading(false);
        handleNavigation(hash);
      })
      .catch(error => {
        if ((error = 'insufficient funds for gas * price + value')) {
          Toast.show('Insufficient funds for gas', Toast.SHORT);
        } else {
          Toast.show('Error: ' + error, Toast.SHORT);
        }
        setIsLoading(false);
      });
  };

  /** Handles all the success transactions
   * @param hash the transaction hash
   */
  function handleSuccessTransaction(hash: string) {
    notificateTransaction({
      amount: tokenQuantityToBeSended,
      from: mainAddress,
      to: selectedAddress,
      token: getCurrencyInfo(currency.type).tokenName,
    });
    handleNavigation(hash);
  }

  const setAddressText = text => {
    setState({...state, to: text});
  };

  const onRecomendationClick = () => setMinerFee(recomendation);
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
          <IconContainer
            onPress={() =>
              navigation.navigate('ContactsList', {
                currency: params.currency,
                tokenQuantityToBeSended: params.tokenQuantityToBeSended,
              })
            }>
            <Icon name="address-book" size={20} color={colors.accent} />
          </IconContainer>
        </InputComponent>
        <GasFeeSelector
          from={mainAddress}
          to={selectedAddress}
          amount={state.amount}
        />
      </View>

      <Button
        secondary
        isActivated={isAddress(state.to)}
        onClick={handleSubmit}
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
        isShowed={modalIsShowed}
        onClose={() => setModalIsShowed(false)}
        onDoned={onPasswordFilled}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  page: {},
  qrIcon: {
    padding: 8,
  },
  amountToSend: {
    marginTop: 8,
    textAlign: 'left',
    marginBottom: 12,
  },
  form: {
    flex: 1,
    marginBottom: 12,
    maxHeight: '70%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
