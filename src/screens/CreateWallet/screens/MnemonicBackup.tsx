import React, {useState, useEffect} from 'react';
import Toast from 'react-native-simple-toast';
//components
import {MnemonicListComponent} from '../components/MnemonicList';
import {
  ScreenContainer,
  H4,
  Text,
  TextArea,
  Subtitle,
} from 'shared/styled-components';
import {Button} from 'shared/components/Button';
//hooks
import {useSeeds} from '../hooks/useSeeds';
import {StackNavigationProp} from '@react-navigation/stack';
import {CreateWalletStack} from 'screens/CreateWallet/Router';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyles} from 'shared/styles';

interface MnemonicBackupProps {
  navigation: StackNavigationProp<CreateWalletStack, 'MnemonicBackup'>;
}

export const MnemonicBackup = ({navigation}: MnemonicBackupProps) => {
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
      console.log({hasDiferentValues});
      if (hasDiferentValues) {
        hasError = true;
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
    <ScreenContainer light justify="space-between">
      <ScrollView style={globalStyles.scrollView}>
        <Subtitle>Back up mnemonic phrases </Subtitle>
        <Text>
          {step === 'beforeBackup'
            ? `\nMake a copy of the following 12 mnemonic phrases in correct order. We Will verify in the next step\n`
            : `\nPlease enter the 12 words in the correct order\n`}
        </Text>

        {step === 'backup' && (
          <TextArea multiline={true} editable={false} value={normalizedHint} />
        )}

        {shuffledLabels.length > 0 && (
          <MnemonicListComponent
            labels={shuffledLabels}
            canSelectLabels={step === 'backup'}
            onLabelSelection={onLabelSelection}
            onLabelUnselection={onLabelUnselection}
          />
        )}
      </ScrollView>
      <Button
        width="100%"
        onClick={onSubmit}
        isActivated={step === 'backup' ? hint.length === labels.length : true}>
        {step === 'beforeBackup' ? 'Next' : 'Confirm'}
      </Button>
    </ScreenContainer>
  );
};
