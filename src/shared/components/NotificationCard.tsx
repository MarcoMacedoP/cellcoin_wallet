import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  ImageBackground,
  NativeModules,
  Platform,
} from 'react-native';
import React from 'react';
import {colors} from 'shared/styles/variables';
import {globalStyles} from 'shared/styles';
import {Text} from 'shared/styled-components';

const deviceLanguage: string =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export const NotificationCard = ({
  data: {img, title_es, msg_es, msg_en, title_en, link},
}) => {
  const handlePress = async () => {
    const canOpen = await Linking.canOpenURL(link);
    if (link && canOpen) {
      await Linking.openURL(link);
    }
  };
  const languageIsSpanish = /es/.test(deviceLanguage);
  const title = languageIsSpanish ? title_es : title_en;
  const message = languageIsSpanish ? msg_es : msg_en;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <ImageBackground
        style={styles.cardHeader}
        source={{uri: img}}
        imageStyle={styles.image}>
        <Text color="white" isBold style={styles.title}>
          {title}
        </Text>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.text} color="blackLigth">
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...globalStyles.cardShadow,
    width: '100%',
    minWidth: 200,
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
