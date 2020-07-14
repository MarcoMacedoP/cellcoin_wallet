import React, {useState, useMemo, useCallback} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';
//components
import {Dimensions} from 'react-native';
import {Button} from 'shared/components';
import {ScreenContainer} from 'shared/styled-components';
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
    title: 'You are member of',
    desc:
      'Remember that Xoy wallet is part of this prestigious group of brands that support you',
  },
  {
    image: require('assets/tutorial/tutorial_two.png'),
    title: 'Multi-chain Wallet',
    desc: 'Generate profits with 404',
  },
  {
    image: require('assets/tutorial/tutorial_three.png'),
    title: 'XoyWallet Services',
    desc:
      'With 404, you can do multiple transactions. Besides, it is pretty easy to buy or send cryptocurrency instantly.',
  },
  {
    image: require('assets/tutorial/tutorial_four.png'),
    title: '404 Secure',
    desc:
      'Full control over assets by managing private keys independently. Produced by Xoy Coin security team',
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
    <ScreenContainer light>
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
        {WALKTHROUGH_DATA.map((item, index) => (
          <DotButton isSelected={currentIndex === index} key={index} />
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <Button onClick={onCreateWallet} margin="24px 0 8px">
          Create Wallet
        </Button>
        <Button onClick={onImportWallet} secondary>
          Import Wallet
        </Button>
      </View>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 0,
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
  background-color: ${(props) =>
    props.isSelected ? colors.accent : colors.gray};
  border-radius: 50px;
  margin: 4px;
  width: 16px;
  height: 16px;
`;
