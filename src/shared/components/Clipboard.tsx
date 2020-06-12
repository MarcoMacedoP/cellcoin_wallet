import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../styled-components/Texts';
import {Image, Clipboard, StyleProp, ViewStyle} from 'react-native';
import {colors} from '../styles';
import Toast from 'react-native-simple-toast';
const clipboardIcon = require('assets/icons/clipboard_icon.png');

interface ClipboardProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}
export const ClipboardComponent: React.FC<ClipboardProps> = ({text, style}) => {
  const onClickHandler = () => {
    Clipboard.setString(text);
    Toast.show('Adress copied to clipboard!', Toast.SHORT);
  };
  const parseTextToShowPreview = () => {
    console.log(text.length);
    const smallerText = text.split('', 20).toString();
    const cleanedText = smallerText.replace(/,/g, '');
    return `${cleanedText}...`;
  };
  return (
    <Container onPress={onClickHandler} style={style}>
      <Text>{parseTextToShowPreview()}</Text>
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
`;
