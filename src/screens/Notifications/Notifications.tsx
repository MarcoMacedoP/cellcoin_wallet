import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'shared/components/TabBar';
import {TransferMessages} from './components/TransferMessages';
import {SystemMessages} from './components/SystemMessages';

const initialLayout = {width: Dimensions.get('window').width};

export function NotificationsScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Transfer Messages'},
    {key: 'second', title: 'System Messages'},
  ]);

  const renderScene = SceneMap({
    first: TransferMessages,
    second: SystemMessages,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => <TabBar {...props} />}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
