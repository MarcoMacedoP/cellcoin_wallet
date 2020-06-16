import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Text, SmallText, Subtitle} from 'shared/styled-components/Texts';
import {
  ScreenContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors, globalStyles} from 'shared/styles';
import {TouchableOpacity, ScrollView, StatusBar} from 'react-native';
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
  const recomendation = 21000;
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
    setIsLoading(true);
    await calculateGasLimitETH(mainAddress, state.to, state.amount)
      .then(response => {
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

  const sendETH = async function(gass, pass) {
    await sendETHE(
      pass,
      mainAddress,
      state.to,
      state.amount,
      gass.gasPrice,
      gass.gasLimit,
    )
      .then(response => {
        Toast.show('Hash transaction: ' + response, Toast.SHORT);
        navigation.navigate('Balance');
        setModalIsShowed(false);
        setIsLoading(false);
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

  const sendTokenss = async function(gass, pass) {
    await sendTokens(
      pass,
      mainAddress,
      state.to,
      state.amount,
      gass.gasPrice,
      gass.gasLimit,
    )
      .then(response => {
        Toast.show('Hash transaction: ' + response, Toast.SHORT);
        navigation.navigate('Balance');
        setModalIsShowed(false);
        setIsLoading(false);
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

  const setAddressText = text => {
    setState({...state, to: text});
  };

  const onRecomendationClick = () => setMinerFee(recomendation);

  return (
    <ScreenContainer light>
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
        loading={isLoading}
      />
      <ScrollView
        contentContainerStyle={{backgroundColor: colors.white}}
        style={globalStyles.scrollView}>
        <Label isBold style={styles.amountToSendLabel}>
          Amount to send: {state.amount}
        </Label>

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

        <InputBox style={{paddingHorizontal: 5}}>
          <Label>Gas fee</Label>
          <FeeText color="primaryDark" style={{textTransform: 'uppercase'}}>
            {minerFee} gwei= $ {minerFee * 1050000000}
          </FeeText>
          <FeeSlider
            minimumValue={21000}
            maximumValue={81000}
            value={minerFee}
            onSlidingComplete={setMinerFee}
          />
          <FeeSpeedContainer>
            <SmallText>Slow</SmallText>
            <SmallText>Fast</SmallText>
          </FeeSpeedContainer>
          <TouchableOpacity onPress={onRecomendationClick}>
            <RecomendedFeed>Recomended: {recomendation} gwei/b</RecomendedFeed>
          </TouchableOpacity>
        </InputBox>

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
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  qrIcon: {
    padding: 8,
  },
  amountToSendLabel: {
    marginTop: 8,
    marginBottom: 12,
  },
});

const Container = styled(ScreenContainer)`
  flex: 1;
  padding-top: 8px;
`;
const Label = styled(BaseLabel)`
  top: 4px;
`;
const InputBox = styled.View`
  border-radius: 4px;
  margin: 8px 0;
  background-color: ${colors.whiteDark};
  width: 103%;
`;
const InputButton = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const FeeSlider = styled(Slider)``;
const FeeText = styled(Label)`
  width: 100%;
  font-size: 12px;
  color: ${colors.black};
  margin: 8px 0 12px;
`;
const FeeSpeedContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
`;
const RecomendedFeed = styled(SmallText)`
  color: ${colors.primary};
  text-align: right;
  margin-bottom: 8px;
`;
