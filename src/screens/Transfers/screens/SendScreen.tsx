import React, {useState, useEffect} from 'react';
import {Text, SmallText} from 'shared/styled-components/Texts';
import {
  PageContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Slider from '@react-native-community/slider';
import {Button} from 'shared/components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useGlobalState} from 'globalState';
import {ScanScreen} from 'shared/components/QrReader';
import {Modal} from 'shared/components';
import {CurrencyType} from 'shared/types';
import Wallet from 'erc20-wallet';

type SendTransferScreenProps = {
  route: {params: {currency: CurrencyType}};
};

export const SendTransferScreen: React.FC<SendTransferScreenProps> = ({
  route: {params},
}) => {
  const {currency} = params;
  const recomendation = 0.8;
  const [modalQR, setModalQR] = useGlobalState('modalQR');
  const [transferValue, setTransferValue] = useState();
  const [mainAddress] = useGlobalState('mainAddress');
  const [gasLimit, setGasLimit] = useState(0);

  const [state, setState] = useState({
    amount: 0,
    to: '',
    balance: parseFloat(currency.value.original),
  });

  useEffect(() => {
    const parsedTransfer = parseFloat(transferValue);
    const transferIsValid = parsedTransfer <= state.balance;
    console.log({transferIsValid});

    if (!transferIsValid) {
      setTransferValue(state.balance);
    }
  }, [transferValue]);

  const getGasLimit = async () => {
    const addressTest = '0xd353A3FD2A91dBC1fAeA041b0d1901a7A0978434';
    Wallet.calculateGasLimitToken(mainAddress, addressTest, 20)
      .then(res => {
        setGasLimit(res);
      })
      .catch(err => console.log(err));
  };

  const onTextAddressChange = text => {
    setState({...state, to: text});
  };

  const [minerFee, setMinerFee] = useState(0);
  const navigation = useNavigation();
  const onMaxTransfersClick = () =>
    transferValue === state.balance
      ? setTransferValue(false)
      : setTransferValue(state.balance);

  const onRecomendationClick = () => setMinerFee(recomendation);

  return (
    <>
      <ScrollView
        contentContainerStyle={{backgroundColor: colors.white}}
        style={{backgroundColor: colors.white}}>
        <StatusBar
          backgroundColor={colors.whiteDark}
          barStyle="light-content"
        />
        <Header>
          <Title>Transfer Amount</Title>
          <TransfersContainer>
            <TransferInputContainer>
              <TransferInput
                placeholder={`Balance ${state.balance}`}
                align="left"
                keyboardType="numeric"
                onChangeText={text => setTransferValue(text)}>
                <TransferText>{transferValue}</TransferText>
              </TransferInput>
              <TouchableOpacity onPress={onMaxTransfersClick}>
                <MaxTransfer>
                  {transferValue === state.balance ? 'Min' : 'Max'}
                </MaxTransfer>
              </TouchableOpacity>
            </TransferInputContainer>
            {!isNaN(transferValue) && transferValue ? (
              <FeeText style={{textTransform: 'uppercase'}}>
                {transferValue} {currency.type}= $ ${transferValue * 12000}
              </FeeText>
            ) : null}
          </TransfersContainer>
        </Header>
        <PageContainer style={{paddingTop: 8, alignItems: 'flex-start'}} light>
          <InputContainer>
            <Label>To</Label>

            <FromInput
              align="left"
              value={state.to}
              keyboardAppearance={'dark'}
              onChangeText={value => onTextAddressChange(value)}
            />

            <IconContainer
              onPress={() =>
                navigation.navigate('Transfers', {screen: 'address'})
              }>
              <Icon name="address-book" size={20} color={colors.accent} />
            </IconContainer>
          </InputContainer>

          <InputContainer>
            <Label>From</Label>
            <FromInput align="left">{mainAddress}</FromInput>
          </InputContainer>

          <InputContainer>
            <Label>Miner fee</Label>
            <FeeText ligth={false} style={{textTransform: 'uppercase'}}>
              {minerFee} {currency.type}= $ {minerFee * 12000}
            </FeeText>
            <FeeSlider
              minimumValue={0}
              maximumValue={5}
              value={minerFee}
              onValueChange={setMinerFee}
            />
            <FeeSpeedContainer>
              <SmallText color="ligth">Slow</SmallText>
              <SmallText color="ligth">Fast</SmallText>
            </FeeSpeedContainer>
            <TouchableOpacity onPress={onRecomendationClick}>
              <RecomendedFeed>Recomended: {recomendation} sat/b</RecomendedFeed>
            </TouchableOpacity>
          </InputContainer>
          <Button isActivated={true} onClick={getGasLimit}>
            Confirm
          </Button>
        </PageContainer>
        <Modal
          isShowed={modalQR}
          icon={'x'}
          onClose={() => {
            setModalQR(!modalQR);
          }}>
          <ScanScreen
            closeModal={data => {
              setState({...state, to: data});
              setModalQR(false);
            }}
          />
        </Modal>
      </ScrollView>
    </>
  );
};

const Header = styled(PageContainer)`
  background-color: ${colors.whiteDark};
  height: auto;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 60px;
`;
const Title = styled(Text)``;
const Label = styled(BaseLabel)`
  position: relative;
  top: 4px;
`;

const TransfersContainer = styled.View`
  width: 100%;
`;
const TransferInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
`;
const MaxTransfer = styled(SmallText)`
  color: ${colors.primary};
`;
const FromInput = styled(Input)`
  font-size: 13px;
  font-weight: normal;
  width: 100%;
`;
const TransferInput = styled(Input)`
  font-size: 14px;
  font-weight: normal;
`;
const TransferText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;
const InputContainer = styled.View`
  margin: 8px 0;
  padding: 4px 8px;
  width: 100%;
  background-color: ${colors.whiteDark};
  border-radius: 4px;
`;
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  bottom: 28px;
  justify-content: center;
  align-items: center;
`;
const FeeSlider = styled(Slider)`
  width: 105%;
  position: relative;
  right: 8px;
  padding: 0;
  margin: 0;
`;
const FeeText = styled(Label)`
  font-size: 12px;
  color: ${colors.black};
  margin: 8px 0 12px;
`;
const FeeSpeedContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
`;
const RecomendedFeed = styled(SmallText)`
  color: ${colors.primary};
  text-align: right;
  margin-bottom: 8px;
`;
