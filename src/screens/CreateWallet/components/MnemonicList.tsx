import React, {useState} from 'react';

import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {Text} from 'shared/styled-components/Texts';
import {StyleSheet, View} from 'react-native';

type MnemonicListComponentProps = {
  labels?: Array<string>;
  onLabelSelection?: (index: number) => void;
  onLabelUnselection?: (text: string) => void;
  canSelectLabels: boolean;
};

export const MnemonicListComponent: React.FC<MnemonicListComponentProps> = ({
  labels,
  onLabelSelection,
  onLabelUnselection,
  canSelectLabels,
}) => {
  return (
    <View style={styles.container}>
      {labels.map((text, index) => (
        <TouchableLabel
          key={index}
          canSelect={canSelectLabels}
          onPress={() => onLabelSelection(index)}
          onUnselect={() => onLabelUnselection(text)}>
          {text}
        </TouchableLabel>
      ))}
    </View>
  );
};

const TouchableLabel = ({onPress, children, onUnselect, canSelect}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (canSelect) {
      if (isSelected) {
        setIsSelected(false);
        onUnselect();
      } else {
        setIsSelected(true);
        onPress();
      }
    }
  };

  return (
    <Touchable onPress={handlePress} isSelected={isSelected}>
      <Label isSelected={isSelected}>{children}</Label>
    </Touchable>
  );
};

type StyledProps = {isSelected: boolean};

const Touchable = styled.TouchableOpacity<StyledProps>`
  background-color: ${props =>
    props.isSelected ? colors.whiteDark : colors.accentLight};
  margin: 8px;
  border-radius: 5px;
`;
const Label = styled(Text)<StyledProps>`
  font-size: 12px;
  padding: 10px 15px 10px;
  font-weight: bold;
  text-transform: lowercase;
  color: ${props => (props.isSelected ? colors.blackLigth : colors.primary)};
`;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginVertical: 21,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
