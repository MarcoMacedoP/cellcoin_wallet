import React, {useState, useEffect} from 'react';

import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {Text, SmallText} from 'shared/styled-components/Texts';
import {FlatList} from 'react-native';

import Wallet from 'erc20-wallet';
import {TransactionCard} from './TransactionCard';
import {useGlobalState} from 'globalState';

//fixings of wallet package
import api from 'etherscan-api';
import {TokenType} from 'shared/types';
import {EmptyState, Loading} from 'shared/components';
import {ScrollView} from 'react-native-gesture-handler';
function initEtherScan() {
  const etherscan = api.init(
    'NF3VM2RDBRJMAXCGPDIBX2KMX8W5ED8SF9',
    this.networkEtherScan,
    3000,
  );
  this.etherscan = etherscan;
  return etherscan;
}
Wallet.initEtherScan = initEtherScan;

type TransfersHistoryComponentProps = {
  logo: string;
  type: TokenType;
};
export const TransfersHistoryComponent: React.FC<TransfersHistoryComponentProps> = ({
  type,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [mainAddress] = useGlobalState('mainAddress');
  const initialStatus = {
    loading: false,
    error: null,
  };
  const [status, setStatus] = useState(initialStatus);
  useEffect(() => {
    fetchHistory();
  }, []);
  async function fetchHistory() {
    setStatus({
      loading: true,
      error: null,
    });
    try {
      const transactions =
        type === 'TOKEN'
          ? await Wallet.getTxtTokens(mainAddress)
          : await Wallet.getTxtEth(mainAddress);
      setTransactions(transactions || []);
      setStatus({
        error: null,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      setStatus({
        error,
        loading: false,
      });
    }
  }
  return status.loading ? (
    <Loading />
  ) : (
    <Container>
      <Text
        isBold
        style={{marginBottom: transactions.length === 0 ? 0 : 16}}
        center={transactions.length === 0}>
        History
      </Text>
      {transactions.length > 0 ? (
        <FlatList
          scrollEnabled
          data={transactions}
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
