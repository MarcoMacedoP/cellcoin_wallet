import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {colors} from 'shared/styles/variables';
import {globalStyles} from 'shared/styles';
import {Text} from 'shared/styled-components';

export const NotificationCard = ({data: {img, title_es, msg_es, link}}) => {
  const handlePress = async () => {
    const canOpen = await Linking.canOpenURL(link);
    if (link && canOpen) {
      await Linking.openURL(link);
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <ImageBackground
        style={styles.cardHeader}
        source={{uri: img}}
        imageStyle={styles.image}>
        <Text color="white" isBold style={styles.title}>
          {title_es}
        </Text>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.text} color="blackLigth">
          {msg_es}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...globalStyles.cardShadow,
    width: '100%',
    minHeight: 220,
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  cardHeader: {
    position: 'relative',
    width: '100%',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    width: '90%',
  },
  content: {
    width: '100%',
    flex: 1,
    borderRadius: 25,
    maxHeight: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
  },
  text: {
    height: 58,
  },
});
