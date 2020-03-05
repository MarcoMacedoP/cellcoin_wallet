import React from 'react';
import {colors} from 'shared/styles';
import styled from 'styled-components/native';
import {IconContainer} from 'shared/styled-components';
import MIcon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const balanceScreen: any = ({navigation}) => ({
  title: 'AgaveCoin',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTransparent: true,
  headerBackTitleVisible: true,
  headerLeftContainerStyle: {
    padding: 16,
  },
  headerRightContainerStyle: {
    padding: 16,
  },
  headerLeft: () => (
    <IconContainer onPress={() => navigation.navigate('Notifications')}>
      <MIcon name="ios-notifications-outline" size={24} color={colors.white} />
    </IconContainer>
  ),
  headerRight: () => (
    <IconContainer onPress={() => navigation.navigate('Balance')}>
      <SimpleIcon name="wallet" size={18} color={colors.white} />
    </IconContainer>
  ),
  headerTitle: () => <Logo source={require('assets/icons/logo_mini.png')} />,
});
const Logo = styled.Image`
  margin: 0 auto;
  width: 110px;
  resize-mode: contain;
`;
export {balanceScreen};
