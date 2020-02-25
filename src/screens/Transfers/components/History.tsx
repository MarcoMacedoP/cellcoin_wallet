import React, {useState, useEffect} from 'react';

import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {Text, SmallText, Subtitle} from 'shared/styled-components/Texts';
import {TouchableOpacity, View, ScrollView} from 'react-native';

import Wallet from 'erc20-wallet';
import {useGlobalState} from 'globalState';

//fixings of wallet package
import api from 'etherscan-api';
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
  history?: Array<string>;
};
export const TransfersHistoryComponent: React.FC<TransfersHistoryComponentProps> = () => {
  const [labelSelected, setLabelSelected] = useState(0);
  const labels = ['Send', 'Received'];
  const handleLabelClick = (labelText: string) => setLabelSelected(labelText);
  const [transactions, setTransactions] = useState({
    count: 0,
    sent: [],
    received: [],
  });
  const [mainAddress] = useGlobalState('mainAddress');
  useEffect(() => {
    async function getTxtEth() {
      try {
        const transactions = (await Wallet.getTxtEth(mainAddress)) || [];
        const sentTransactions = transactions.filter(t => t.type === 'Sent');
        const receivedTransactions = transactions.filter(
          t => t.type === 'Received',
        );
        setTransactions({
          count: transactions.length,
          sent: sentTransactions,
          received: receivedTransactions,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getTxtEth().then(() => console.log(transactions));
  }, []);

  const renderTransactions = (transactions: []) =>
    transactions.length === 0 ? (
      <SmallText>No transactions of this type</SmallText>
    ) : (
      <TransactionsContainer>
        {transactions.map((t: any) =>
          Object.keys(t).map((key, index) => (
            <TransactionContainer key={index}>
              <TransactionKey>{key}:</TransactionKey>
              <SmallText>{t[key]}</SmallText>
            </TransactionContainer>
          )),
        )}
      </TransactionsContainer>
    );
  return (
    <Container>
      <Text isBold>History</Text>
      <LabelsContainer>
        {transactions.count > 0 ? (
          labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLabelClick(label)}>
              <Label isSelected={labelSelected === label}>{label}</Label>
            </TouchableOpacity>
          ))
        ) : (
          <SmallText color="ligth">No history :(</SmallText>
        )}
      </LabelsContainer>
      <ScrollView>
        {transactions.count > 0 && labelSelected === 'Send'
          ? renderTransactions(transactions.sent)
          : labelSelected === 'Received' &&
            renderTransactions(transactions.received)}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${colors.whiteDark};
  height: 100%;
  width: 100%;
`;
const LabelsContainer = styled.View`
  flex-direction: row;
  margin: 6px 0;
  justify-content: flex-start;
  padding: 0 8px;
`;
const Label = styled(Text)<{isSelected: boolean}>`
  font-size: 12px;
  padding: 4px 8px;
  font-weight: bold;
  background-color: ${props =>
    props.isSelected ? colors.blackLigth : 'transparent'};
  color: ${props => (props.isSelected ? colors.black : colors.blackLigth)};
  margin-right: 8px;
`;
const ContentContainer = styled.View`
  padding: 0 8px;
`;
const TransactionsContainer = styled(ContentContainer)`
  border: 1px ${colors.blackLigth};
`;
const TransactionKey = styled(SmallText)`
  color: ${colors.black};
  font-weight: bold;
  margin-right: 6px;
`;
const TransactionContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin: 8px 0;
`;
