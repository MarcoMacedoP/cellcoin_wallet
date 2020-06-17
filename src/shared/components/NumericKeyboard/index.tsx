import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';
import {colors} from 'shared/styles';

type NumericKeyboardProps = {
  color?: string;
  onPress?: any;
  applyBackspaceTint?: boolean;
  value: string;
  style?: StyleProp<ViewStyle>;
};
type NumericKeyboardComponent = React.FC<NumericKeyboardProps>;

export const NumericKeyboard: NumericKeyboardComponent = ({
  color = colors.primary,
  onPress,
  applyBackspaceTint = true,
  value,
  style,
}) => {
  const backspaceImg = require('./backspace.png');
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value);
  }, [value]);

  const Backspace = () => {
    const handlePress = () => onClick('back');
    const handleLongPress = () => onClick('longback');
    return (
      <TouchableOpacity
        accessibilityLabel="backspace"
        style={styles.backspace}
        onPress={handlePress}
        onLongPress={handleLongPress}>
        <Image
          source={backspaceImg}
          resizeMode="contain"
          style={applyBackspaceTint && {tintColor: color}}
        />
      </TouchableOpacity>
    );
  };

  const Row = (numbersArray: Array<number>) => {
    let cells = numbersArray.map(val => Cell(val));
    return <View style={styles.row}>{cells}</View>;
  };

  const Cell = (symbol: number | string) => {
    const handleClick = () => onClick(String(symbol));
    return (
      <TouchableOpacity
        style={[styles.cell]}
        key={symbol}
        accessibilityLabel={String(symbol)}
        onPress={handleClick}>
        <Text style={[styles.number, {color: color}]}>{symbol}</Text>
      </TouchableOpacity>
    );
  };

  const onClick = (keyPressed: any) => {
    let currentValue = text;
    if (keyPressed === '0' && currentValue === '0') {
      return;
    } else if (keyPressed === '.') {
      if (currentValue.includes('.')) return;
      currentValue += keyPressed;
    } else if (keyPressed === 'back') {
      currentValue = currentValue.slice(0, -1);
    } else if (keyPressed === 'longback') {
      currentValue = '';
    } else {
      currentValue += keyPressed;
    }
    setText(currentValue);
    onPress(currentValue);
  };

  return (
    <View style={[styles.container, style]}>
      {Row([1, 2, 3])}
      {Row([4, 5, 6])}
      {Row([7, 8, 9])}
      <View style={styles.row}>
        {Cell('.')}
        {Cell(0)}
        {Backspace()}
      </View>
    </View>
  );
};
