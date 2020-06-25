import React from 'react';
//components
import {Button, ClipboardComponent, ScreenContainer} from 'shared/components';
import {Title, Subtitle} from 'shared/styled-components';
import {TransfersHistoryComponent} from '../components/History';
import {colors} from 'shared/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGlobalState} from 'globalState';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {StyleSheet, View, Image, ToastAndroid} from 'react-native';
import {AuthRootStackParams} from 'Router';
import {RouteProp} from '@react-navigation/core';
import Toast from 'react-native-simple-toast';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  MINIMUN_ALLOWED_CURRENCY,
  NOT_ENOUGHT_BALANCE_MESSAGE,
} from 'shared/constants';

type TransfersScreenProps = {
  route: RouteProp<AuthRootStackParams, 'Transfers'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'Transfers'>;
};
export const TransfersScreen: React.FC<TransfersScreenProps> = props => {
  const {route, navigation} = props;
  const {params: currency} = route;
  const {value, type} = currency;
  const {logo} = getCurrencyInfo(type);

  const [mainAddress] = useGlobalState('mainAddress');

  const navigateToSendTransfer = () => {
    if (parseFloat(currency.value.original) > MINIMUN_ALLOWED_CURRENCY) {
      navigation.navigate('SetQuantityToSend', currency);
    } else {
      Toast.show(NOT_ENOUGHT_BALANCE_MESSAGE);
    }
  };
  const navigateToRecieveTransfer = () =>
    navigation.navigate('Recieve', currency);

  return (
    <ScreenContainer light statusBarProps={{barStyle: 'dark-content'}}>
      <View style={styles.transactionsContainer}>
        <View style={styles.header}>
          <Image style={styles.image} source={logo} resizeMode="contain" />
          <Title>{value.original}</Title>
          <View style={styles.conversionContainer}>
            <Subtitle>{value.usd}</Subtitle>
            <Subtitle style={styles.currency}>USD</Subtitle>
          </View>
        </View>
        <ClipboardComponent style={styles.clipboard} text={mainAddress} />
        <View style={styles.buttonsContainer}>
          <Button
            accent
            width="50%"
            margin="0 4px 0 0"
            onClick={navigateToSendTransfer}>
            <Icon name="send" size={15} color="white" /> Send
          </Button>
          <Button
            secondary
            width="50%"
            margin="0 0 0 4px"
            onClick={navigateToRecieveTransfer}>
            <Icon name="qrcode" size={15} color="white" /> Receive
          </Button>
        </View>
      </View>
      <TransfersHistoryComponent
        logo={logo}
        type={type}
        address={mainAddress}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 1.5,
    width: '100%',
  },
  header: {
    flex: 2,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  clipboard: {
    marginVertical: 16,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  conversionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  currency: {
    fontSize: 14,
    marginLeft: 4,
  },
  image: {
    width: 30,
    height: 30,
  },
});
