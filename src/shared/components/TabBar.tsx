import React from 'react';
import styled from 'styled-components/native';
import {TabBar as BaseTabBar} from 'react-native-tab-view/';
import TabBarIndicator from 'react-native-tab-view/src/TabBarIndicator';
import {colors} from '../styles';
import {View} from 'react-native';

export const TabBar = props => (
  <StyledTabBar
    {...props}
    indicatorStyle={{
      backgroundColor: colors.black,
      marginBottom: 2,
    }}
    renderLabel={({route, focused}) => (
      <Label focused={focused}>{route.title}</Label>
    )}
  />
);

const StyledTabBar = styled(BaseTabBar)`
  background-color: ${colors.white};
  font-size: 2px;
`;
const Label = styled.Text<{focused: boolean}>`
  color: ${props => (props.focused ? colors.black : colors.blackLigth)};
  font-weight: bold;
  padding: 0 16px;
`;
