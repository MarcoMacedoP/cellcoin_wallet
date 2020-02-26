import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import GestureRecognizer from 'react-native-swipe-gestures';
//components
import {Dimensions} from 'react-native';

import {Button} from 'shared/components/Button';
import {colors} from 'shared/styles';

export const WalkthroughScreen = ({navigation}) => {
  const [count, setCount] = useState(1);
  const image = require('assets/tutorial/tutorial_one.png');
  const image2 = require('assets/tutorial/tutorial_two.png');
  const image3 = require('assets/tutorial/tutorial_three.png');
  const initialCopyState = {
    img: image,
    title: 'Multi-chain Wallet',
    desc: 'Supporting BTC, AgaveCoin,etc.',
  };
  const [copy, setCopy] = useState(initialCopyState);

  /**Changes the copy when the count changes */
  useEffect(() => {
    if (count === 1) {
      setCopy({
        img: image,
        title: 'Multi-chain Wallet',
        desc: 'Supporting BTC, AgaveCoin,etc.',
      });
    } else if (count === 2) {
      setCopy({
        img: image2,
        title: 'Designed for Simplicity',
        desc:
          ' Add and manage cryptocurrencies with one click Manage multiple addresses easily',
      });
    } else {
      setCopy({
        img: image3,
        title: 'Agave Coin Secure',
        desc:
          'Full control over assets by managing private keys independently. \n Produced by Agave Coin security team',
      });
    }
  }, [count]);

  const onLastStep = () => {
    count !== 3 ? setCount(count + 1) : setCount(1);
  };
  const onNextStep = () => {
    count !== 1 ? setCount(count - 1) : setCount(3);
  };

  const onCreateWallet = () =>
    navigation.navigate('Terms', {
      name: 'Create Wallet',
      url: 'Create',
    });
  const onImportWallet = () =>
    navigation.navigate('Terms', {
      name: 'Import Wallet',
      url: 'Import',
    });

  const gestureRecognizerConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <Container>
      <BodyBox>
        <GestureRecognizer
          onSwipeLeft={onLastStep}
          onSwipeRight={onNextStep}
          config={gestureRecognizerConfig}
          style={{
            flex: 1,
          }}>
          <ImageBox>
            <Image source={copy.img} />
          </ImageBox>

          <ContainerText>
            <Title>{copy.title}</Title>
            <Label>{copy.desc}</Label>
          </ContainerText>
          <DotButtonContainer>
            <DotButton isSelected={count === 1} onPress={() => setCount(1)} />
            <DotButton isSelected={count === 2} onPress={() => setCount(2)} />
            <DotButton isSelected={count === 3} onPress={() => setCount(3)} />
          </DotButtonContainer>
        </GestureRecognizer>

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
const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
const ImageBox = styled.View`
  width: 100%;
  height: 70%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const ContainerText = styled.View`
  padding: 22px;
  width: 100%;
  height: 25%;
`;
const ContainerButtons = styled.View`
  padding: 0;
  width: 100%;
`;
const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: center;
`;
const Label = styled.Text`
  font-size: 12px;
  color: #8d8d8d;
  text-align: center;
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
  width: 12px;
  height: 12px;
`;
