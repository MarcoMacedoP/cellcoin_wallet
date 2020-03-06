import React, {useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {Text} from 'shared/styled-components/Texts';
import {FlatList} from 'react-native';

import {TransactionCard} from './TransactionCard';

import {TokenType} from 'shared/types';
import {EmptyState, Loading} from 'shared/components';
import {ScrollView} from 'react-native-gesture-handler';

type TransfersHistoryComponentProps = {
  logo: string;
  type: TokenType;
  isEmpty: boolean;
  history: Array<any>;
};
export const TransfersHistoryComponent: React.FC<TransfersHistoryComponentProps> = ({
  type,
  isEmpty,
  history,
}) => {
  return (
    <Container>
      <Text isBold style={{marginBottom: isEmpty ? 0 : 16}} center={isEmpty}>
        History
      </Text>
      {!isEmpty ? (
        <FlatList
          scrollEnabled
          data={history}
          keyExtractor={item => item.blockNumber}
          renderItem={({item, index}) => (
            <TransactionCard
              key={index}
              action={item.type}
              timestamp={item.timeStamp}
              type={type}
              value={item.value}
            />
          )}
        />
      ) : (
        <ScrollView>
          <EmptyState
            message="You have not made transactions yet"
            hasImage={false}
          />
        </ScrollView>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: ${colors.whiteDark};
  height: 100%;
  width: 100%;
  padding-top: 16px;
`;
