import React, {useState, useEffect} from 'react';

import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {Text, SmallText} from 'shared/styled-components/Texts';
import {TouchableOpacity} from 'react-native';

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
    <Container light>
      <LabelsContainer>
        {labels.map((text, index) => (
          <TouchableLabel
            key={index}
            canSelect={canSelectLabels}
            onPress={() => onLabelSelection(index)}
            onUnselect={() => onLabelUnselection(text)}>
            {text}
          </TouchableLabel>
        ))}
      </LabelsContainer>
    </Container>
  );
};

type ContainerProps = {
  light?: Boolean;
};
const Container = styled.View<ContainerProps>`
  align-self: center;
  background-color: ${props => (props.light ? colors.white : colors.whiteDark)};
  margin: 25px;
`;
const LabelsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

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
      console.log({isSelected});
    }
  };

  return (
    <Touchable onPress={handlePress} isSelected={isSelected}>
      <Label isSelected={isSelected}>{children}</Label>
    </Touchable>
  );
};
const Touchable = styled.TouchableOpacity`
  background-color: ${props =>
    props.isSelected ? colors.whiteDark : colors.accentLight};
  margin: 8px;
  border-radius: 5px;
`;
const Label = styled(Text)`
  font-size: 12px;
  padding: 10px 15px 10px;
  font-weight: bold;
  text-transform: lowercase;
  color: ${props => (props.isSelected ? colors.blackLigth : colors.primary)};
`;
