import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-simple-toast';

//components
import {MnemonicListComponent} from '../components/MnemonicList';
import {PageContainer, H4, Text, TextArea} from 'shared/styled-components';
import {Button} from 'shared/components/Button';
//hooks
import {useSeeds} from '../hooks/useSeeds';

export const MnemonicBackup = ({navigation}) => {
  const [labels, suffleLables, shuffledLabels] = useSeeds();
  const [step, setStep] = useState<'beforeBackup' | 'backup'>('beforeBackup');
  const [hint, setHint] = useState([]);
  const [normalizedHint, setNormalizedHint] = useState('');

  useEffect(() => setNormalizedHint(hint.toString().replace(/,/g, ' ')), [
    hint,
  ]);

  const onLabelSelection = index =>
    step === 'backup' && setHint([...hint, shuffledLabels[index]]);

  const onLabelUnselection = selectedLabelText => {
    if (step === 'backup') {
      const tempArr = hint.filter(text => text !== selectedLabelText && text);
      setHint(tempArr);
    }
  };

  const validate = () => {
    let hasError = false;
    labels.forEach((text, index) => {
      const hasDiferentValues = hint[index] !== text;
      if (hasDiferentValues) {
        //hasError = true;
      }
    });
    if (hasError) {
      Toast.show("Words aren't in correct order");
    } else {
      navigation.navigate('LoadWalletScreen');
    }
  };
  const onSubmit = () => {
    if (step === 'beforeBackup') {
      suffleLables();
      setStep('backup');
    } else {
      validate();
    }
  };

  return (
    <PageContainer light justify="space-between">
      <Container>
        <Container>
          <H4>Back UP mnemonic phrases </H4>
          {step === 'beforeBackup' ? (
            <Text>
              Make a copy of the following 12 nemonic phrases in correct order.
              We Will verify in the next step
            </Text>
          ) : (
            <Text>Please enter the 12 words in the correct order</Text>
          )}
        </Container>
        {step === 'backup' && (
          <Container>
            <TextArea
              multiline={true}
              editable={false}
              value={normalizedHint}
            />
          </Container>
        )}

        {shuffledLabels.length > 0 && (
          <MnemonicListComponent
            labels={shuffledLabels}
            canSelectLabels={step === 'backup'}
            onLabelSelection={onLabelSelection}
            onLabelUnselection={onLabelUnselection}
          />
        )}
      </Container>
      <Button
        width="100%"
        onClick={onSubmit}
        isActivated={step === 'backup' ? hint.length === labels.length : true}>
        {step === 'beforeBackup' ? 'Next' : 'Confirm'}
      </Button>
    </PageContainer>
  );
};

const Container = styled.ScrollView`
  padding: 15px 0;
  width: 100%;
`;
