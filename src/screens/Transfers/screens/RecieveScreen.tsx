import React from 'react';
import {SmallText} from 'shared/styled-components/Texts';
import LinearGradient from 'react-native-linear-gradient';
import {colors, spacings} from 'shared/styles';
import {ClipboardComponent} from 'shared/components/Clipboard';
import {useGlobalState} from 'globalState';
import {RouteProp} from '@react-navigation/core';
import {AuthRootStackParams} from 'Router';
import {getCurrencyInfo} from 'shared/libs/getCurrencyInfo';
import {StyleSheet, View, Image, StatusBar} from 'react-native';

type RecieveTransferScreenProps = {
  route: RouteProp<AuthRootStackParams, 'Recieve'>;
};

export const RecieveTransferScreen: React.FC<RecieveTransferScreenProps> = ({
  route,
}) => {
  const {params: currency} = route;
  const [mainAddress] = useGlobalState('mainAddress');
  const {logo, tokenName} = getCurrencyInfo(currency.type);
  return (
    <LinearGradient
      colors={['#3A81F8', '#16CDFC', '#16CDFC', '#16CDFC']}
      style={styles.gradient}>
      <StatusBar barStyle="light-content" />
      <View style={styles.addressContainer}>
        <Image source={logo} style={styles.addressTypeLogo} />
        <Image
          style={styles.addressQrImage}
          source={{
            uri: `https://chart.googleapis.com/chart?chs=300x300&chld=L|1&cht=qr&chl=ethereum:${mainAddress}`,
          }}
        />
        <ClipboardComponent text={mainAddress} />
      </View>

      <View style={styles.informationContainer}>
        <SmallText color="white" center>
          Attention: please do not deposit any digital assets other than{' '}
          {tokenName} to the above address
        </SmallText>
        <Image
          style={styles.brandLogo}
          source={require('assets/icons/logo_mini.png')}
        />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradient: {
    paddingTop: 100,
    paddingLeft: spacings.left,
    paddingRight: spacings.right,
    flex: 1,
  },
  addressContainer: {
    flex: 2,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
  },
  addressQrImage: {
    flex: 5,
    minWidth: '80%',
    resizeMode: 'contain',
  },
  addressTypeLogo: {
    width: 35,
    flex: 1,
    resizeMode: 'contain',
  },
  informationContainer: {
    flex: 1,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogo: {
    width: 150,
    resizeMode: 'contain',
  },
});
