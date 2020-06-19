import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../styled-components/Texts';
import {Image, Clipboard, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import {showAddressPreview} from 'shared/libs/Address';
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
    <Container onPress={onClickHandler} style={style}>
      <Text style={styles.text}>{text}</Text>
      <Image source={clipboardIcon} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 8px 8px;
  border-radius: 16px;
  min-height: 40px;
`;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    marginRight: 10,
  },
});
