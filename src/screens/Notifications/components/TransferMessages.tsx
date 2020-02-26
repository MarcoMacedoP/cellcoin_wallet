import React, { useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text } from 'react-native';
import {EmptyState} from 'shared/components/EmptyState';
import { NotificationCard } from 'shared/components';

export const TransferMessages = ({notifications, updateNotifications}) => {
  const [state, setState] = useState({
    isLoading: false
  });
  const renderRefreshControl = () => {
    setState({...state,  isLoading: true })
  }

  const renderRow = (notification, index) => {
    return <NotificationCard data={notification} key={index} />;
  };
  
  return (
    <View>
      {!notifications ? (
        <EmptyState message="No Transfer Notifications" />
      ) : (
        <FlatList
          data={notifications}
          renderItem={({item, index}) => renderRow(item, index)}
          keyExtractor={(item, index) => item.id}
          onRefresh={() => renderRefreshControl()}
          refreshing={state.isLoading}
          initialNumToRender={8}
        />
      )}
    </View>
  );
}