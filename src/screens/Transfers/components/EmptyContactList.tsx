import React from 'react';
import {EmptyState, Button} from 'shared/components';
import {View, StyleSheet} from 'react-native';

type EmptyContactListProps = {
  onAddContactPress: () => void;
};

export const EmptyContactList: React.FC<EmptyContactListProps> = ({
  onAddContactPress,
}) => {
  return (
    <>
      <View style={styles.emptyStateContainer}>
        <EmptyState message="You haven't save any address yet" />
      </View>
      <Button width="100%" onClick={onAddContactPress}>
        Add an address
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
  },
});
