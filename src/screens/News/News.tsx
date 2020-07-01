import React, {useState, useEffect} from 'react';
import {TransferMessages} from './components/TransferMessages';
import {ScreenContainer} from 'shared/styled-components';
import {StatusBar} from 'react-native';

const API_URL = 'https://erc20.lomeli.xyz/agavecoin';

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

  async function getNotifications() {
    const response = await fetch(`${API_URL}/get-news`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    const {data} = await response.json();
    return data;
  }

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
