import React from 'react';
import {Text} from 'shared/styled-components';
import {
  Image,
  Clipboard,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {colors} from 'shared/styles';

const clipboardIcon = require('assets/icons/clipboard_icon.png');

interface ClipboardProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}
export const ClipboardComponent: React.FC<ClipboardProps> = ({text, style}) => {
  const onClickHandler = () => {
    Clipboard.setString(text);
    Toast.show('Address copied to clipboard', Toast.SHORT);
  };
  return (
    <TouchableHighlight
      onPress={onClickHandler}
      style={[styles.touchable, style]}
      underlayColor={colors.white}
      activeOpacity={0.5}>
      <View style={styles.container}>
        <Text color="blackLigth" style={styles.text}>
          {text}
        </Text>
        <Image source={clipboardIcon} style={styles.icon} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 12,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    width: '70%',
  },
});
