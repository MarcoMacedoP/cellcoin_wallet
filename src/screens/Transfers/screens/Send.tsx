import React, { useState } from 'react';
import styled from 'styled-components/native';
import { CurrencyType } from 'shared/types';
import { colors } from 'shared/styles/variables';
import { Label } from 'shared/styled-components';
import { Button } from 'shared/components';
import VirtualKeyboard from '../components/virtual-keyboard-update/VirtualKeyboard';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RawModal } from 'shared/components/RawModal';
type SendScreenProps = {
    route: { params: { currency: CurrencyType } };
};
export const SendScreen: React.FC<SendScreenProps> = ({ route: { params }, }) => {
    const { currency } = params;
    const [ activeCurrency, setActiveCurrency ] = useState('USD')
    const [quantity, setQuantity] = useState('0');
    const [quantityCurrenncy, setQuantityCurrency] = useState('0');
    const [ModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!ModalVisible);
    };
    const height = Dimensions.get('screen').height;
    const activateCurrency = () => {
        if (activeCurrency === currency.type) setActiveCurrency('USD');
        else setActiveCurrency(currency.type);
    }
    const setQuantity_ = (val) => {
        console.log(val);
        
        if (val === '') {
            setQuantity('0');
            setQuantityCurrency('0');
        } else {
            if (activeCurrency === currency.type) {
                setQuantityCurrency(val)
                let usd = parseFloat(val) * parseFloat(currency.value.usd)
                if (quantity !== '0') {
                    setQuantity(usd.toFixed(2));
                } else {
                    setQuantity(usd.toFixed(0));
                }
            } else {
                setQuantity(val)
                let usd = parseFloat(val) / parseFloat(currency.value.usd)
                setQuantityCurrency(usd.toFixed(8));
                
            }
        }
    }
    const setMaximun = () => {
        const total = parseFloat(currency.value.original) * parseFloat(currency.value.usd);
        if (activeCurrency === currency.type)
            setQuantity_(currency.value.original);
        else
            setQuantity_(total.toFixed(2));
    }
    return (
      <>
        {height < 700 ? (
          <Container>
            <PageContainer>
              <Header>
                <TouchableHeader onPress={activateCurrency}>
                  <LabelCurrency
                    active={activeCurrency === 'USD' ? true : false}>
                    {quantity} USD
                  </LabelCurrency>
                </TouchableHeader>
                <Hr />
                <TouchableHeader onPress={activateCurrency}>
                  <LabelCurrency
                    active={activeCurrency === currency.type ? true : false}>
                    {quantityCurrenncy} {currency.type}
                  </LabelCurrency>
                </TouchableHeader>
                <Button
                  onClick={() => {
                    setMaximun();
                  }}
                  outline>
                  <Label>
                    Use maximun available:{' '}
                    {activeCurrency === currency.type
                      ? currency.value.original
                      : (
                          parseFloat(currency.value.original) *
                          parseFloat(currency.value.usd)
                        ).toFixed(2)}
                  </Label>
                </Button>
              </Header>
              <Body>
                <VirtualKeyboard
                  color="black"
                  text={
                    activeCurrency === currency.type
                      ? quantityCurrenncy === '0'
                        ? ''
                        : quantityCurrenncy
                      : quantity === '0'
                      ? ''
                      : quantity
                  }
                  pressMode="string"
                  onPress={val => {
                    setQuantity_(val);
                  }}
                  decimal={true}
                  rowStyle={{width: Dimensions.get('window').width}}
                  cellStyle={{height: 60}}
                />

                <Button secondary margin={'10px 0'} onClick={toggleModal}>
                  NEXT
                </Button>
              </Body>

              <RawModal isShowed={ModalVisible} onClose={toggleModal}>
                <Label> Please select the destination </Label>
                <Button secondary margin={'10px 0'} onClick={toggleModal}>
                  <Icon name="qrcode" size={15} color={colors.white} /> Qr
                  reader
                </Button>
                <Button accent margin={'10px 0'} onClick={toggleModal}>
                  <Icon name="address-book" size={15} color={colors.white} />{' '}
                  Address Book
                </Button>
              </RawModal>
            </PageContainer>
          </Container>
        ) : (
          <PageContainer>
            <Header>
              <TouchableHeader onPress={activateCurrency}>
                <LabelCurrency active={activeCurrency === 'USD' ? true : false}>
                  {quantity} USD
                </LabelCurrency>
              </TouchableHeader>
              <Hr />
              <TouchableHeader onPress={activateCurrency}>
                <LabelCurrency
                  active={activeCurrency === currency.type ? true : false}>
                  {quantityCurrenncy} {currency.type}
                </LabelCurrency>
              </TouchableHeader>
              <Button
                onClick={() => {
                  setMaximun();
                }}
                outline>
                <Label>
                  Use maximun available:{' '}
                  {activeCurrency === currency.type
                    ? currency.value.original
                    : (
                        parseFloat(currency.value.original) *
                        parseFloat(currency.value.usd)
                      ).toFixed(2)}
                </Label>
              </Button>
            </Header>
            <Body>
              <VirtualKeyboard
                color="black"
                text={
                  activeCurrency === currency.type
                    ? quantityCurrenncy === '0'
                      ? ''
                      : quantityCurrenncy
                    : quantity === '0'
                    ? ''
                    : quantity
                }
                pressMode="string"
                onPress={val => {
                  setQuantity_(val);
                }}
                decimal={true}
                rowStyle={{width: Dimensions.get('window').width}}
                cellStyle={{height: 60}}
              />

              <Button secondary margin={'10px 0'} onClick={toggleModal}>
                NEXT
              </Button>
            </Body>

            <RawModal isShowed={ModalVisible} onClose={toggleModal}>
              <Label> Please select the destination </Label>
              <Button secondary margin={'10px 0'} onClick={toggleModal}>
                <Icon name="qrcode" size={15} color={colors.white} /> Qr reader
              </Button>
              <Button accent margin={'10px 0'} onClick={toggleModal}>
                <Icon name="address-book" size={15} color={colors.white} />{' '}
                Address Book
              </Button>
            </RawModal>
          </PageContainer>
        )}
      </>
    );
};

const PageContainer = styled.View`
  background-color: ${colors.white};
  height: 100%;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
const Container = styled.ScrollView`
  background-color: ${colors.accent};
`;
const Header = styled.View`
    width: 90%;
`;
const Hr = styled.View`
    border-width: .5px;
    border-color: ${colors.lightGray};
`;
type LabelCurrencyProps = {
    active?: boolean;
};
const LabelCurrency = styled(Label)<LabelCurrencyProps>`
    font-size: ${props => props.active ? '25px' : '15px'}
`;
const TouchableHeader = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin: 15px;
`;
const Body = styled.View`
  width: 90%;
  justify-content: flex-end;
  align-items: center;
`;