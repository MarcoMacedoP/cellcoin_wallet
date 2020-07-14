import React, {useState, useEffect} from 'react';
import {TransferMessages} from './components/TransferMessages';
import {ScreenContainer} from 'shared/styled-components';
import {StatusBar} from 'react-native';
import {getNotifications} from 'shared/libs/api';

export function News() {
  const {fetchNotifications, notifications, isLoading} = useNotifications();
  console.log(notifications);
  return (
    <ScreenContainer light>
      <StatusBar barStyle="dark-content" />
      <TransferMessages
        notifications={notifications}
        updateNotifications={fetchNotifications}
        isLoading={isLoading}
      />
    </ScreenContainer>
  );
}

function useNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState();

  const fetchNotifications = async () => {
    setIsLoading(true);
    const notifications = await getNotifications();
    setNotifications(notifications);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return {isLoading, fetchNotifications, notifications};
}
