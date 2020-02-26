import React, { useState, useEffect } from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'shared/components/TabBar';
import {TransferMessages} from './components/TransferMessages';
import {SystemMessages} from './components/SystemMessages';
import { UIActivityIndicator } from 'react-native-indicators';
import { colors } from 'shared/styles/variables';
import styled from 'styled-components/native';
const API_URL = 'https://erc20.lomeli.xyz/agavecoin';
const initialLayout = {width: Dimensions.get('window').width};

export function NotificationsScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Transfer Messages'},
    {key: 'second', title: 'System Messages'},
  ]);
  const [notifications, setNotifications] = useState(false);
  function useInitilizeView() {
    const [hasInitialized, setHasInitilization] = useState(false);
    useEffect(() => {
      async function getInitialization() {
        const response = await fetch(`${API_URL}/get-news`, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
        const {data} = await response.json();
        return data;
      }
      async function setInitialization() {
        const initialization = await getInitialization();
        setNotifications(initialization)
        setHasInitilization(true);
      }
      setInitialization();
    }, []);
    return hasInitialized;
  }

  const hasInitialized = useInitilizeView();

  const renderScene = SceneMap({
    first: () => (
      <Container>
        <TransferMessages notifications={notifications} updateNotifications={useInitilizeView} />
      </Container>
    ) ,
    second: () => (
      <Container>
        <SystemMessages notifications={notifications} updateNotifications={useInitilizeView}/>
      </Container>
    ),
  });

  return hasInitialized ? (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => <TabBar {...props} />}
    />
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <UIActivityIndicator color={colors.accent} size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
const Container = styled.View`
  justify-content: flex-start;
  padding-top
`;