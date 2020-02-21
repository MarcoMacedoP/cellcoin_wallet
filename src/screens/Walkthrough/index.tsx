import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import styles from './styles/styles';
import GestureRecognizer from 'react-native-swipe-gestures';

//components
import {TouchableOpacity, Text, View, Dimensions} from 'react-native';
export const WalkthroughScreen = ({navigation}) => {
  const [count, setCount] = useState(1);

  const image = require('assets/tutorial/tutorial_one.png');
  const image2 = require('assets/tutorial/tutorial_two.png');
  const image3 = require('assets/tutorial/tutorial_three.png');

  const next = () => {
    count !== 3 && setCount(count + 1);
  };
  const back = () => {
    count !== 1 && setCount(count - 1);
  };

  const onSwipeLeft = () => {
    next();
  };

  const onSwipeRight = () => {
    back();
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <Container>
      <BodyBox>
        <GestureRecognizer
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={config}
          style={{
            flex: 1,
          }}>
          <ImageBox>
            {count == 1 ? <Image source={image} /> : null}
            {count == 2 ? <Image source={image2} /> : null}
            {count == 3 ? <Image source={image3} /> : null}
          </ImageBox>
        </GestureRecognizer>
        <ContainerText>
          {count == 1 ? <Title>Multi-chain Wallet</Title> : null}
          {count == 1 ? <Label>Supporting BTC, AgaveCoin,etc.</Label> : null}
          {count == 1 ? <Label>AgaveCoin,etc.</Label> : null}
          {count == 2 ? <Title>Designed for Simplicity </Title> : null}
          {count == 2 ? (
            <Label>
              Add and manage cryptocurrencies with one click Manage multiple
              addresses easily
            </Label>
          ) : null}
          {count == 3 ? <Title>Agave Coin Secure </Title> : null}
          {count == 3 ? (
            <Label>
              Full control over assets by managing private keys independently.
              Produced by Agave Coin security team
            </Label>
          ) : null}
        </ContainerText>
        <ContainerButtons>
          <View style={styles.dotBox}>
            <View style={count == 1 ? styles.dotBlue : styles.dotGray}></View>
            <View style={count == 2 ? styles.dotBlue : styles.dotGray}></View>
            <View style={count == 3 ? styles.dotBlue : styles.dotGray}></View>
          </View>
          <TouchableOpacity
            style={[{height: 50, backgroundColor: '#2FA0A8'}, styles.button]}
            onPress={() =>
              navigation.navigate('Terms', {name: 'Create Wallet'})
            }>
            <Text style={{color: 'white', fontSize: 18}}>Create Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Terms', {name: 'Import Wallet'})
            }
            style={[{height: 50, backgroundColor: '#50CDD5'}, styles.button]}>
            <Text style={{color: 'white', fontSize: 18}}>Import Wallet</Text>
          </TouchableOpacity>
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
  height: 100%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const ContainerText = styled.View`
  padding: 22px;
  width: 100%;
`;
const ContainerButtons = styled.View`
  padding: 22px;
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
