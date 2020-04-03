
import {Modal, Button} from 'shared/components';
import React, {useState} from 'react';
import {Text, Input, Label, SmallText, Subtitle} from 'shared/styled-components';
import styled from 'styled-components/native';
import { RawModal } from 'shared/components/RawModal';
import { colors } from 'shared/styles/variables';
import {getCurrencyInfo} from './Functions/getCurrencyInfo';
import {TokenType} from 'shared/types';
import moment from 'moment';
import { Linking } from 'react-native';

type DetailModalType = React.FC<{
  isShowed: boolean;
  action: string;
  timestamp: number;
  type: TokenType;
  value: number;
  onClose: () => void;
  hash: string,
  from: string,
  to: string,
}>;

export const DetailModal: DetailModalType = ({
  isShowed,
  onClose,
  type,
  timestamp,
  action,
  value,
  hash,
  from,
  to,
}) => {
  const [Detail, setDetail] = useState('');
  const {logo, tokenName} = getCurrencyInfo(type);  
  const date = new Date(timestamp * 1000);
  const handleSubmit = () => {
    onClose();
  };
  const handleLink = () => {
    const url = `https://ropsten.etherscan.io/tx/${hash}`
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log("Don't know how to open URI: " + this.props.url);
        }
    });
  };
  
  return (
    <RawModal isShowed={isShowed} onClose={onClose}>
      <Subtitle> Detail </Subtitle>
      <Image
        source={logo}
      />
      <Label style={{color: colors.black}}> {value} {tokenName} </Label>
      <SmallText style={{textTransform: 'uppercase', color: colors.blackLigth, fontSize: 13,}}>
        {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
      </SmallText>

      
      <Container>
        <SmallText style={{ color: colors.blackLigth, fontSize: 13, marginVertical: 8, textAlign: 'center'}}>
            From: {from}
        </SmallText>
        <SmallText style={{ color: colors.blackLigth, fontSize: 13, marginVertical: 8, textAlign: 'center'}}>
            To: {to}
        </SmallText>
        <SmallText style={{ color: colors.blackLigth, fontSize: 13, marginVertical: 8, textAlign: 'center'}}>
            HASH: {hash}
        </SmallText>
      </Container>
      <Button onClick={handleLink}>View On Etherscan</Button>
      <Button onClick={handleSubmit} secondary >Close</Button>
      <SmallText style={{color: colors.blackLigth, marginTop: 15,}}>This transaction is operated by</SmallText>
      <SmallText style={{color: colors.blackLigth}}>Ethereum network.</SmallText>
    </RawModal>
  );
};
const Container = styled.ScrollView`
  padding: 16px;
  width: 100%;
`;
const InputBox = styled(Input)`
  border-radius: 4px;
  background-color: ${colors.lightGray};
`;
const Image = styled.Image`
  width: 40px;
  height: 40px;
  margin: 15px 0;
`;