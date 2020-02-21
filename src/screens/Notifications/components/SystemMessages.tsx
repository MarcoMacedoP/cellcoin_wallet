import React from 'react';
import {View} from 'react-native';
import {EmptyState} from 'shared/components/EmptyState';

export const SystemMessages = ({notifications}) => (
  <View>
    {!notifications && <EmptyState message="No Tranfer Notifications" />}
  </View>
);
