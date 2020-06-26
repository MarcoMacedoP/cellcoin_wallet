import React, {useEffect, useState, useMemo} from 'react';

import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {Text} from 'shared/styled-components/Texts';
import {FlatList} from 'react-native';

import {TransactionCard} from './TransactionCard';

import {TokenType} from 'shared/types';
import {EmptyState, Loading} from 'shared/components';
import {ScrollView} from 'react-native-gesture-handler';
import {DetailModal} from './DetailModal';
import {useGlobalState} from 'globalState';
import {useFetchHistory} from './Hooks/useFetchHistory';

type TransfersHistoryComponentProps = {
  logo: string;
  type: TokenType;
  address: string;
};
export const TransfersHistoryComponent: React.FC<
  TransfersHistoryComponentProps
> = ({type, address}) => {
  const {history, fetchHistory, loading} = useFetchHistory(type, address);

  const isEmpty = useMemo(() => history.length === 0, [history]);

  const onRefresh = React.useCallback(() => {
    fetchHistory();
  }, []);

  const [modalDetail, setModalDetail] = useState(false);
  const [detail, setDetail] = useState({
    type: '',
    timeStamp: 0,
    value: 0,
    hash: '',
    from: '',
    to: '',
  });
  const showDetail = data => {
    setDetail({
      type: data.type,
      timeStamp: data.timeStamp,
      value: data.value,
      hash: data.hash,
      from: data.from,
      to: data.to,
    });
    setModalDetail(true);
  };

  return (
    <Container>
      <Text
        isBold
        style={{marginBottom: isEmpty ? 0 : 16, marginTop: 32}}
        center={isEmpty}>
        History
      </Text>
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        ListEmptyComponent={
          <EmptyState
            message="You don't have any transactions yet."
            hasImage={false}
          />
        }
        data={history}
        keyExtractor={item => item.blockNumber}
        renderItem={({item, index}) => (
          <TransactionCard
            key={index}
            action={item.type}
            timestamp={item.timeStamp}
            type={type}
            value={item.value}
            onPress={() => {
              showDetail(item);
            }}
          />
        )}
      />

      <DetailModal
        isShowed={modalDetail}
        action={detail.type}
        timestamp={detail.timeStamp}
        type={type}
        value={detail.value}
        hash={detail.hash}
        from={detail.from}
        to={detail.to}
        onClose={() => setModalDetail(false)}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  padding-top: 16px;
  flex: 1;
`;
