import React, {useState} from 'react';
import styled from 'styled-components/native';
//components
import {Button} from 'shared/components';
import {MnemonicIntroModal} from '../components/MnemonicIntroModal';
import {styles} from '../styles';
import {View} from 'react-native';
import {Title, Text, ScreenContainer} from 'shared/styled-components';

const image = require('assets/images/agave_cellphone.png');

export const MnemonicIntro = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleModalSubmit = () => {
    setIsModalVisible(false);
    navigation.push('MnemonicBackup');
  };
  const openModal = () => setIsModalVisible(true);

  return (
    <ScreenContainer light>
      <ImageBox>
        <Image source={image} resizeMode="contain" />
      </ImageBox>
      <View style={styles.containerButtons}>
        <Title center>BACKUP MNEMONIC PHRASES</Title>
        <Text center color="blackLigth" style={styles.mnemonicLabel}>
          {`\n`}
          We're about to create an AgaveCoin wallet for you. {`\n`}
          The decentralized AgaveCoin Wallet can manage multiple crypto wallets
          by securing it with a single set of mnemonic phrases.
        </Text>
      </View>
      <View style={styles.containerButtons}>
        <Button onClick={openModal}>Start Backup</Button>
      </View>
      <MnemonicIntroModal
        isShowed={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </ScreenContainer>
  );
};

const Image = styled.Image`
  width: 75%;
  height: 75%;
`;

const ImageBox = styled.View`
  width: 100%;
  height: 40%;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
