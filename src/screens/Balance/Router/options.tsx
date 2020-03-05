import React from 'react';
import {colors, spacings} from 'shared/styles';
import styled from 'styled-components/native';
import {IconContainer} from 'shared/styled-components';
import MIcon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {StackNavigationOptions} from '@react-navigation/stack';

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
  // headerRight: () => (
  //   <IconContainer onPress={() => navigation.navigate('Balance')}>
  //     <SimpleIcon name="wallet" size={18} color={colors.white} />
  // ),
  headerTitle: () => <Logo source={require('assets/icons/logo_mini.png')} />,
});
const Logo = styled.Image`
  margin: 0 auto;
  width: 110px;
  resize-mode: contain;
`;
export {balanceScreen};
