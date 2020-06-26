import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';
import Wallet from 'erc20-wallet';

//components
import {Button} from 'shared/components/Button';
import {PasswordForm} from '../components/PasswordForm';
import {PasswordLabelBox} from '../components/PasswordLabelBox';
import {ScreenContainer} from 'shared/styled-components';
import {usePasswordValidations} from '../hooks/usePasswordValidations';
import {globalStyles} from 'shared/styles';

export const SetPasswordScreen = ({navigation, route}) => {
  const [state, setState] = useState({
    pass: '',
    passConfirm: '',
  });
  const {validations, isValidPassword} = usePasswordValidations(state.pass);
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const onTextChange = text => {
    if (step === 1) {
      setState({...state, pass: text});
    } else {
      setState({...state, passConfirm: text});
    }
  };

  async function onSubmit() {
    const canUserSubmit = validateSubmit();
    if (canUserSubmit) {
      Wallet.password = state.pass;
      //create the seed to the wallet
      if (route.params.action === 'create') {
        setLoading(true);
        try {
          Wallet.seed = await Wallet.createSeed();
          setLoading(false);
        } catch (error) {
          Toast.show('Error: ' + error);
        }
      }
      const {action} = route.params;
      const urlToRedirect =
        action === 'create' ? 'MnemonicIntro' : 'MnemonicImport';

      navigation.navigate(urlToRedirect);
    }
  }
  function validateSubmit() {
    if (step === 1) {
      if (isValidPassword) {
        setStep(2);
        return false;
      }
    } else {
      return state.pass === state.passConfirm;
    }
  }
  return (
    <ScreenContainer light>
      <ScrollView
        style={globalStyles.scrollView}
        keyboardShouldPersistTaps="handled">
        {step === 1 ? (
          <PasswordForm
            labelText="Please set security password"
            value={state.pass}
            onSubmitEditing={onSubmit}
            onTextChange={text => onTextChange(text)}>
            <PasswordLabelBox
              isValid={validations.textHasMinorCase}
              text="A lower case letter"
            />
            <PasswordLabelBox
              isValid={validations.textHasUpperCase}
              text="An Uppercase letter"
            />
            <PasswordLabelBox
              isValid={validations.textHasANumber}
              text=" A number"
            />
            <PasswordLabelBox
              isValid={validations.textHasValidLong}
              text="8~32 characters"
            />
            <PasswordLabelBox
              isValid={validations.textHasSpecialCharacter}
              text="A special character (!#$%&@?¿¡)"
            />
          </PasswordForm>
        ) : (
          <PasswordForm
            labelText="Repeat password"
            value={state.passConfirm}
            onSubmitEditing={onSubmit}
            onTextChange={text => onTextChange(text)}>
            <PasswordLabelBox
              isValid={state.pass === state.passConfirm}
              text={
                state.pass === state.passConfirm
                  ? 'Passwords match'
                  : 'The Password confirmation does not match.'
              }
            />
          </PasswordForm>
        )}

        <Button
          onClick={onSubmit}
          isActivated={
            step === 1 ? isValidPassword : state.pass === state.passConfirm
          }
          isLoading={isLoading}>
          Continue
        </Button>
      </ScrollView>
    </ScreenContainer>
  );
};
