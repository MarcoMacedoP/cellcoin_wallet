import {View} from 'react-native';
import React from 'react';
import {EmptyState} from 'shared/components/EmptyState';

export const TransferMessages = ({notifications}) => (
  <View>
    {!notifications && <EmptyState message="No Tranfer Notifications" />}
  </View>
);
