import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {EmptyState} from 'shared/components/EmptyState';
import {NotificationCard} from 'shared/components';
import {globalStyles} from 'shared/styles';
interface TransferMessagesProps {
  updateNotifications: () => void;
  isLoading: boolean;
  notifications: any[];
}
export const TransferMessages = ({
  updateNotifications,
  isLoading,
  notifications,
}: TransferMessagesProps) => {
  const renderItem = (notification, index) => {
    return <NotificationCard data={notification} key={index} />;
  };

  return (
    <FlatList
      ListEmptyComponent={() => (
        <EmptyState message="You don't have any notification yet" />
      )}
      data={notifications}
      renderItem={({item, index}) => renderItem(item, index)}
      keyExtractor={item => item.uuid}
      onRefresh={updateNotifications}
      refreshing={isLoading}
      scrollEnabled
      nestedScrollEnabled
      style={[globalStyles.scrollView]}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 4,
  },
});
