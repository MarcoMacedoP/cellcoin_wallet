import React, {useState, useMemo, useCallback} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';
//components
import {Dimensions} from 'react-native';
import {Button} from 'shared/components/Button';
import {WalkthroughItem} from '../components/WalkthroughItem';
import Carousel from '../components/Carousel';
//styles
import {colors} from 'shared/styles';

const {width} = Dimensions.get('window');

type WalkthroughItemData = {
  image: string;
  title: string;
  desc: string;
};
const WALKTHROUGH_DATA: WalkthroughItemData[] = [
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

type RenderItemParams = {
  index: number;
  item: WalkthroughItemData;
};

export const WalkthroughScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const renderItem = useCallback(({item, index}: RenderItemParams) => {
    return <WalkthroughItem {...item} key={index} />;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.carrouselContainer}>
        <Carousel
          onIndexChange={setCurrentIndex}
          containerWidth={width}
          itemWidth={width}
          minScrollDistance={0}
          renderItem={renderItem}
          data={WALKTHROUGH_DATA}
        />
      </View>
      <View style={styles.dotsButtonContainer}>
        <DotButton
          isSelected={currentIndex === 0}
          onPress={() => setCurrentIndex(0)}
        />
        <DotButton
          isSelected={currentIndex === 1}
          onPress={() => setCurrentIndex(1)}
        />
        <DotButton
          isSelected={currentIndex === 2}
          onPress={() => setCurrentIndex(2)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button onClick={onCreateWallet} margin="24px 0 8px">
          Create Wallet
        </Button>
        <Button onClick={onImportWallet} secondary>
          Import Wallet
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    padding: 22,
    flex: 1,
  },
  buttonsContainer: {
    padding: '0',
    width: '100%',
    height: '30%',
    justifyContent: 'flex-end',
    flex: 1,
  },
  dotsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    flex: 0.2,
  },
  carrouselContainer: {
    flex: 4,
    height: '70%',
    width: '100%',
  },
});

const DotButton = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${props =>
    props.isSelected ? colors.accent : colors.gray};
  border-radius: 50px;
  margin: 4px;
  width: 16px;
  height: 16px;
`;
