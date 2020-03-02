import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
//components
import {Dimensions} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import {Button} from 'shared/components/Button';
import {WalkthroughItem} from '../components/WalkthroughItem';
//styles
import {colors, spacings} from 'shared/styles';

const WALKTHROUGH_DATA = [
  {
    image: require('assets/tutorial/tutorial_one.png'),
    title: 'Multi-chain Wallet',
    desc: 'Supporting BTC, AgaveCoin,etc.',
  },
  {
    image: require('assets/tutorial/tutorial_two.png'),
    title: 'Designed for Simplicity',
    desc:
      ' Add and manage cryptocurrencies with one click Manage multiple addresses easily',
  },
  {
    image: require('assets/tutorial/tutorial_three.png'),
    title: 'Agave Coin Secure',
    desc:
      'Full control over assets by managing private keys independently. \n Produced by Agave Coin security team',
  },
];

export const WalkthroughScreen = ({navigation}) => {
  const [count, setCount] = useState(0);
  const onCreateWallet = () =>
    navigation.navigate('Terms', {
      name: 'Create Wallet',
      action: 'create',
    });
  const onImportWallet = () =>
    navigation.navigate('Terms', {
      name: 'Import Wallet',
      action: 'import',
    });

  return (
    <Container>
      <BodyBox>
        <CarrouselContainer>
          <SideSwipe
            index={count}
            style={{
              width:
                Dimensions.get('window').width - spacings.right - spacings.left,
            }}
            data={WALKTHROUGH_DATA}
            onIndexChange={index => setCount(index)}
            renderItem={({item}) => <WalkthroughItem {...item} />}
          />
          <DotButtonContainer>
            <DotButton isSelected={count === 0} onPress={() => setCount(0)} />
            <DotButton isSelected={count === 1} onPress={() => setCount(1)} />
            <DotButton isSelected={count === 2} onPress={() => setCount(2)} />
          </DotButtonContainer>
        </CarrouselContainer>
        <ContainerButtons>
          <Button onClick={onCreateWallet} margin="24px 0 8px">
            Create Wallet
          </Button>
          <Button onClick={onImportWallet} secondary>
            Import Wallet
          </Button>
        </ContainerButtons>
      </BodyBox>
    </Container>
  );
};

const Container = styled.ScrollView`
  height: 100%;
  width: 100%;
  flex-direction: column;
`;
const BodyBox = styled.View`
  padding: 22px;
  height: ${Dimensions.get('window').height}px;
  width: ${Dimensions.get('window').width}px;
`;

const ContainerButtons = styled.View`
  padding: 0;
  width: 100%;
  height: 30%;
  justify-content: flex-end;
`;

const DotButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;
const DotButton = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${props =>
    props.isSelected ? colors.accent : colors.gray};
  border-radius: 50px;
  margin: 4px;
  width: 16px;
  height: 16px;
`;

const CarrouselContainer = styled.View`
  height: 70%;
  width: 100%;
`;
