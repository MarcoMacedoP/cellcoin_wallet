import React, { useState } from 'react';
import styled from 'styled-components/native';
import { CurrencyType } from 'shared/types';
import { colors } from 'shared/styles/variables';
import { Label } from 'shared/styled-components';
import { Button } from 'shared/components';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { Dimensions } from 'react-native';


type SendScreenProps = {
    route: { params: { currency: CurrencyType } };
};

export const SendScreen: React.FC<SendScreenProps> = ({ route: { params }, }) => {
    const { currency } = params;
    const [ activeCurrency, setActiveCurrency ] = useState('USD')
    const [quantity, setQuantity] = useState('0');
    const activateCurrency = () => {
        if (activeCurrency === currency.type) setActiveCurrency('USD');
        else setActiveCurrency(currency.type);
    }
    return (
        <Container contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Header>
                <TouchableHeader onPress={activateCurrency}>
                    <LabelCurrency active={activeCurrency === 'USD' ? true : false}>{quantity} USD</LabelCurrency>
                </TouchableHeader>
                <Hr />
                <TouchableHeader onPress={activateCurrency}>
                    <LabelCurrency active={activeCurrency === currency.type ? true : false}>{quantity} {currency.type}</LabelCurrency>
                </TouchableHeader>
                <Button onClick={() => { console.log(1); }} outline>
                    <Label>Use Maximun available</Label>
                </Button>
            </Header>
            <Body>
                <VirtualKeyboard 
                    color='black' 
                    pressMode='string' 
                    onPress={(val) => {
                        console.log(val);
                        if (val === '') {
                            setQuantity('0');
                        } else {
                            setQuantity(val);
                        }
                    }} 
                    decimal={true} 
                    rowStyle={{width: Dimensions.get('window').width}}
                    cellStyle={{height: 60}}/>

                <Button
                    secondary
                    margin={'10px 0'}
                    onClick={() => {console.log(1);}}>
                    NEXT
                </Button>
            </Body>
        </Container>
    );
};
const Container = styled.ScrollView`
  background-color: ${colors.white};
`;
const Header = styled.View`
    width: 90%;
    flex: 1;
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
    flex: 1;
    justify-content: center;
    align-items: center;
`;