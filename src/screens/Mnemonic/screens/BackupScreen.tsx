import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-simple-toast';

//components
import {View, NativeMethodsMixin} from 'react-native';
import {MnemonicListComponent} from '../components/MnemonicList';
import {PageContainer, H4, SmallText} from 'shared/styled-components';
import {Button} from 'shared/components/Button';

import {useSeeds} from '../hooks/useSeeds';
import {colors} from 'shared/styles';

export const BackupScreen = ({navigation}) => {
  const [labels, suffleLables, shuffledLabels] = useSeeds();
  const [step, setStep] = useState<1 | 2>(1);
  const [hint, setHint] = useState([]);
  const [normalizedHint, setNormalizedHint] = useState('');
  useEffect(() => {
    console.log({hint, labels});
  }, [labels]);
  useEffect(() => setNormalizedHint(hint.toString().replace(/,/g, ' ')), [
    hint,
  ]);

  const onLabelSelection = index => {
    if (step === 2) {
      console.log(labels[index]);
      setHint([...hint, shuffledLabels[index]]);
    }
  };
  const onLabelUnselection = selectedLabelText => {
    if (step === 2) {
      const tempArr = hint.filter(text => text !== selectedLabelText && text);
      console.log({tempArr, hint, selectedLabelText});
      setHint(tempArr);
    }
  };
  const validate = () => {
    let hasError = false;
    labels.forEach((text, index) => {
      const hasDiferentValues = hint[index] !== text;
      if (hasDiferentValues) {
        // hasError = true;
      }
    });
    if (hasError) {
      Toast.show("Words aren't in correct order");
    } else {
      navigation.navigate('CreateAdress');
    }
  };
  const onSubmit = () => {
    if (step == 1) {
      suffleLables();
      setStep(2);
    } else {
      validate();
    }
  };

  return (
    <PageContainer light center={'space-around'}>
      <View style={{paddingHorizontal: 15}}>
        <H4>Back UP mnemonic phrases </H4>
        {step == 1 ? (
          <SmallText style={{marginTop: 15, fontSize: 15}}>
            Make a copy of the following 12 nemonic phrases in correct order. We
            Will verify in the next step
          </SmallText>
        ) : (
          <SmallText style={{marginTop: 15, fontSize: 15}}>
            Please enter the 12 words in the correct order
          </SmallText>
        )}
      </View>
      {step === 2 ? (
        <TextArea multiline={true} editable={false} value={normalizedHint} />
      ) : null}

      {shuffledLabels.length > 0 ? (
        <MnemonicListComponent
          labels={shuffledLabels}
          canSelectLabels={step === 2}
          onLabelSelection={onLabelSelection}
          onLabelUnselection={onLabelUnselection}
        />
      ) : null}

      <Button
        width="100%"
        margin="0 4px 0 0"
        onClick={onSubmit}
        isActivated={step === 2 ? hint.length === labels.length : true}>
        {step == 1 ? 'Next' : 'Confirm'}
      </Button>
    </PageContainer>
  );
};

const TextArea = styled.TextInput`
  height: 150px;
  width: 95%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  padding: 16px;
  background-color: ${colors.whiteDark};
  border-radius: 15px;
`;
