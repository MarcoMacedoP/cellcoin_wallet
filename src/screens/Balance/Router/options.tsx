import React from 'react';
import {colors, spacings} from 'shared/styles';
import styled from 'styled-components/native';
import {IconContainer} from 'shared/styled-components';
import MIcon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Feather';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {StackNavigationOptions} from '@react-navigation/stack';
import {LayoutHeader} from 'shared/components/LayoutHeader';

const balanceScreen = ({navigation}): StackNavigationOptions => ({
  title: 'AgaveCoin',
  headerTitleAlign: 'center',

  headerTransparent: true,
  headerLeftContainerStyle: {
    paddingHorizontal: spacings.right,
  },
  headerRightContainerStyle: {
    paddingHorizontal: spacings.right,
  },
  headerLeft: () => (
    <IconContainer onPress={() => navigation.navigate('Notifications')}>
      <MIcon name="ios-notifications-outline" size={24} color={colors.white} />
    </IconContainer>
  ),
  headerRight: () => (
    <IconContainer onPress={() => navigation.navigate('MainAddressSelector')}>
      <SimpleIcon name="wallet" size={18} color={colors.white} />
    </IconContainer>
  ),
  headerTitle: () => <Logo source={require('assets/icons/logo_mini.png')} />,
});

const addressOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitle: () => (
    <LayoutHeader
      light
      title={'Select your wallet'}
      titleColor={'black'}
      leftIcon="back-black"
      rightIcon="add"
    />
  ),
  headerBackTitleVisible: false,
  headerLeft: null,
};

const Logo = styled.Image`
  margin: 0 auto;
  width: 110px;
  resize-mode: contain;
`;
export {balanceScreen, addressOptions};
